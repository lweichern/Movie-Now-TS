import React, { useEffect, useState } from "react";
import API_DETAILS from "../../../API_Details";
import Grid from "../../Common/Grid/Grid";
import { MovieState } from "../../../Pages/Home";

const Favorites = () => {
  const [movieList, setMovieList] = useState<MovieState[]>([]);

  const movieIdList =
    JSON.parse(window.localStorage.getItem("user")!) !== null
      ? JSON.parse(window.localStorage.getItem("user")!).favoriteMovies
      : [];

  console.log(movieIdList);

  useEffect(() => {
    movieIdList.map((item: number) => {
      fetchMovie(item);
    });
  }, []);

  const fetchMovie = async (movieId: number) => {
    try {
      const movie: MovieState = await API_DETAILS.fetchMovie(movieId);

      setMovieList((prevMovieList) => [...prevMovieList, movie]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {movieIdList !== null ? (
        movieList.length !== 0 && <Grid movieList={movieList} />
      ) : (
        <h3>Please Login to add favorite movies.</h3>
      )}
    </div>
  );
};

export default Favorites;
