import React from "react";
import Header from "../../components/Header";
import { Navigate } from "react-router-dom";
import FormParq from "../../components/FormParq";

const ParQ = () => {
  const userLogged = localStorage.getItem("userLogged");
  if (!userLogged) {
    return <Navigate to="/login" />;
  }

  const arrayUser = JSON.parse(userLogged);
  return (
    <>
      <Header greetings={`Olá, ${arrayUser.nome}`} />
      <FormParq />
    </>
  );
};

export default ParQ;
