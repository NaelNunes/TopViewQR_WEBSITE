import React from "react";

import { ToastProvider } from "./Toast/index";
import { AuthProvider } from "./Auth/index";

const AppProvider = ({ children }) => {
  return (
    <ToastProvider>
      <AuthProvider>{children}</AuthProvider>
    </ToastProvider>
  );
};

export default AppProvider;
