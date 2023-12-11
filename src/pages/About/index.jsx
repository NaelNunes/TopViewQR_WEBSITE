import "./styles.css";
import Middle from "../../components/Middle/index";
import fotonael from "../../../public/assets/fotonael.jpg";
import fotopedro from "../../../public/assets/fotopedro.jpg";
import fotoruan from "../../../public/assets/fotoruan.jpg";
import Footer from "../../components/Footer/index";

export default function About() {
  return (
    <div className="tudo">
      <div className="Sobre">
        <div className="escrita">SOBRE</div>
      </div>
      <div className="conteudo">
        <h1 className="titulo">Equipe</h1>
      </div>
      <div className="fotos">
        <div className="imagensaboutint">
          <div className="fotopedro_1">
            <img src={fotopedro} alt="pr-sample9" className="imagensimgabout" />
            <span>
              Pedro Felipe <br></br> DESENVOLVEDOR
            </span>
            <div className="infoPerfilPedro">
              <br></br> <br></br>
              Pedro Felipe <br></br> DESENVOLVEDOR <br></br>{" "}
              <div className="texto_desc_pedro">
                {" "}
                Pedro, estudante de destaque em Ciência da Computação,
                desempenhou um papel notável na elaboração do Trabalho de
                Conclusão de Curso ao liderar a implementação do backend do
                site. Sua habilidade técnica excepcional e comprometimento
                incansável resultaram em um backend robusto e eficiente. Pedro
                demonstrou profundo entendimento dos requisitos do sistema,
                entregando não apenas uma solução funcional, mas também uma base
                sólida para futuras expansões. Sua dedicação ao projeto e sua
                habilidade em enfrentar desafios tornaram-no uma peça-chave no
                sucesso do TCC, evidenciando sua capacidade notável no
                desenvolvimento de software.{" "}
              </div>
            </div>
          </div>
          <div className="fotonael_1">
            <img src={fotonael} alt="pr-sample9" className="imagensimgabout" />
            <span>
              Nathanal Nunes <br></br> DESENVOLVEDOR
            </span>
            <div className="infoPerfilNael">
              <br></br> <br></br>
              Nathanael Nunes <br></br> DESENVOLVEDOR <br></br>{" "}
              <div className="texto_desc_nael">
                Nathanael, um estudante destacado em Design de Interface e
                Desenvolvimento Frontend, desempenhou um papel crucial na
                conclusão bem-sucedida do Trabalho de Conclusão de Curso,
                concentrando seus esforços no aprimoramento do Frontend do
                projeto. Sua habilidade notável em design de usuário e
                programação front-end resultou em uma interface visualmente
                atraente e altamente funcional. Nathanael não apenas demonstrou
                uma compreensão aguçada dos princípios de usabilidade, mas
                também contribuiu significativamente para a experiência do
                usuário, garantindo que a navegação pelo site fosse intuitiva e
                agradável. Seu comprometimento em alcançar um design estético
                aliado à eficiência técnica foi fundamental para elevar a
                qualidade do projeto como um todo. Nathanael destaca-se como um
                colaborador essencial, evidenciando sua competência no
                desenvolvimento de interfaces visuais para projetos acadêmicos
                de alto nível.
              </div>
            </div>
          </div>
          <div className="fotoruan_1">
            <img src={fotoruan} alt="pr-sample9" className="imagensimgabout" />
            <span>
              Ruan Kanashiro <br></br> DESENVOLVEDOR
            </span>
            <div className="infoPerfilPedro">
              <br></br> <br></br>
              Ruan Yudi <br></br> DESENVOLVEDOR <br></br>{" "}
              <div className="texto_desc_ruan">
                {" "}
                Ruan, um estudante notável em Ciência da Computação, desempenhou
                um papel vital na elaboração da Monografia de conclusão de
                curso, concentrando seus esforços na aprimoração do conteúdo.
                Sua habilidade excepcional em análise crítica e refinamento
                textual trouxe contribuições valiosas à qualidade do documento.
                Ruan não apenas demonstrou uma compreensão profunda dos temas
                abordados, mas também exibiu uma habilidade ímpar em otimizar a
                clareza e coesão do texto. Seu comprometimento em aprimorar a
                monografia evidencia sua busca pela excelência acadêmica,
                destacando-o como uma peça fundamental para o sucesso do
                trabalho.{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer className="footermain" />
    </div>
  );
}
