import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import API_Details from "../API_Details";
import Carousel from "../Components/HomePage/Carousel/Carousel";
import Favorites from "../Components/HomePage/Favorites/Favorites";
import Hero from "../Components/HomePage/Hero/Hero";
import { CastState } from "../Components/MoviesPage/Header/Header";
import { Container } from "../Styles/CommonStyles/Container";

export type MovieState = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title?: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime?: number;
  budget?: number;
  genres?: GenreState[];
};

export type GenreState = {
  id: number;
  name: string;
};

export type CreditsState = {
  id: number;
  cast: CastState[];
};

const Home = () => {
  const [movies, setMovies] = useState<MovieState[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<MovieState[]>([]);

  const theme = useTheme();

  useEffect(() => {
    fetchMovies();
    fetchTrendingMovies();
  }, []);

  const fetchMovies = (): void => {
    fetch(API_Details.POPULAR_MOVIES_URL)
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((err) => console.log(err));
  };

  const fetchTrendingMovies = (): void => {
    fetch(API_Details.TRENDING_MOVIES_URL)
      .then((res) => res.json())
      .then((data) => setTrendingMovies(data.results))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {movies.length !== 0 && (
        <Hero
          image1={`${API_Details.BASE_IMAGE_URL}${API_Details.BACKDROP_SIZE}${movies[0].backdrop_path}`}
          image2={`${API_Details.BASE_IMAGE_URL}${API_Details.BACKDROP_SIZE}${movies[1].backdrop_path}`}
          image3={`${API_Details.BASE_IMAGE_URL}${API_Details.BACKDROP_SIZE}${movies[2].backdrop_path}`}
        />
      )}
      <Container>
        <Carousel
          movieList={movies}
          carouselTitle="Popular Movies"
          autoplay={true}
        />

        <Carousel
          movieList={trendingMovies}
          carouselTitle="Trending Movies"
          autoplay={false}
        />

        <h1 style={{ color: (theme as any).colors.content1 }}>
          Favorite Movies
        </h1>
        {JSON.parse(window.localStorage.getItem("user")!) !== null ? (
          <Favorites />
        ) : (
          <h3>Please Login to add favorite movies.</h3>
        )}
      </Container>
    </div>
  );
};

export default Home;
