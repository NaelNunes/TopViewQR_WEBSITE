import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/assets/logo.png";
import logoheader from "../../../public/assets/logoheader.png";
import "./styles.css";
import { useAuth } from "../../hooks/Auth/index";
import { Navbar } from "react-bootstrap";
import React, { useState } from "react";
// import $ from "jquery";
import { useEffect } from "react";

export default function Header() {
  const { usuario, signOut } = useAuth();

  const [active, setActive] = useState(false);

  function toggleMenu(event) {
    if (event.type === "touchstart") event.preventDefault();
    const nav = document.getElementById("linksHeader");
    nav.classList.toggle("active");
    setActive(!active);
    event.currentTarget.setAttribute("aria-expanded", active);
    if (active) {
      event.currentTarget.setAttribute("aria-label", "Fechar Menu");
    } else {
      event.currentTarget.setAttribute("aria-label", "Abrir Menu");
    }
  }

  const navigate = useNavigate();
  return (
    <nav className="container_header">
      <div className="div_img">
        <Link to="/">
          <img className="div_img_1" src={logoheader} alt="logotipo" />
        </Link>
      </div>
      <button
        className="btn-header"
        onClick={toggleMenu}
        onTouchStart={toggleMenu}
        id="buttonmenu"
      >
        Menu
      </button>
      <div id="linksHeader" className="linksHeader">
        <Link className="link_inicio" to="/">
          Início
        </Link>
        <Link className="link_sobre" to="/about">
          Sobre
        </Link>
        {usuario?.id &&
          (usuario?.usu_nivel == "admin" ? (
            <>
              <Link className="link_aulas" to="/aulas">
                Aulas
              </Link>
              <Link className="link_aulas" to="/consultas">
                consultas
              </Link>
            </>
          ) : (
            <Link className="link_aulas" to="/presenca">
              Presença
            </Link>
          ))}{" "}
        <div className="usariologadosty">
          {usuario?.id ? (
            <>
              <Navbar.Brand className="textOla">
                Olá, {usuario.usu_nome}
              </Navbar.Brand>
              <button className="buttonHeader123" onClick={signOut}>
                Sair
              </button>
            </>
          ) : (
            <button
              className="button_entrar"
              onClick={() => navigate("/signIn")}
            >
              Entrar
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
