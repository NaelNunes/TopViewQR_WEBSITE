import "./styles.css";

export default function DetalhesAluno({
  title = "Mensagem",
  data,
  hideDetalhes
}) {
  return (
    <div className="detalhescidades">
      <div>
        <section>
          <header>{title}</header>
          <main>
            <span>Id</span>
            <span>{data.id}</span>
            <span>Usuarios Id</span>
            <span>{data.usu.id}</span>
            <span>Matriculas</span>
            <span>{data.alu_ra}</span>
            <span>Disponibilidade</span>
            <span>{data.alu_datainativacao}</span>
            <span>Criação</span>
            <span>{data.created_at}</span>
            <span>Update</span>
            <span>{data.updated_at}</span>
          </main>
          <footer>
            <button onClick={hideDetalhes}>Fechar</button>
          </footer>
        </section>
      </div>
    </div>
  );
}
