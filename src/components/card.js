import React from 'react';
import { useDispatch } from "react-redux";
import { onDetailsPage } from '../redux/slice/pages';
import { useNavigate } from "react-router-dom";
import { fetchMovieDetails } from '../redux/slice/movies';

const Card = (props) =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClickCard = (e, movieId) => {
        console.log(movieId);
        dispatch(onDetailsPage());
        dispatch(fetchMovieDetails(movieId));
        navigate('/DetailsPage');
    }
    return (
        <>
            <div className="cards" onClick={(e) => onClickCard(e, props.data.id)}>
                <div className="cardsImg">
                    <img src={props.data.poster_path} alt="" />
                </div>
                <div className="cardsBody">
                    <div className="cardsTitle">
                        <div className="movieTitle">{props.data.title}</div>
                        <div className="rating">({props.data.vote_average})</div>
                    </div>
                    <div className="cardsText">
                        <label>{props.data.overview.slice(0,25)}...</label>
                    </div>
                </div>
            </div>
        </>
    );
} 

export default Card;