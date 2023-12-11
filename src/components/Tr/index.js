import { useState } from "react";


export default function Tr({ children, data }) {
  const [show, setShow] = useState(false);

  const showDetalhes = () => {
    setShow(true);
  };

  const hideDetalhes = () => {
    setShow(false);
  };

  return (
    <>
      <tr onClick={showDetalhes}>{children}</tr>
    </>
  );
}