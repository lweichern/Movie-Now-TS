import React, { useEffect, useState } from "react";
import {
  RightContent,
  SignInContainer,
  SignInContent,
  LeftContent,
  SignUpText,
} from "./SignInPage.styled";

// import Undraw from "react-undraw";
import { useTheme } from "styled-components";
import SignInImage from "../../undraw/sign-in.svg";

// Material UI
import { TextField, Button } from "@mui/material";

// Redux
// import { login } from "../../redux/features/userSlice";

// React Routers
import { Link } from "react-router-dom";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { UserState } from "../Common/Navbar/Navbar";
// import { useDispatch } from "react-redux";

// Framer motion
import { motion } from "framer-motion";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const theme = useTheme();

  //   Undraw.defaultProps.primaryColor = "#fff";

  //   const dispatch = useDispatch();

  // useEffect(() => {
  //   window.localStorage.setItem("user", null);
  // }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isUsernameFound = true;
    const usersArray = JSON.parse(window.localStorage.getItem("users")!);
    const usernameArray: string[] = [];

    // dispatch(login(userObject));

    usersArray.map((item: UserState) => {
      usernameArray.push(item.username);
      usernameArray.push(item.email);
    });

    usersArray.map((item: UserState) => {
      if (username === item.email || username === item.username) {
        if (password === item.password) {
          window.localStorage.setItem("user", JSON.stringify(item));
          window.location.href = "/";
          setUsername("");
          setPassword("");
        } else {
          alert("Incorrect Password!");
        }
      }
    });

    if (!usernameArray.includes(username)) {
      alert("Username not found!");
    }
  };

  return (
    <SignInContainer
      initial={{
        x: "-100%",
      }}
      animate={{
        x: 0,
      }}
      exit={{ x: "-100%" }}
    >
      <AnimatePresence>
        <SignInContent layoutId="division" transition={{ duration: 0.6 }}>
          <LeftContent>
            <img
              src={SignInImage}
              style={{ height: "75vh", width: "100%" }}
              alt="Sign In Image"
            />
          </LeftContent>
          <RightContent>
            <h1 style={{ color: (theme as any).colors.content2 }}>Sign In</h1>
            <form onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic"
                label="Email / Username"
                variant="outlined"
                className="input"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                className="input"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <SignUpText>
                Don't have an account yet? Sign Up{" "}
                <Link to={"/sign-up"} style={{ textDecoration: "underline" }}>
                  Here
                </Link>
              </SignUpText>
              <Button
                id="outlined-basic"
                variant="outlined"
                type="submit"
                style={{
                  color: (theme as any).colors.content2,
                  border: `1px solid ${(theme as any).colors.content2}`,
                }}
              >
                Sign In
              </Button>
            </form>
          </RightContent>
        </SignInContent>
      </AnimatePresence>
    </SignInContainer>
  );
};

export default SignIn;
