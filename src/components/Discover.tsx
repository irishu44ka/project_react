import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres, selectGenres } from "../redux/genresSlice";
import type { AppDispatch } from "../redux/store";

interface DiscoverProps {}

export const Discover: React.FC<DiscoverProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const genres = useSelector(selectGenres);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  return (
    <div>
      <h2 className="header">Discover by Genres</h2>
      <div className="genres">
        {genres.map((genre) => (
          <div key={genre.id} className="genre">
            <Link to={`/discover/${genre.id}`} className="link">
            <div>{genre.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
