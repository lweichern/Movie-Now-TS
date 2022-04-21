import React, { useEffect } from "react";
import {
  StyledNavHeader,
  StyledNavContent,
  StyledLogo,
  StyledLinks,
  StyledLinkItems,
  StyledSignIn,
  SignOutButton,
  StyledSignOut,
  Username,
} from "./Navbar.styled";
import { Container } from "../../../Styles/CommonStyles/Container";

import { Link, useLocation } from "react-router-dom";

import { FaUserCircle } from "react-icons/fa";

export type UserState = {
  email: string;
  username: string;
  password: string;
  favoriteMovies: number[];
};

const Navbar: React.FC = () => {
  const user = JSON.parse(window.localStorage.getItem("user")!);

  const location = useLocation();
  const currentPath = location.pathname;

  // const dispatch = useDispatch();
  const handleSignOut = () => {
    const updatedUser = JSON.parse(window.localStorage.getItem("user")!);
    const allUsers = JSON.parse(window.localStorage.getItem("users")!);

    const updatedUserArray = allUsers.filter(
      (item: UserState) => item.username !== user.username
    );

    updatedUserArray.push(updatedUser);

    window.localStorage.setItem("users", JSON.stringify(updatedUserArray));

    window.localStorage.setItem("user", JSON.stringify(null));

    // dispatch(logout());

    window.location.reload();
  };
  return (
    <StyledNavHeader>
      <Container>
        <StyledNavContent>
          <Link to={"/"}>
            <StyledLogo>MovieNow</StyledLogo>
          </Link>

          <StyledLinks>
            <Link to="/">
              <StyledLinkItems
                style={{
                  borderBottom: `${
                    currentPath === "/"
                      ? "2px solid #fff"
                      : "2px solid transparent"
                  }`,
                }}
              >
                Home
              </StyledLinkItems>
            </Link>

            <Link to="/movies">
              <StyledLinkItems
                style={{
                  borderBottom: `${
                    currentPath.includes("movies")
                      ? "2px solid #fff"
                      : "2px solid transparent"
                  }`,
                }}
              >
                Movies
              </StyledLinkItems>
            </Link>
          </StyledLinks>
          {JSON.parse(window.localStorage.getItem("user")!) === null ? (
            <Link to={"/sign-in"}>
              <StyledSignIn>Sign In</StyledSignIn>
            </Link>
          ) : (
            <StyledSignOut>
              <Username>
                <FaUserCircle /> {user.username}
              </Username>
              <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
            </StyledSignOut>
          )}
        </StyledNavContent>
      </Container>
    </StyledNavHeader>
  );
};

export default Navbar;
