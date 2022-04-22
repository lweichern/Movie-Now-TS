import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledNavHeader = styled.nav`
  width: 100%;
  background: ${({ theme }) => theme.colors.content1};
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
  box-shadow: 2px -3px 14px #000;
`;

export const StyledNavContent = styled.nav`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledLogo = styled.h2`
  color: #fff;
`;

export const StyledLinks = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;

  & > a {
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: 0.3s;
  }

  // & > a:hover {
  //   border-bottom: 2px solid #fff;
  // }
`;

export const LinkTitles = styled.div`
  color: #fff;
`;

export const LinkBorders = styled(motion.div)`
  height: 2px;
  background: #fff;
  width: 100%;
`;

export const StyledLinkItems = styled.li`
  list-style: none;
  margin: 0 0.5rem;
  color: #fff;
  text-decoration: none;
  padding: 0.4rem;
  transition: 0.4s;

  &:hover {
    color: ${({ theme }) => theme.colors.content1};
    background: rgba(255, 255, 255, 0.8);
  }
`;

export const StyledSignIn = styled.h4`
  cursor: pointer;
  transition: 0.2s;
  border-radius: 0.2rem;
  color: #fff;

  &:hover {
    background: #fff;
    color: ${({ theme }) => theme.colors.content1};
  }
`;

export const StyledSignOut = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export const Username = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #fff;
  height: fit-content;
  gap: 0.4rem;
  padding: 0.3rem;
  border-radius: 0.3rem;
`;

export const SignOutButton = styled.h4`
  cursor: pointer;
  padding: 0.5rem;
  transition: 0.2s;
  border-radius: 0.2rem;
  color: #fff;

  &:hover {
    background: #fff;
    color: ${({ theme }) => theme.colors.content1};
  }
`;
