import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_Details from "../../API_Details";
import Header from "../MoviesPage/Header/Header";
import { Container } from "../../Styles/CommonStyles/Container";
import Grid from "../Common/Grid/Grid";
import Carousel from "../HomePage/Carousel/Carousel";
import { MovieState } from "../../Pages/Home";

export default function MovieDetails() {
  const [movie, setMovie] = useState<MovieState>();
  const [movieCredits, setMovieCredits] = useState();
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  const { movieId } = useParams() as any;

  useEffect(() => {
    fetchMovie();
    fetchMovieCredits();
  }, []);

  useEffect(() => {
    fetchSimilarMovies();
  }, [movieId]);

  console.log(recommendedMovies);

  const fetchMovie = async () => {
    try {
      const movie = await API_Details.fetchMovie(movieId as number);
      setMovie(movie);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMovieCredits = async () => {
    try {
      const movie = await API_Details.fetchMovieCredits(movieId as number);
      setMovieCredits(movie);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSimilarMovies = async () => {
    const recommendedMovies = await API_Details.fetchSimilarMovies(
      movieId as number
    );
    setRecommendedMovies(recommendedMovies.results);
  };

  return (
    <div>
      {movie && <Header headerMovie={movie} genreList={movie.genres} />}
      <Container>
        <Grid headerTitle="Actors" castList={movieCredits} />
        {recommendedMovies.length !== 0 && (
          <Carousel
            carouselTitle="Recommended Movies"
            movieList={recommendedMovies}
            autoplay={true}
          />
        )}
      </Container>
    </div>
  );
}
