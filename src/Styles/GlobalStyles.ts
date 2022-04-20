import { createGlobalStyle } from "styled-components";
import { ThemeType } from "../App";

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400&family=Roboto:wght@300&display=swap');

* {
  box-sizing: border-box;
}
body {
    background: ${({ theme }) => theme.colors.body};
    color: #000;
    font-family: 'Poppins', sans-serif;
    font-size: 1.15em;
    margin: 0;
    overflow-x: hidden;
  }
  `;
