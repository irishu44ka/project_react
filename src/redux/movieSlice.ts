import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from './store';

const API_KEY = "b45ae88d4c156a65a805d18dcb5699e6";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

interface MovieState {
  movie: Movie | null;
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movie: null,
  loading: false,
  error: null,
};

export const fetchMovie = createAsyncThunk<Movie, number>(
  "movies/fetchMovie",
  async (id: number) => {
    const response = await axios.get<Movie>(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    );
    return response.data;
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.movie = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch movie";
      });
  },
});

export default movieSlice.reducer;

export const selectMovieResults = (state: RootState) => state.movie.movie;
