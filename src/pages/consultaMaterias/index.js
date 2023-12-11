import "./styles.css";
import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import Tr from "../../components/Tr/index";
import React from "react";
import Middle from "../../components/Middle/index";

export default function consultaAulaUsuarios() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(-1);

  const [order, setOrder] = useState("asc");
  const [sort, setSort] = useState("usu_id");

  const [query, setQuery] = useState("");
  const [attribute, setAttribute] = useState("usu_id");
  const [buttonQuery, setButtonQuery] = useState(false);
  const [operator, setOperator] = useState("_like");

  const limparHandle = () => {
    setQuery("");
    setAttribute("usu_id");
    setOperator("_like");
    setButtonQuery(true);
  };

  useEffect(() => {
    let url = `/materias?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;

    if (query) {
      url += `&${attribute}${operator}=${query}`;
    }

    setButtonQuery(false);

    const fetchData = async () => {
      try {
        const response = await api(url);
        const xtotal = response.headers.get("x-total-count");
        const totalPages = Math.ceil(xtotal / limit);
        setPages(totalPages);
        const data = await response.json();
        setData(data);
      } catch (error) {
        setData([]);
      }
    };

    fetchData();
  }, [limit, page, sort, order, buttonQuery]);

  return (
    <body className="fundo">
      <div>
        <div>
          <Middle />
        </div>
        <div>
          <div className="BarraCimaAlunos">
            <div>
              <input value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div>
              <select
                value={attribute}
                onChange={(e) => setAttribute(e.target.value)}
              >
                <option value="id">ID</option>
                <option value="mat_nome">Matéria</option>
                <option value="mat_cargahoraria">Carga Horária</option>
                <option value="usu_id">Usuário ID</option>
                <option value="cur_id">Curso ID</option>
                <option value="created_at">Data de criação</option>
                <option value="updated_at">Data de update</option>
              </select>
            </div>
            <div>
              <select
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
              >
                <option value="">=</option>
                <option value="_like">Contém</option>
                <option value="_gte">Maior igual</option>
                <option value="_lte">Menor igual</option>
              </select>
            </div>
            <div>
              <button onClick={() => setButtonQuery(true)}>Pesquisar</button>
            </div>
            <div>
              <button onClick={limparHandle}>Limpar</button>
            </div>
          </div>
          <div className="DivTabelaAlunos">
            <table className="TabelaAlunos">
              <caption className="tituloaluno">Consultar Matérias</caption>
              <thead>
                <th>Id</th>
                <th>Matéria</th>
                <th>Carga Horária</th>
                <th>Usuário ID</th>
                <th>Curso ID</th>
                <th>Data de Criação</th>
                <th>Data de Update</th>
              </thead>
              {data.map((element) => {
                return (
                  <Tr data={element}>
                    <td className="idalun" data-cell="id">
                      {element.id}
                    </td>
                    <td className="nomealun" data-cell="cur_nome">
                      {element.mat_nome}
                    </td>
                    <td className="nomealun" data-cell="cur_cargahorariatotal">
                      {element.mat_cargahoraria}
                    </td>
                    <td className="nomealun" data-cell="cur_cargahorariatotal">
                      {element.usu_id}
                    </td>
                    <td className="nomealun" data-cell="cur_cargahorariatotal">
                      {element.cur_id}
                    </td>
                    <td className="createdalun" data-cell="created_at">
                      {element.created_at}
                    </td>
                    <td className="updatealun" data-cell="updated_at">
                      {element.updated_at}
                    </td>
                    {/* <td>
                    <button button="buttonalt">Alterar</button>
                    <button button="buttonexc">Excluir</button>
                  </td> */}
                  </Tr>
                );
              })}
            </table>
          </div>
          <div className="BarraBaixoAlunos">
            <div className="espaco">
              <span>Página:</span>

              <select value={page} onChange={(e) => setPage(e.target.value)}>
                {Array.from({ length: pages }, (_, i) => i + 1).map(
                  (element) => {
                    return <option value={`${element}`}>{element}</option>;
                  },
                )}
              </select>
            </div>

            <div className="espaco">
              <span>Ordenação:</span>
              <select
                className="selectalun"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="id">ID</option>
                <option value="mat_nome">Matéria</option>
                <option value="mat_cargahoraria">Carga Horária</option>
                <option value="usu_id">Usuário ID</option>
                <option value="cur_id">Curso ID</option>
                <option value="created_at">Criação</option>
                <option value="updated_at">Update</option>
              </select>
            </div>
            <div className="espaco">
              <span>Ordem:</span>
              <select
                className="ordem"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              >
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
            </div>
            <div className="espaco">
              <span>Itens:</span>
              <select value={limit} onChange={(e) => setLimit(e.target.value)}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}
