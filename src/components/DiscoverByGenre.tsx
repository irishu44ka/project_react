import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Pagination, Card } from "antd";
import { useSelector, useDispatch } from 'react-redux';
import { Rate } from "antd";
import type { AppDispatch } from "../redux/store";
import { fetchByGenre, selectSearchResults } from "../redux/moviesSlice";

const { Meta } = Card;


export const DiscoverByGenre: React.FC = () => {
  const { id } = useParams<{ id: any }>();
  const dispatch = useDispatch<AppDispatch>();
  const searchResults = useSelector(selectSearchResults);
  const [page, setPage] = React.useState(1)

  useEffect(() => {
    dispatch(fetchByGenre(id, 1));
  }, [dispatch, id]);


  const handlePaginationChange = (page: number) => {
    setPage(page);
    dispatch(fetchByGenre(id, page));
  };

  return (
    <div className='discover-page'>
        <Link to={`/`} className="link">
              To homepage
            </Link>
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
    </div>
  );
};