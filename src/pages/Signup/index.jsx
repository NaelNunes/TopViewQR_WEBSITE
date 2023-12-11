import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { object, string, ref } from "yup";
import { api } from "../../utils/api";
import "./styles.css";
import imagemsignin from "../../../public/assets/logo.png";
import imagemsigninfundo from "../../../public/assets/imagemsigninfundo.png";
import imagemsignupleft from "../../../public/assets/imagemsignupleft.png";
import imagemleftsignin1 from "../../../public/assets/imagemleftsignin1.png";
import logombsignin from "../../../public/assets/logombsignin.png";
// Início da classe Signup

export default function Signup() {
  // const [nome, setNome] = useState(
  //   `Usuário ${new Date().toLocaleTimeString("pt-BR")}`
  // );
  // const [email, setEmail] = useState("nada@nada.com");
  // const [senha, setSenha] = useState("U123456u!");
  // const [contraSenha, setContraSenha] = useState("U123456u!");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("germain.patty@google.com");
  const [senha, setSenha] = useState("U12345u!");
  const [contraSenha, setContraSenha] = useState("U12345u!");

  const navigate = useNavigate();

  /*
Criei Variáveis para a validação no para o teste no backend/frontend
*/
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    let usuario = {
      usu_nome: nome.trim(),
      usu_email: email.trim(),
      usu_senha: senha.trim(),
      usu_contrasenha: contraSenha.trim(),
    };

    let usuarioSchema = object({
      usu_nome: string()
        .required("Entre com o Nome")
        .min(7, "Mínimo de sete caracteres")
        .matches(/\s/, "O nome tem que ter um espaço"),
      usu_email: string()
        .email("Entre com um e-mail válido")
        .required("Entre com o e-mail")
        .matches(/\./, "Entre com um e-mail válido"),

      usu_senha: string()
        .required("Entre com a senha")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
          "A senha precisa ter no mínimo 6 caracteres, sendo: uma maiúscula, uma minúscula, um número e um caracter especial",
        ),
      usu_contrasenha: string()
        .required("Entre com a contra-senha")
        .oneOf(
          [ref("usu_senha"), null],
          "Senha e Contra-senha tem que ser iguais",
        ),
    });
    /*
  Criei um objeto para poder validar
  as entidades do backend para uma melhor
  validação de dados

  Criando o required para ser requerido
  Matches para que tal opção seja necessária
  Min para ter minemo de caracteres
  OneOf para ser comparado com tal função dentro para validação
    */
    try {
      await usuarioSchema.validate(usuario);
    } catch (error) {
      console.log(error.message);
      return false;
    }
    delete usuario.usu_contrasenha;

    let URL = "/usuarios";

    /*
Importei o banco de dados / Backend
para poder importar as variáveis no banco
*/

    const page = await api(URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    /*
    Basicamente isso transforma o método de postagem para POST
    para poder enviar os dados para o banco de dado a partir de JSON
    */

    let statusPage = parseInt(page.status, 10);

    if (statusPage !== 201) {
      alert(`Erro: ${(await page.json()).error}`);
      return false;
    }

    const data = await page.json();

    if (data.length === 0) {
      alert(`Erro: erro de servidor`);
      return false;
    }

    setNome("");
    setEmail("");
    setSenha("");
    setContraSenha("");

    alert("Verifique seu e-mail");

    navigate("/");
  };

  /*
  Escrevi um código para poder enviar e identificar mensagens
  de erro ou de sucesso para entender se deu certo ou não o POST
  e em seguida acessar a página MAIN
  */

  const handleReset = async (evt) => {
    evt.preventDefault();
    setNome("");
    setEmail("");
    setSenha("");
    setContraSenha("");
  };

  /*
  Escrevi um código para quando a validação der certo
  todos os valores
  */

  return (
    <div className="divgeralsignup">
      <div className="telaleftimg1">
        <img src={imagemleftsignin1} alt="logo" className="logosignin2" />
      </div>
      <div className="formsignup">
        <form className="formsignup1">
          <img className="logombsignin" src={logombsignin} alt="logotipo" />
          <h2 className="h2signup">Área de Registro</h2>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome Completo"
            className="nomecompsignup"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className="emailsignup"
          />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            className="senhasignup"
          />
          <input
            type="password"
            value={contraSenha}
            onChange={(e) => setContraSenha(e.target.value)}
            placeholder="Contra senha"
            className="contrasenhasignup"
          />
          <button
            className="cadastrarsignup"
            type="submit"
            onClick={handleSubmit}
          >
            Cadastrar
          </button>
          <button className="limparsignup" type="reset" onClick={handleReset}>
            Limpar Campos
          </button>
          <Link className="voltarlinksignin" to="/signin">
            Voltar
          </Link>
        </form>
      </div>
    </div>
  );
}
