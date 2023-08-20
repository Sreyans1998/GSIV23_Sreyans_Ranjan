import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Card from '../components/card';
import { fetchMovies, fetchNewMovies } from '../redux/slice/movies';

const Home = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const [pageNo , setPageNo] = useState(1);
    const handleScroll = async () => {
    //     console.log("window.innerHeight ",window.innerHeight);
    //     console.log("document.documentElement.scrollTop ",document.documentElement.scrollTop);
    //     console.log("document.documentElement.scrollHeight ",document.documentElement.scrollHeight);
        try {
            if((window.innerHeight + document.documentElement.scrollTop) >= (document.documentElement.scrollHeight - 10)){
                await dispatch(fetchNewMovies(`https://api.themoviedb.org/3/discover/movie?page=${pageNo + 1}`));
                setPageNo(pageNo + 1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [])
    if(state.movies.data.length === 0 || state.movies.data === undefined){
        dispatch(fetchMovies(`https://api.themoviedb.org/3/discover/movie?page=${pageNo}`));
    }

    if(state.movies.isLoading && !state.movies.Error){
        return (
            <>
                <div className="Nodata">
                    <h1>Loading Data..</h1>
                </div>
            </>
        )
    }else if(state.movies.data.length !== 0){
        return (
            <>
            <div className="content">
                {
                    state.movies.data.map((item, i) => <Card data={item}></Card>)
                }
            </div>
            </>
        );
    }else{
        return (
            <>
                <div className="Nodata">
                    <h1>No data Found.</h1>
                </div>
            </>
        )
    }
}

export default Home;