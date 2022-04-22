import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Pages
import MovieDetails from "../Components/MovieDetails/MovieDetails";
import Genre from "../Components/MoviesPage/Genre/Genre";
import SignIn from "../Components/SignInPage/SignInPage";
import SignUp from "../Components/SignUpPage/SignUpPage";
import Actor from "../Pages/Actors";
import Home from "../Pages/Home";
import Movies from "../Pages/Movies";

// Framer motion library
import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/genre/:genre" element={<Genre />} />
        <Route
          path="/movies/movie-details/:movieId"
          element={<MovieDetails />}
        />
        <Route path="/actor/:actorId" element={<Actor />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
