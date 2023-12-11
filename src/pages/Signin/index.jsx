import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/Auth/index";
import { useState } from "react";
import imagemsignin from "../../../public/assets/logoazul.png";
import imagemfundosignin from "../../../public/assets/imagemfundosignin.jpg";
import imagemsigninfundo from "../../../public/assets/imagemsigninfundo.png";
import imagemleft2 from "../../../public/assets/imagemleft2.png";
import imagemleftsignin1 from "../../../public/assets/imagemleftsignin1.png";
import logombsignin from "../../../public/assets/logombsignin.png";
import "./styles.css";
export default function Signin() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [user, setUser] = useState("jerrold.jursch@uol.com.br");
  const [password, setPassword] = useState("U12345u!");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const acessarHandle = async (evt) => {
    evt.preventDefault();
    try {
      await signIn({ usu_email: user, usu_senha: password });
      navigate("/");
    } catch (error) {
      console.log("Erro de login");
      setUser("");
      setPassword("");
    }
  };

  const limparHandle = (evt) => {
    evt.preventDefault();
    setUser("");
    setPassword("");
  };
  return (
    <div className="contentSignin">
      <div className="telaleftimg">
        <img src={imagemleftsignin1} alt="logo" className="logosignin1" />
      </div>
      <div className="divformsignin">
        <form className="login-form">
          <img className="logombsignin" src={logombsignin} alt="logotipo" />
          <h2 className="h2signin">Área de Login</h2>
          <h3 className="h3signin1">Entre com sua conta</h3>
          <input
            value={user}
            onChange={(evt) => setUser(evt.target.value)}
            placeholder="Usuário"
            className="usuariosignin1"
          />

          <input
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            placeholder="Senha"
            type="password"
            className="senhasignin1"
          />
          <button className="acessarsignin" onClick={acessarHandle}>
            Acessar{" "}
          </button>
          <button className="limparsignin" onClick={limparHandle}>
            Limpar{" "}
          </button>
          <p className="pSignin">
            {" "}
            Não tem uma conta?
            <Link className="cadastrarlinksignin" to="/signup">
              &nbsp;Cadastrar-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
