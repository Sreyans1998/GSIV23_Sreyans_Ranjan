import { createSlice } from "@reduxjs/toolkit";

export const pagesReducer = createSlice({
    name: 'Pages',
    initialState: 'Home',
    reducers: {
        onHomePage: (state) => state = 'Home',
        onDetailsPage: (state) => state = 'DetailsPage'
    }
});

export const {onHomePage, onDetailsPage} = pagesReducer.actions;
export default pagesReducer.reducer;
