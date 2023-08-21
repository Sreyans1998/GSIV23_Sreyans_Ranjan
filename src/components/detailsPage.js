import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DetailsPage = () => {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  if (state.pages === "Home") {
    navigate("/");
  }
  if (state.movies.movieData !== null) {
    let MovieData = state.movies.movieData.movieDetails;
    let MovieCast = state.movies.movieData.casDetails;

    return (
      <>
        <div className="detailsView">
          <div className="movieContent">
            <div className="movieImg">
              {/* <img src={MovieData.poster_path} alt="..." /> */}
            </div>
            <div className="movieDetails">
              <div className="movieTitle">
                <h2>{MovieData.original_title}</h2>
                <label>Rating : ({MovieData.vote_average})</label>
              </div>
              <div className="movieOverView">
                <label>
                  Realeased on : {MovieData.release_date} | RunTime :{" "}
                  {MovieData.runtime} Minutes | Director :{" "}
                </label>
                <br />
                <label>
                  Cast :{" "}
                  {MovieCast.cast.map((element, index) => {
                    if (index === 0) {
                      return element.name;
                    } else {
                      return `, ${element.name}`;
                    }
                  })}
                </label>
              </div>
              <div className="movieDescription">
                <p>{MovieData.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="Nodata">
          <h1>Loading Data..</h1>
        </div>
      </>
    );
  }
};

export default DetailsPage;
