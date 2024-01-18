import React, { createContext, useContext, useState } from "react";

const ObjetivosContext = createContext();

const ObjetivosProvider = ({ children }) => {
  const [objetivos, setObjetivos] = useState([]);

  return (
    <ObjetivosContext.Provider value={{ objetivos, setObjetivos }}>
      {children}
    </ObjetivosContext.Provider>
  );
};

const useObjetivosContext = () => {
  const context = useContext(ObjetivosContext);

  if (!context) {
    throw new Error(
      "useObjetivosContext deve ser usado dentro de um ObjetivosProvider"
    );
  }

  return context;
};

export { ObjetivosProvider, useObjetivosContext };
