// import { useState } from "react";
// import QRCode from "qrcode.react";
// import QrCode from "../Aulas/qrcode.jsx";
// import React, { useState } from "react";
import { object, string, ref } from "yup";
import { Modal, Button } from "react-bootstrap";

import imgAddAulas from "../../../public/assets/imgaddaula.png";
import imgExAula from "../../../public/assets/imgexaula.png";

// import Table from "react-bootstrap";

import "./styles.css";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Navbar } from "react-bootstrap";
import { useAuth } from "../../hooks/Auth/index";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import QRCode from "qrcode.react";

export default function Aulas() {
  const [data, setData] = useState([]);
  const [nome, setNome] = useState("Sem Nome");
  const [componente, setComponente] = useState("Matéria");
  // const [hora, setHora] = useState(new Date().toISOString().substring(0,16));
  const [hora, setHora] = useState(() => {
    var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = new Date(Date.now() - tzoffset)
      .toISOString()
      .substring(0, 16);
    return localISOTime;
  });
  const [serie, setSerie] = useState("x° INFO");
  const [qtdadeAula, setQtdadeAula] = useState("1");
  const [conteudoAula, setConteudoAula] = useState("Horário:");
  const [aula, setAula] = useState({});
  const [loadingAula, setLoadingAula] = useState(false);
  const [dataDetalhesAula, setDataDetalhesAula] = useState([]);

  const navigate = useNavigate();
  const { usuario } = useAuth();

  useEffect(() => {
    setAulas();
    setNome(usuario?.id ? usuario.usu_nome : "Sem Nome");
    // console.log(usuario?.usu_nome || "Sem nome")
  }, []);

  useEffect(() => {
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const fetchData = async () => {
      // console.log("iniciou o loading")
      setLoadingAula(true);
      // await sleep(5000);
      let URL = `/aula_usuarios?aula_id=${aula.id}&_expand=usuario`;

      // console.log(URL)
      try {
        const page = await api(URL);
        const dataDetalheaula = await page.json();
        setDataDetalhesAula(dataDetalheaula);
        // console.log(dataDetalheaula);
      } catch (error) {
        console.log(error.message);
      }
      setLoadingAula(false);
      // console.log("parou o loadiung")
    };
    fetchData();
  }, [aula]);

  async function setAulas() {
    // console.log("Chamdno set aulas")
    // let url = "/cidades?id_gte=3";
    // let url = "/cidades?id=1";
    // let url = "/cidades?_sort=cid_estado&_order=desc&id_gte=3";
    //https://ideal-enigma-5jrq6p4w7gv3pxp7-8080.app.github.dev/api/aulas?usuario_id=1&_sort=created_at&_order=desc
    let url = `/aulas?usuario_id=${usuario?.id || 0
      }&_sort=hor_datahora&_order=desc&_limit=10&_page=1`;

    // if (query) {
    //   url += `&${attribute}${operator}=${query}`;
    // }

    // setButtonQuery(false);

    const fetchData = async () => {
      try {
        const response = await api(url);
        // const xtotal = response.headers.get("x-total-count");
        // const totalPages = Math.ceil(xtotal / limit);
        // setPages(totalPages);
        const data = await response.json();
        // console.log(data)
        setData(data);
      } catch (error) {
        console.log(error.message);
        setData([]);
      }
    };

    await fetchData();
  }

  /*
Criei Variáveis para a validação no para o teste no backend/frontend
*/
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    let aulas = {
      usuario_id: usuario.id,
      pro_nome: nome.trim(),
      com_nome: componente.trim(),
      hor_datahora: new Date(hora.trim()),
      alu_serie: serie.trim(),
      aul_conteudo: conteudoAula.trim(),
      aul_qtdadeaulas: qtdadeAula.trim(),
    };

    let aulaSchema = object({
      pro_nome: string()
        .required("Entre com o Nome")
        .min(7, "Mínimo de sete caracteres")
        .matches(/\s/, "O nome tem que ter um espaço"),

      com_nome: string().required("Entre com o componente"),

      hor_datahora: string().required("Entre com um horário"),

      alu_serie: string().required("Entre com a série"),
    });

    try {
      await aulaSchema.validate(aulas);
    } catch (error) {
      console.log(error.message);
      return false;
    }

    let URL = "/aulas";

    /*
Importei o banco de dados / Backend
para poder importar as variáveis no banco
*/

    const page = await api(URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(aulas),
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

    setText("https://tk8fde.csb.app/validar?id=" + data.id);

    // setNome("");
    setComponente("");
    setHora(() => {
      var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
      var localISOTime = new Date(Date.now() - tzoffset)
        .toISOString()
        .substring(0, 16);
      return localISOTime;
    });
    // setSerie("");
    setQtdadeAula("1");
    setConteudoAula("Descreva sua aula");

    alert("Sucesso");

    navigate("/aulas");
  };

  const [text, setText] = useState("");
  const [qrCodeValue, setQRCodeValue] = useState("");

  const generateQRCode = () => {
    setQRCodeValue(text);
  };

  const [active, setActive] = useState(false);

  function toggleMenu(event) {
    console.log(hora);
    if (event.type === "touchstart") event.preventDefault();
    const nav = document.getElementById("modalaula");
    nav.classList.toggle("active");
    setActive(!active);
    event.currentTarget.setAttribute("aria-expanded", active);
    if (active) {
      event.currentTarget.setAttribute("aria-label", "Fechar Menu");
    } else {
      event.currentTarget.setAttribute("aria-label", "Abrir Menu");
    }
  }

  const GerarQReAula = (evt) => {
    try {
      handleSubmit(evt);
      generateQRCode();
    } catch (error) {
      console.log("Erro nos botão");
    }
  };

  return (
    <div className="divGeralAulas">
      <div className="tabelaAulasLeft"></div>
      <div className="tabelaAulasRight">
        <div className="container-button-createAulas">
          <button
            className="btn-criaraula"
            onClick={toggleMenu}
            onTouchStart={toggleMenu}
          >
            <span class="button__text">Criar Aula</span>
            <span class="button__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke="currentColor"
                height="24"
                fill="none"
                class="svg"
              >
                <line y2="19" y1="5" x2="12" x1="12"></line>
                <line y2="12" y1="12" x2="19" x1="5"></line>
              </svg>
            </span>
          </button>
        </div>
        <div className="tables-containers">
          <div className="table1" disabled={!loadingAula}>
            <h2>Visualização de Aulas</h2>
            <table>
              <thead>
                <tr>
                  <th>Nome da Aula</th>
                  <th>Horário</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {data.map((aula, idx) => {
                  return (
                    <tr
                      key={aula.id}
                      onClick={() => {
                        !loadingAula && setAula(aula);
                      }}
                    >
                      <td>{aula.com_nome}</td>
                      <td>
                        {new Date(aula.hor_datahora).toLocaleDateString()}
                      </td>
                      <td>
                        <Link to={`/validar/${aula.id}`}>Validar</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="table2">
            <h2>Visualização de Alunos</h2>
            {aula?.id && (
              <div className="desc-table-aulas">
                Aula: {aula.id} - Horário: {aula.aul_conteudo} - Quantidade de
                Aulas: {aula.aul_qtdadeaulas}
              </div>
            )}
            <table>
              <thead>
                <tr>
                  <th>Nome do Aluno</th>
                </tr>
              </thead>
              <tbody>
                {dataDetalhesAula.map((aluno) => {
                  // console.log(aluno)
                  if (aluno?.usuario) {
                    // const data = JSON.parse(aluno.usuario)
                    return (
                      <tr key={aluno.usuario.id}>
                        <td>{aluno.usuario.usu_nome}</td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={data.id}>
                        <td>Erro no banco</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div id="modalaula" className="modalaula">
          <div className="containerdivcreateaulas">
            <div className="text_telageraraula">Insira os dados da aula:</div>
            <div className="containerinpcreateaulas">
              <input
                placeholder="Matéria"
                value={componente}
                onChange={(e) => setComponente(e.target.value)}
                className="inputaulamodal"
              />
              {/* <input
                placeholder="Professor"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="inputaulamodal"
                disabled
              /> */}
              <input
                placeholder="Horário"
                type="datetime-local"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                className="inputaulamodal"
              />
              <input
                placeholder="Turma"
                value={serie}
                onChange={(e) => setSerie(e.target.value)}
                className="inputaulamodal"
              />
              <select
                placeholder="Qtdade de Aula"
                value={qtdadeAula}
                onChange={(e) => setQtdadeAula(e.target.value)}
                className="inputaulamodal"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <textarea
                placeholder="Descrição da Aula"
                value={conteudoAula}
                onChange={(e) => setConteudoAula(e.target.value)}
                className="inputaulamodal"
              />
            </div>
            <div className="divmodalgerar">
              {/* <button onClick={generateQRCode} className="buttonmodalgerar"> */}
              <button
                onClick={(evt) => GerarQReAula(evt)}
                className="buttonmodalgerar"
              >
                Gerar Aula e QR Code
              </button>
            </div>
          </div>
          <div className="telarightAulas">
            {/* <div className="closetela">X</div> */}
            <div>
              <div className="quadrwhiteqr">
                {qrCodeValue && (
                  <QRCode
                    value={qrCodeValue}
                    size={250}
                    className="qrcodegerado"
                  />
                )}
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
