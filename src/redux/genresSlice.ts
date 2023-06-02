import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

const API_KEY = 'b45ae88d4c156a65a805d18dcb5699e6';

interface Genre {
  id: number;
  name: string;
}

interface GenresState {
  genres: Genre[];
  loading: boolean;
  error: string | null;
}

const initialState: GenresState = {
  genres: [],
  loading: false,
  error: null,
};

export const fetchGenres = createAsyncThunk('genres/fetchGenres', async () => {
  const response = await axios.get<{ genres: Genre[] }>(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
  );
  return response.data.genres;
});

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch genres';
      });
  },
});

export const selectGenres = (state: RootState) => state.genres.genres;

export default genresSlice.reducer;