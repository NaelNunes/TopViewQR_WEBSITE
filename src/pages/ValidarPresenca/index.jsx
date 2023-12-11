import { useNavigate, Link, useParams } from "react-router-dom";
import QRCode from "qrcode.react";
import { useState } from "react";
import "./styles.css";

export default function ValidarPresenca() {
  const { id } = useParams();
  const [qrCodeValue, setQRCodeValue] = useState(
    `https://tk8fde.csb.app/validar?id=${id}`,
  );
  return (
    <div className="validar-container">
      <div className="son-container-validar">
        <div className="h1ValidarPresenca">
          Leia o QR Code para registrar presença:
        </div>
        <QRCode value={qrCodeValue} size={400} className="qrcodegerado" />
        <Link className="linkValidarPresenca" to="/aulas">
          Voltar
        </Link>
      </div>
    </div>
  );
}
