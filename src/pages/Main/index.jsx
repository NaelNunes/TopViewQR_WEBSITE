import "./styles.css";
import qr from "../../../public/assets/qr.png";
import conexqr from "../../../public/assets/conexqr.png";
import imgreal from "../../../public/assets/imgrealqrlei.jpg";
import Footer from "../../components/Footer/index";
import bioconfirm from "../../../public/assets/bioconfirm.jpg";
import { Link, useNavigate } from "react-router-dom";
import setamain from "../../../public/assets/setamain.png";
import imagemmain2 from "../../../public/assets/imagemmain2.jpg";
// import Carousel from "react-bootstrap/Carousel";
import Imagem1carrossel from "../../../public/assets/imagem1carrossel.jpg";
import imagemmain3 from "../../../public/assets/imagemmain3.jpg";
import imagemmain from "../../../public/assets/imagemmain.png";
import { Container } from "react-bootstrap";
import secondimgmain from "../../../public/assets/secondimgmain.png";

export default function Main() {
  const navigate = useNavigate();
  return (
    <div className="fundomain">
      <div className="containermain">
        <div className="textprinmain">
          <h1 className="h1main">
            Software frequencial para empresas e escolas.
          </h1>
          <h2 className="h2main">
            Controle a frequência de seus funcionários e alunos com esta
            ferramenta.
          </h2>
          <a className="linkmain" href="/signup">
            CRIE SUA CONTA!
          </a>
        </div>
        <div className="imagemmainright">
          <img src={imagemmain} className="imagemmainimg" />
        </div>
      </div>
      <div className="midmain">
        <h3>Saiba mais!</h3>
      </div>
      {/* <div className="dadsecondimg">
        <img src={secondimgmain} className="imagemmainsecond" />
  </div> */}
      <section className="sessaocinza">
        <div className="container">
          <article className="article">
            <p className="esp">
              O TopViewQR ajuda a garantir a confiança para empresas e ambientes
              escolares em <strong> Controle de Frequência</strong>. Nossa
              missão sempre foi fornecer o melhor em Controle pessoal,
              auxiliando nossos clientes a garantirem que seus produtos alcancem
              o maior número de usuários.
            </p>
            <p className="esp">
              Buscamos sempre entregar a melhor experiência e satisfação a
              nossos clientes.
            </p>
          </article>
        </div>
      </section>
      <section className="sessao">
        <div className="container">
          <article className="article">
            <h3 className="hh">Monitoramento Avançado:</h3>
            <p className="esp">
              Com o uso do QR Code, ficou mais fácil e mais rápido controlar a
              frequência de funcionários, clientes, alunos...
            </p>
            <hr className="space" />
            <h3 className="hh">Recomendações de ações preventivas</h3>
            <p className="esp">
              Os alertas, a análise online e a revisão de especialistas permitem
              que os times de infraestrutura e desenvolvimento trabalhem em
              conjunto e proativamente para evitar os riscos operacionais
            </p>
            <hr className="space" />
            <h3 className="hh">Eficiência e Retorno do Investimento</h3>
            <p className="esp">
              A melhor experiência de uso pelos usuários leva a adoção mais
              rápida dos processos, melhora a produtividade das áreas de negócio
              e acelera o retorno do investimento na infraestrutura.
            </p>
          </article>
        </div>
      </section>
      <Footer className="footermain" />
    </div>
  );
}
