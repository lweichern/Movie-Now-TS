import React from "react";
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

import { Link } from "react-router-dom";

import { FaUserCircle } from "react-icons/fa";

export type UserState = {
  email: string;
  username: string;
  password: string;
  favoriteMovies: number[];
};

type IProps = {
  currentPage: string;
  handleClick: React.MouseEventHandler<HTMLLIElement>;
};

const Navbar: React.FC<IProps> = ({ currentPage, handleClick }) => {
  const user = JSON.parse(window.localStorage.getItem("user")!);

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
          <StyledLogo>MovieNow</StyledLogo>
          <StyledLinks>
            <Link to="/">
              <StyledLinkItems
                onClick={handleClick}
                style={{
                  borderBottom: `${
                    currentPage === "Home"
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
                onClick={handleClick}
                style={{
                  borderBottom: `${
                    currentPage === "Movies"
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
