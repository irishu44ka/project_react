import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import axios from 'axios';

const API_KEY = 'b45ae88d4c156a65a805d18dcb5699e6'

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

type Responce = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface MoviesState {
  searchResults: Responce | null;
  popularMovies: Responce | null;
}

const initialState: MoviesState = {
  searchResults: null,
  popularMovies: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<Responce>) => {
      state.searchResults = action.payload;
    },
    setPopularMovies: (state, action: PayloadAction<Responce>) => {
      state.popularMovies = action.payload;
    },
  },
});

export const { setSearchResults, setPopularMovies } = moviesSlice.actions;

export const searchMovies = (query: string, page: number) => async (dispatch: any) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    );
    dispatch(setSearchResults(response.data));
  } catch (error) {
    console.log(error)
  }
};


export const fetchPopularMovies = (page: number) => async (dispatch: any) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
    );
    dispatch(setPopularMovies(response.data));
  } catch (error) {
    console.log(error)
  }
};

export const fetchByGenre = (genre: string, page: number) => async (dispatch: any) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre}&page=${page}`
    );
    dispatch(setSearchResults(response.data));
  } catch (error) {
    console.log(error)
  }
};

export const selectSearchResults = (state: RootState) => state.movies.searchResults;
export const selectPopularMovies = (state: RootState) => state.movies.popularMovies;

export default moviesSlice.reducer;


// const searchMoviesPending = () => ({ type: 'movies/searchMoviesPending' });
// const searchMoviesSuccess = (results: any) => ({ type: 'movies/searchMoviesSuccess', payload: results });
// const searchMoviesFailure = (error: string) => ({ type: 'movies/searchMoviesFailure', payload: error });

// export const searchMovies = createAsyncThunk<void, string, { dispatch: Dispatch; state: RootState }>(
//   'movies/searchMovies',
//   async (query: string, { dispatch }) => {
//     try {
//       dispatch(searchMoviesPending());
//       const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
//       const searchResults = response.data.results;
//       dispatch(searchMoviesSuccess(searchResults));
//     } catch (error: any) {
//       dispatch(searchMoviesFailure(error.message));
//     }
//   }
// );