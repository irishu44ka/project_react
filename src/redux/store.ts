import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import movieReducer from './movieSlice';
import genresReducer from './genresSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movie: movieReducer,
    genres: genresReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;