import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";



const Footer = () => (
  <div className="footer">
    <p>Copyright @ 2021 : Akshad Kolhatkar </p>
    <a style={{color:'white'}} href="https://www.github.com/AkshadK7"> <FontAwesomeIcon icon={faGithub} />&nbsp;GitHub</a><br></br>
    <a style={{color:'white'}} href="https://www.linkedin.com/in/akshadk7/"> <FontAwesomeIcon icon={faLinkedin} />&nbsp;LinkedIn</a><br></br>
    <a style={{color:'white'}} href="https://twitter.com/AkshadK7">  <FontAwesomeIcon icon={faTwitter} />Twitter</a><br></br>
    
  </div>
);

export default Footer;