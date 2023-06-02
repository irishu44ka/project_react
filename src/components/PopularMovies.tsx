import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies, selectPopularMovies } from "../redux/moviesSlice";
import { Pagination, Card } from "antd";
import type { AppDispatch } from "../redux/store";
import "../App.css";

const { Meta } = Card;

export const PopularMoviesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const popularMovies = useSelector(selectPopularMovies);
  const [page, setPage] = React.useState(1);

  const handlePaginationChange = (page: number) => {
    setPage(page);
    dispatch(fetchPopularMovies(page));
  };

  useEffect(() => {
    dispatch(fetchPopularMovies(page));
  }, [dispatch, page]);

  return (
    <div>
      <h1 className="header">Popular movies</h1>
      <Link to={`/`} className="link">
              Back to search
            </Link>
      {popularMovies && popularMovies.results.length > 0 && (
        <div className="movies">
          {popularMovies.results.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <Card
               className="card"
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt={movie.title}
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  />
                }
              >
                <Meta title={movie.title} />
              </Card>
            </Link>
          ))}
        </div>
      )}
      <div className="pagination">
            <Pagination current={page}  total={popularMovies?.total_pages} onChange={handlePaginationChange} />
          </div>
    </div>
  );
};
