import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const addToast = ({ title, message, type }) => {
    console.log({ title, message, type });
  };
}
