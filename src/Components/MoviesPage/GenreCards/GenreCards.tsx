import React, { useEffect, useState } from "react";
import { Card, CardImage, CardTextTitle } from "./GenreCards.styled";
import api_details from "../../../API_Details";
import { Link } from "react-router-dom";
import { GenreState, MovieState } from "../../../Pages/Home";

const GenreCards: React.FC<GenreState> = ({ id, name }) => {
  const [movie, setMovie] = useState<MovieState>();

  useEffect(() => {
    fetchTopRatedMovieByGenre();
  }, []);

  const fetchTopRatedMovieByGenre = async () => {
    try {
      const movie = await api_details.fetchTopRatedMovieByGenre(id);
      setMovie(movie.results[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // Framer motion variants
  const imageVariants = {
    rest: {
      opacity: 0.5,
    },
    hover: {
      opacity: 1,
      transition: {
        duration: 0.4,
        type: "tween",
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    rest: {
      opacity: 1,
      y: "-50%",
      x: "-50%",
    },
    hover: {
      opacity: 0,
      y: "-30%",
      x: "-50%",
      transition: {
        duration: 0.4,
        type: "tween",
        ease: "easeOut",
      },
    },
  };

  return (
    <Link
      to={`/movies/genre/${id}`}
      style={{ width: "400px", margin: "0 auto" }}
    >
      <Card initial="rest" whileHover="hover" animate="rest">
        {/* <CardImage
        src={`${api_details.IMAGE_BASE_URL}${api_details.BACKDROP_SIZE}${
          movie !== undefined && movie.backdrop_path
        }`}
      /> */}
        {movie !== undefined && (
          <CardImage
            src={`${api_details.IMAGE_BASE_URL}${api_details.BACKDROP_SIZE}${movie.backdrop_path}`}
            variants={imageVariants}
          />
        )}

        <CardTextTitle variants={textVariants}>{name}</CardTextTitle>
      </Card>
    </Link>
  );
};

export default GenreCards;
