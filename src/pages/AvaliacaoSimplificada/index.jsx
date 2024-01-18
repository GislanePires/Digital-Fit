import React from "react";
import Header from "../../components/Header";
import { Navigate } from "react-router-dom";
import FormAvaliacaoSimples from "../../components/FormAvaliacaoSimples";
import ShowContent from "../../components/ShowContent";
import "./style.scss";
import ImgBG from "../../assets/imgs/pessoa-deficiencia.png";
import PageModel1 from "../../components/PageModel1";

function AvaliacaoSimplificada() {
  const userLogged = localStorage.getItem("userLogged");
  const arrayUser = JSON.parse(userLogged);
  const Laudo = localStorage.getItem("laudoUser");
  const laudoUser = JSON.parse(Laudo);

  if (!userLogged) {
    return <Navigate to="/login" />;
  }

  if (laudoUser) {
    return <Navigate to="/carousel" />;
  }

  const imgbgPosition = "left";
  return (
    <>
      <Header greetings={`Olá, ${arrayUser.nome}`} />
      <FormAvaliacaoSimples />
    </>
  );
}
export default AvaliacaoSimplificada;
