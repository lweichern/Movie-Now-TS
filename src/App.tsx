import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./Styles/GlobalStyles";

// Routes
import { BrowserRouter as Router, HashRouter } from "react-router-dom";

// Components
import Navbar from "./Components/Common/Navbar/Navbar";
import Footer from "./Components/Common/Footer/Footer";

// Pages
import AnimatedRoutes from "./Routes/AnimatedRoutes";

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
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <GlobalStyles />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
