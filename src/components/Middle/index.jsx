import { Link } from "react-router-dom";
import "./styles.css";

export default function Header() {
  return (
    <nav className="navMiddle">
      <div className="linksHeader">
        <Link className="buttonHeader" to="/consulta-aulas">
          Aulas
        </Link>
        <Link className="buttonHeader" to="/consulta-aulausuarios">
          Aula-Usuários
        </Link>
        <Link className="buttonHeader" to="/consulta-materias">
          Matérias
        </Link>
        <Link className="buttonHeader" to="/consulta-cursos">
          Cursos
        </Link>
        <Link className="buttonHeader" to="/consulta-cursousuarios">
          Curso-Usuários
        </Link>
        <Link className="buttonHeader" to="/consulta-usuarios">
          Usuários
        </Link>
      </div>
    </nav>
  );
}
