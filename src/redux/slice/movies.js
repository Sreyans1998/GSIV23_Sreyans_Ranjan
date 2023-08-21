import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk('fetchMovies', async (url) => {
    const options = { method: 'GET', headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjUxYjQ3Y2UyZTVlMzRkNWU2MDU4NWQ4OTcyZmUxNCIsInN1YiI6IjY0ZTBhMDYzMDc2Y2U4MDBlMzEzNWRkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GwPPcFWQnjaUKDM8ME5KUjMBWFYnafVcHjFtqmMhxXY"
    }};
    //https://api.themoviedb.org/3/search/movie?query=Barbie&include_adult=false&language=en-US&page=1
    //https://api.themoviedb.org/3/discover/movie?page=1
    // https://api.themoviedb.org/3/movie/569094/credits?language=en-US
    const responseData = await fetch(url, options)
    .then((response) => response.json())
    .then((response) => {return response})
    .catch((err) => console.error(err));
    
    console.log("test1 => ",responseData);
    return responseData;
});
export const fetchNewMovies = createAsyncThunk('fetchNewMovies', async (url) => {
    const options = { method: 'GET', headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjUxYjQ3Y2UyZTVlMzRkNWU2MDU4NWQ4OTcyZmUxNCIsInN1YiI6IjY0ZTBhMDYzMDc2Y2U4MDBlMzEzNWRkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GwPPcFWQnjaUKDM8ME5KUjMBWFYnafVcHjFtqmMhxXY"
    }};
    const responseData = await fetch(url, options)
    .then((response) => response.json())
    .then((response) => {return response})
    .catch((err) => console.error(err));
    
    console.log("test1 => ",responseData);
    return responseData;
});
export const fetchMovieDetails = createAsyncThunk('fetchMovieDetails', async (movieId) => {
    const options = { method: 'GET', headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjUxYjQ3Y2UyZTVlMzRkNWU2MDU4NWQ4OTcyZmUxNCIsInN1YiI6IjY0ZTBhMDYzMDc2Y2U4MDBlMzEzNWRkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GwPPcFWQnjaUKDM8ME5KUjMBWFYnafVcHjFtqmMhxXY"
    }};
    
    let url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
    const movieDetails = await fetch(url, options)
    .then((response) => response.json())
    .then((response) => {return response})
    .catch((err) => console.error(err));
    url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
    const casDetails = await fetch(url, options)
    .then((response) => response.json())
    .then((response) => {return response})
    .catch((err) => console.error(err));

    const responseData = {
        movieDetails: movieDetails,
        casDetails: casDetails,
    }
    return responseData;
});
const moviesReducer = createSlice({
    name: "movies",
    initialState: {
        isLoading: false,
        data: [],
        movieData: null,
        Error: false,
        pageNo: 1,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.pending, (state, action) => {
            state.isLoading =  true;
        })
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.isLoading =  false;
            state.data = action.payload.results;
            state.pageNo = state.pageNo + 1;
        })
        builder.addCase(fetchMovies.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.Error = true;
        })
        builder.addCase(fetchNewMovies.fulfilled, (state, action) => {
            action.payload.results.forEach(element => {
                state.data.push(element);
            });;
            state.pageNo = state.pageNo + 1;
        })
        builder.addCase(fetchMovieDetails.pending, (state, action) => {
            state.movieData = null;
        })
        builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
            state.movieData = action.payload;
        })
        builder.addCase(fetchMovieDetails.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.movieData = null;
        })
    },
});

export default moviesReducer.reducer;