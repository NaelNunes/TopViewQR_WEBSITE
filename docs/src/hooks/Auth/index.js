import React, { createContext, useCallback, useContext, useState } from "react";
import { api } from "../../utils/api";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem("@topViewQRdb:token");
    const usuario = localStorage.getItem("@topViewQRdb:usuario");
    if (token && usuario) return { token, usuario: JSON.parse(usuario) };

    return {};
  });

  const signIn = useCallback(async ({ usu_email, usu_senha }) => {
    const page = await api("/auth", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({ usu_email, usu_senha })
    });
    if (parseInt(page.status, 10) !== 200) {
      // throw new Error(
      //   `Erro ao acessar o sistema: ${(await page.json()).error}`
      alert(`Erro ao acessar o sistema: ${(await page.json()).error}`);
      return false;
    }

    const data = await page.json();
    const { token, usuario } = data;
    localStorage.setItem("@topViewQRdb:token", token);
    localStorage.setItem("@topViewQRdb:usuario", JSON.stringify(usuario));

    setData({ token, usuario });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@topViewQRdb:token");
    localStorage.removeItem("@topViewQRdb:usuario");
    setData([]);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario: data.usuario, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be uses within an AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
