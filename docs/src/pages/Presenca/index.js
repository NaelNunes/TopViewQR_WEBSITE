import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/Auth/index";
import { QrReader } from "react-qr-reader";
import React, { useState, useRef } from "react";
import { api } from "../../utils/api";
import "./styles.css";

export default function Presenca() {
  const [data, setData] = useState("No result");
  const { usuario } = useAuth();
  const qrRef = useRef(null);
  const navigate = useNavigate();

  const handleResult = async (result, error) => {
    if (!!result) {
      setData(result?.text);

      const aula_id = result?.text.split("=").slice(-1)[0];

      let URL = `/aula_usuarios`;

      let presenca = {
        aula_id: parseInt(aula_id, 10),
        usuario_id: usuario.id,
      };

      const page = await api(URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(presenca),
      });

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

      navigate("/");
    }
    if (!!error) {
      console.info(error);
    }
  };

  return (
    <div className="container_qrReader">
      <h1 className="h1_qrReader">Id do Usuário: {usuario.id}</h1>
      <QrReader
        className="qrReader"
        ref={qrRef}
        delay={300}
        constraints={{
          facingMode: "environment",
        }}
        onResult={handleResult}
        style={{ width: "100%" }}
      />
      <Link className="link_qrReader" to="/">
        Voltar
      </Link>
      <p>{data}</p>
    </div>
  );
}
