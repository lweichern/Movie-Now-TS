import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_Details from "../API_Details";
import { Container } from "../Styles/CommonStyles/Container";
import Header from "../Components/ActorsPage/Header/Header";
import Grid from "../Components/Common/Grid/Grid";
import { CastState } from "../Components/MoviesPage/Header/Header";
import { MovieState } from "./Home";

export default function Actor() {
  const { actorId } = useParams() as any;
  const [movies, setMovies] = useState<MovieState[]>();
  const [actor, setActor] = useState<CastState>();

  useEffect(() => {
    fetchMoviesThatActorActsIn();
    fetchActorDetails();
  }, []);

  const fetchMoviesThatActorActsIn = async () => {
    try {
      const movie = await API_Details.fetchMoviesThatActorActsIn(
        actorId as number
      );
      setMovies(movie.cast);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchActorDetails = async () => {
    try {
      const actorDetails = await API_Details.fetchActorDetails(
        actorId as number
      );
      setActor(actorDetails);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {actor && (
        <>
          <Header actorDetails={actor} />

          <Container>
            <Grid headerTitle={`${actor.name} Movies`} movieList={movies} />
          </Container>
        </>
      )}
    </>
  );
}
