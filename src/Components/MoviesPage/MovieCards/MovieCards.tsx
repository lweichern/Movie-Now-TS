import React, { useEffect, useState } from "react";
import {
  Card,
  CardImage,
  MovieRatings,
  MovieTitle,
  MovieDetails,
  MovieGenreContainer,
  MovieGenre,
  OuterCard,
} from "../MovieCards/MovieCards.styled";
import API_Details from "../../../API_Details";
import { Link } from "react-router-dom";
import NoImage from "../../../Images/no_image.jpg";
import { motion } from "framer-motion";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MovieState } from "../../../Pages/Home";

type IProps = {
  movie: MovieState;
};

const MovieCards: React.FC<IProps> = ({ movie }) => {
  const [genreList, setGenreList] = useState([]);
  const [url, setUrl] = useState(window.location.href);

  useEffect(() => {
    fetchAllGenre();
  }, []);

  const fetchAllGenre = () => {
    fetch(API_Details.ALL_GENRES_URL)
      .then((res) => res.json())
      .then((data) => setGenreList(data.genres))
      .catch((err) => console.log(err));
  };

  // Check if user is logged in
  const currentUser = JSON.parse(window.localStorage.getItem("user")!);

  const cardVariants = {
    rest: {
      scale: 1,
      y: 50,
      opacity: 0,
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        type: "tween",
        ease: "easeOut",
      },
    },
  };

  const toggleFavorite = (e: React.MouseEvent<SVGElement>) => {
    const currentUser = JSON.parse(window.localStorage.getItem("user")!);

    const favoriteMoviesArray = currentUser.favoriteMovies;

    if (!favoriteMoviesArray.includes(movie.id)) {
      favoriteMoviesArray.push(movie.id);

      window.localStorage.setItem(
        "user",
        JSON.stringify({
          email: currentUser.email,
          username: currentUser.username,
          password: currentUser.password,
          favoriteMovies: favoriteMoviesArray,
        })
      );
    } else {
      const filteredFavoriteMovies = favoriteMoviesArray.filter(
        (item: number) => item !== movie.id
      );

      window.localStorage.setItem(
        "user",
        JSON.stringify({
          email: currentUser.email,
          username: currentUser.username,
          password: currentUser.password,
          favoriteMovies: filteredFavoriteMovies,
        })
      );
    }

    const allUsers = JSON.parse(window.localStorage.getItem("users")!);
    const getCurrentUsers = allUsers.find((item: string) => currentUser);
  };

  return (
    <OuterCard>
      <Card
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
        whileInView="show"
        layout
      >
        <Link to={`/movies/movie-details/${movie.id}`}>
          <CardImage
            src={
              movie.poster_path !== null
                ? `${API_Details.IMAGE_BASE_URL}${API_Details.POSTER_SIZE}${movie.poster_path}`
                : NoImage
            }
            alt={`${movie.title} poster image`}
            loading="lazy"
          />
        </Link>

        <MovieRatings>{movie.vote_average}</MovieRatings>
        <MovieDetails>
          <MovieTitle>{movie.title}</MovieTitle>

          {currentUser == null ? (
            ""
          ) : currentUser.favoriteMovies.includes(movie.id) ? (
            <AiFillHeart className="heart-icon" onClick={toggleFavorite} />
          ) : (
            <AiOutlineHeart className="heart-icon" onClick={toggleFavorite} />
          )}
        </MovieDetails>
      </Card>
    </OuterCard>
  );
};

export default MovieCards;
