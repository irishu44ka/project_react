import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovie } from '../redux/movieSlice';
import type { AppDispatch } from "../redux/store";
import { Rate } from "antd";

export const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: any }>();
  const dispatch = useDispatch<AppDispatch>();
  const movie = useSelector((state: any) => state.movie.movie);
  const loading = useSelector((state: any) => state.movie.loading);
  const error = useSelector((state: any) => state.movie.error);

  useEffect(() => {
    dispatch(fetchMovie(parseInt(id)));
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className='movie-page'>
      <h2>{movie.title}</h2>
      <Rate allowHalf count={10} defaultValue={movie.vote_average} className='rate' disabled/>
      <p>{movie.overview}</p>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      
    </div>
  );
};