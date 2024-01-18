import React, { createContext, useContext, useState } from "react";

const TreinoContext = createContext();

const TreinoProvider = ({ children }) => {
  const [treino, setTreino] = useState(null);

  return (
    <TreinoContext.Provider value={{ treino, setTreino }}>
      {children}
    </TreinoContext.Provider>
  );
};

const useTreinoContext = () => {
  const context = useContext(TreinoContext);

  if (!context) {
    throw new Error(
      "useTreinoContext deve ser usado dentro de um TreinoProvider"
    );
  }

  return context;
};

export { TreinoProvider, useTreinoContext };
