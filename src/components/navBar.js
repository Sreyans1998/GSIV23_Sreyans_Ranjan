import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from '../redux/slice/movies';
import { onHomePage } from '../redux/slice/pages';
import homeIcon from '../images/icons8-home-48.png'
import serachIcon from '../images/search_black_24dp.svg'
import { useNavigate } from 'react-router-dom';

const NavBar = () =>{
    const [searchInput, setSearchInput] = useState("");
    const [searchEvent, setSearchEvent] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const state = useSelector((state) => state);

    const inputEvent = (e) => {
        setSearchInput(e.target.value);

        if(e.target.value === "" && searchEvent){
            dispatch(fetchMovies(`https://api.themoviedb.org/3/discover/movie?page=1`));
            setSearchEvent(false);
        }
    }

    const searchItem = (e) => {
        if(searchInput !== ""){
            dispatch(fetchMovies(`https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`));
            setSearchEvent(true);
        }
    }
    return (
        <div className="NavBar">
            <div className="Nav">
                <div className="NavItems">
                    {
                        (state.pages === "DetailsPage") 
                        ? <label>Movie Details</label> 
                        : <div className="SearchBar">
                            <img src={serachIcon} alt="" className="serachIcon" onClick={(e) => searchItem(e)} />
                            <input type="text" className="searchInput" 
                            onChange={inputEvent} value={searchInput} placeholder="Search.." />
                          </div>
                    }
                </div>
                <div className="NavItems">
                    <img src={homeIcon} alt="" onClick={(e) => {dispatch(onHomePage()); navigate('/');}}/>
                </div>
            </div>
        </div>
    );
} 

export default NavBar;