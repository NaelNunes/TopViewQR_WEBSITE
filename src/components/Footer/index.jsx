import React from "react";
import "./styles.css";
import logofooter from "../../../public/assets/logofooter.png";
import { Link, useNavigate } from "react-router-dom";
import logofooterinsta from "../../../public/assets/logofooterinsta.png";

export default function Footer() {
  return (
    <div className="footer">
      <Link to="/">
        <img src={logofooter} className="logofooter" />
      </Link>
      {/* <div className="titlefooter">TopViewQR</div> */}
      <div className="linksfooter">
        <Link className="link_inicio" to="/">
          Início
        </Link>
        <Link className="link_sobre" to="/about">
          Sobre
        </Link>
        <a href="https://www.instagram.com/">
          <img src={logofooterinsta} className="logofooterinsta" />
        </a>
      </div>
    </div>
  );
}
