import React, { useState } from "react";
import {
  RightContent,
  SignUpContainer,
  SignUpContent,
  LeftContent,
  SignUpText,
} from "./SignUpPage.styled";

// import Undraw from "react-undraw";
import { useTheme } from "styled-components";
import SignUpImage from "../../undraw/sign-up.svg";

// Material UI
import { TextField, Button } from "@mui/material";

import { Link } from "react-router-dom";
import { UserState } from "../Common/Navbar/Navbar";

// Framer motion
import { AnimatePresence } from "framer-motion";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const theme = useTheme();

  //   Undraw.defaultProps.primaryColor = "#fff";

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usersArray = [];

    const previousUsers = JSON.parse(window.localStorage.getItem("users")!);

    let localStorageUpdate = true;

    const userObject = {
      email: email,
      username: username,
      password: password,
      favoriteMovies: [],
    };

    if (previousUsers == null) {
      usersArray.push(userObject);
    } else {
      previousUsers.map((item: UserState) => {
        if (email == item.email || username == item.username) {
          localStorageUpdate = false;
          return;
        } else {
          usersArray.push(item);
        }
      });
      usersArray.push(userObject);
    }

    if (password !== confirmPassword) {
      alert("Password not matching!");
    } else {
      if (localStorageUpdate) {
        window.localStorage.setItem("users", JSON.stringify(usersArray));
        alert("User successfully created!");

        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      } else {
        alert("Email or Username has been taken!");
      }
    }
  };

  return (
    <SignUpContainer
      initial={{
        x: "100%",
      }}
      animate={{
        x: 0,
      }}
      exit={{ x: "100%" }}
    >
      <AnimatePresence>
        <SignUpContent layoutId="division" transition={{ duration: 0.6 }}>
          <LeftContent>
            <img
              src={SignUpImage}
              style={{ height: "70vh", width: "100%" }}
              alt="Sign Up Image"
            />
          </LeftContent>
          <RightContent>
            <h1 style={{ color: (theme as any).colors.content1 }}>Sign Up</h1>
            <form onSubmit={handleSignUp}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                className="input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <TextField
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                className="input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <SignUpText>
                Already have an account? Sign In{" "}
                <Link to={"/sign-in"} style={{ textDecoration: "underline" }}>
                  Here
                </Link>
              </SignUpText>
              <Button
                id="outlined-basic"
                variant="outlined"
                style={{
                  color: (theme as any).colors.content1,
                  border: `1px solid ${(theme as any).colors.content1}`,
                }}
                type="submit"
              >
                Sign Up
              </Button>
            </form>
          </RightContent>
        </SignUpContent>
      </AnimatePresence>
    </SignUpContainer>
  );
}
