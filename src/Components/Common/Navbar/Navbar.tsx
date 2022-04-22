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
  LinkTitles,
  LinkBorders,
} from "./Navbar.styled";
import { Container } from "../../../Styles/CommonStyles/Container";

import { Link, useLocation } from "react-router-dom";

import { FaUserCircle } from "react-icons/fa";

// Framer motion
import { motion, AnimateSharedLayout } from "framer-motion";

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

  // Framer motion transitions
  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 30,
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
              <StyledLinkItems>
                <LinkTitles>Home</LinkTitles>
                {currentPath === "/" && (
                  <LinkBorders layoutId="linkBorder" transition={spring} />
                )}
              </StyledLinkItems>
            </Link>

            <Link to="/movies">
              <StyledLinkItems>
                <LinkTitles>Movies</LinkTitles>
                {currentPath.includes("movies") && (
                  <LinkBorders layoutId="linkBorder" transition={spring} />
                )}
              </StyledLinkItems>
            </Link>
          </StyledLinks>
          {JSON.parse(window.localStorage.getItem("user")!) === null ? (
            <Link to={"/sign-in"}>
              <LinkTitles>Sign In</LinkTitles>
              {currentPath.includes("sign-in") && (
                <LinkBorders layoutId="linkBorder" transition={spring} />
              )}
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
