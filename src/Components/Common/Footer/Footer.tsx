import React from "react";
import {
  FooterContainer,
  SocialIcons,
  FooterLinks,
  FooterTitle,
  Copyright,
} from "./Footer.styled";
import {
  FaTwitter,
  FaInstagram,
  FaDiscord,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <FooterContainer>
      <SocialIcons>
        <FaTwitter style={{ overflow: "visible" }} />
        <FaInstagram />
        <FaDiscord />
        <FaFacebook />
        <FaYoutube />
      </SocialIcons>
      <FooterLinks>
        <li>Get the MovieNow App</li>
        <li>Help</li>
        <li>Site Index</li>
        <li>MovieNow Pro</li>
        <li>Box Office Map</li>
        <li>MovieNow Developer</li>
      </FooterLinks>
      <FooterLinks>
        <li>Press Room</li>
        <li>Advertising</li>
        <li>Jobs</li>
        <li>Conditions to Use</li>
        <li>Privacy Policy</li>
        <li>Interest-Based Ads</li>
      </FooterLinks>
      <FooterTitle>The MovieNow Company</FooterTitle>
      <Copyright>Copyright &copy; 2022 MovieNow.</Copyright>
    </FooterContainer>
  );
};

export default Footer;
