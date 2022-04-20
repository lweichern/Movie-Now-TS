import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./Styles/GlobalStyles";

// Routes
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Components
import Navbar from "./Components/Common/Navbar/Navbar";
import Footer from "./Components/Common/Footer/Footer";
import Genre from "./Components/MoviesPage/Genre/Genre";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import SignIn from "./Components/SignInPage/SignInPage";

// Pages
import Home from "./Pages/Home";
import Movies from "./Pages/Movies";
import Actor from "./Pages/Actors";
import SignUp from "./Components/SignUpPage/SignUpPage";

const theme = {
  colors: {
    body: "#fff",
    content1: "#fa1e4e",
    content2: "#5c1efa",
  },
  mobile: "768px",
  tablet: "1024px",
};

// theme type
export type ThemeType = typeof theme;

function App() {
  const [currentPage, setCurrentPage] = useState("Home");

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    setCurrentPage(event.currentTarget.textContent!);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyles />
        <Navbar currentPage={currentPage} handleClick={handleClick} />
        <Routes>
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
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
