import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth/index";
import { AuthProvider } from "./hooks/Auth/index";

import Main from "./pages/Main/index";
import About from "./pages/About/index";
import Signin from "./pages/Signin/index";
import Signup from "./pages/Signup/index";
import Aulas from "./pages/Aulas/index";
import Consultas from "./pages/Consultas/index";
import ConsultaAulaUsuarios from "../src/pages/consultaAulaUsuarios/index";
import ConsultaAulas from "../src/pages/consultaAulas/index";
import ConsultaUsuarios from "../src/pages/consultaUsuario/index";
import ConsultaCursos from "../src/pages/consultaCursos/index";
import ConsultaCursoUsuarios from "../src/pages/consultaCursoUsuarios/index";
import ConsultaMaterias from "../src/pages/consultaMaterias/index";
import ValidarPresenca from "./pages/ValidarPresenca/index";
// import Frequencia from "../src/pages/Frequencia/index";
import Presenca from "./pages/Presenca/index"

import Layout from "./components/Layout";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="aulas" element={<Aulas />} />
          <Route path="about" element={<About />} />
          <Route path="consultas" element={<Consultas />} />
          <Route path="consulta-aulas" element={<ConsultaAulas />} />
          <Route
            path="consulta-aulausuarios"
            element={<ConsultaAulaUsuarios />}
          />
          <Route path="consulta-cursos" element={<ConsultaCursos />} />
          <Route
            path="consulta-cursousuarios"
            element={<ConsultaCursoUsuarios />}
          />
          <Route path="consulta-materias" element={<ConsultaMaterias />} />
          <Route path="consulta-usuarios" element={<ConsultaUsuarios />} />
          <Route path="validar/:id" element={<ValidarPresenca />} />
          <Route path="presenca" element={<Presenca />} />
        </Route>
        {/* <Route path="/frequencia" element={<Frequencia />} /> */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
