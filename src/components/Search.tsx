import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchMovies, selectSearchResults } from "../redux/moviesSlice";
import { Pagination, Input, Card } from "antd";
import type { AppDispatch } from "../redux/store";
import { PopularMoviesPage } from "./PopularMovies";
import "../App.css";
import { Rate } from "antd";

const { Search } = Input;
const { Meta } = Card;

export const SearchPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchResults = useSelector(selectSearchResults);
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);

  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(1);
    dispatch(searchMovies(value, 1));
  };

  const handlePaginationChange = (page: number) => {
    setPage(page);
    dispatch(searchMovies(query, page));
  };

  return (
    <div className="search-container">
      <div className="search">
        <Search
          placeholder="Search movies"
          onSearch={handleSearch}
          enterButton
          className="search-input"
        />
      </div>
      {searchResults && searchResults.results.length > 0 && (
        <div className="movies">
          {searchResults.results.map((movie) => (
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
                <Rate allowHalf count={10} defaultValue={movie.vote_average} disabled />
              </Card>
            </Link>
          ))}
        </div>
      )}
      {searchResults && searchResults?.total_pages > 1 && (
        <div className="pagination">
          <Pagination
            current={page}
            total={searchResults?.total_pages}
            onChange={handlePaginationChange}
          />
        </div>
      )}
      {!searchResults && (
        <PopularMoviesPage />
      )}
    </div>
  );
};
