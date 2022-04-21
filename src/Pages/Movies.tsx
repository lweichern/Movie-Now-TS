import React, { useEffect, useState } from "react";

// Components
import Header from "../Components/MoviesPage/Header/Header";
import SearchBar from "../Components/MoviesPage/SearchBar/SearchBar";
import { MovieState, GenreState } from "./Home";
import { Flex } from "../Styles/CommonStyles/Flex.styled";

// API
import API_Details from "../API_Details";
import { Container } from "../Styles/CommonStyles/Container";
import GenreCards from "../Components/MoviesPage/GenreCards/GenreCards";
import Grid from "../Components/Common/Grid/Grid";
import { DefaultTheme, useTheme } from "styled-components";
import LoadMoreButton from "../Components/MoviesPage/LoadMoreButton/LoadMoreButton";
import Spinner from "../Components/Common/Spinner/Spinner";

const Movies = () => {
  const [headerMovie, setHeaderMovie] = useState<MovieState>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [genres, setGenres] = useState<GenreState[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [searchedMovies, setSearchedMovies] = useState<MovieState[]>([]);
  const [spinner, setSpinner] = useState<boolean>(false);

  useEffect(() => {
    fetchMovie();
    fetchAllGenre();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [searchTerm]);

  useEffect(() => {
    setTimeout(() => {
      loadMoreMovies();
      setSpinner(false);
    }, 500);
  }, [pageNum]);

  const theme = useTheme();

  const fetchMovie = (): void => {
    fetch(API_Details.POPULAR_MOVIES_URL)
      .then((res) => res.json())
      .then((data) => setHeaderMovie(data.results[0]))
      .catch((err) => console.log(err));
  };

  const fetchMovies = async () => {
    try {
      setPageNum(1);
      const movie = await API_Details.searchMovies(searchTerm, pageNum);

      setSearchedMovies(movie.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllGenre = () => {
    fetch(API_Details.ALL_GENRES_URL)
      .then((res) => res.json())
      .then((data) => setGenres(data.genres))
      .catch((err) => console.log(err));
  };

  const handleSearchTerm = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value);
  };

  const loadMoreMovies = async () => {
    try {
      const movie = await API_Details.searchMovies(searchTerm, pageNum);

      setSearchedMovies((prevMovie) =>
        pageNum > 1 ? [...prevMovie, ...movie.results] : [...movie.results]
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageIncrement = () => {
    setPageNum((prevNum) => prevNum + 1);
    setSpinner(true);
  };

  return (
    <>
      {headerMovie !== undefined && (
        <>
          <Header headerMovie={headerMovie!} />
          <SearchBar
            searchTerm={searchTerm}
            handleSearchTerm={handleSearchTerm}
          />

          <Container>
            {searchTerm !== "" && (
              <>
                <h1 style={{ color: (theme as any).colors.content1 }}>
                  Searched Movies
                </h1>
                <Grid headerTitle="" movieList={searchedMovies} />
              </>
            )}

            {spinner && <Spinner />}

            {searchTerm !== "" && !spinner && (
              <LoadMoreButton handlePageIncrement={handlePageIncrement} />
            )}

            <h1 style={{ color: (theme as any).colors.content1 }}>
              Movie Genre
            </h1>
            <Flex>
              {genres.length !== 0 &&
                genres.map((genre) => {
                  if (genre.id !== 99) {
                    return (
                      <GenreCards
                        key={genre.id}
                        id={genre.id}
                        name={genre.name}
                      />
                    );
                  }
                })}
            </Flex>
          </Container>
        </>
      )}
    </>
  );
};

export default Movies;
