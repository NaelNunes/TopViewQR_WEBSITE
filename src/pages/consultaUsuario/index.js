import "./styles.css";
import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import Tr from "../../components/Tr/index"
import Middle from "../../components/Middle/index";

export default function ConsultaCidades() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(-1);

  const [order, setOrder] = useState("asc");
  const [sort, setSort] = useState("cid_nome");

  const [query, setQuery] = useState("");
  const [attribute, setAttribute] = useState("cid_nome");
  const [buttonQuery, setButtonQuery] = useState(false);
  const [operator, setOperator] = useState("_like");

  const limparHandle = () => {
    setQuery("");
    setAttribute("cid_nome");
    setOperator("_like");
    setButtonQuery(true);
  };

  useEffect(() => {
    // let url = "/cidades?id_gte=3";
    // let url = "/cidades?id=1";
    // let url = "/cidades?_sort=cid_estado&_order=desc&id_gte=3";
    let url = `/usuarios?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;

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
          <div className="BarraCimaUsuario">
            <div>
              <input value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div>
              <select
                value={attribute}
                onChange={(e) => setAttribute(e.target.value)}
              >
                <option value="id">ID</option>
                <option value="usu_nome">Nome</option>
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
          <div className="DivTabelaUsuario">
            <table className="TabelaUsuario">
              <caption className="titulousuario">Consultar Usuários</caption>
              <thead>
                <th>Id</th>
                <th>Nome</th>
                <th>Data de Criação</th>
                <th>Data de Update</th>
              </thead>
              {data.map((element) => {
                return (
                  <Tr data={element}>
                    <td className="idusu" data-cell="id">
                      {element.id}
                    </td>
                    <td className="nomeusu" data-cell="usu_id">
                      {element.usu_nome}
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
          <div className="BarraBaixoUsuario">
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
                className="selectusu"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="id">ID</option>
                <option value="usu_nome">Nome</option>
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
