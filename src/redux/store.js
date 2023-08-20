import {configureStore} from "@reduxjs/toolkit";
import moviesReducer from "./slice/movies";
import pagesReducer from "./slice/pages";
export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        pages: pagesReducer
    }
})