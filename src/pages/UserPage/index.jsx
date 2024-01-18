import React from "react";
import { Navigate } from "react-router-dom";
import "./style.scss";
import Header from "../../components/Header";
import ObjetivosContainer from "../../components/ObjetivosContainer";
import PageModel1 from "../../components/PageModel1";
import ImgBG from "../../assets/imgs/treinamento.jpg";
import Title from '../../components/TitlePages';

const UserPage = () => {
  const userLogged = localStorage.getItem("userLogged");
  const arrayUser = JSON.parse(userLogged);
  const imgbgPosition = 'right';

  if (!userLogged) {
    return <Navigate to="/login" />;
  }

  if (arrayUser.liberadoPeloReponsavelTecnico === false) {
    return <Navigate to="/carousel" />;
  }

  

  if (localStorage.getItem("meusTreinos") == null) {
    localStorage.setItem("meusTreinos", []);
  }

  return (
    <>
      <Header greetings={`Olá, ${arrayUser.nome}`} />
      {/* <main className="page-config"> */}
      <PageModel1 imagemBg={ImgBG} imagemBgPosition={imgbgPosition} imagemPosition={'left'} imgbgPosition={imgbgPosition} textoInicial="Selecione seus " textoDestaque="objetivos">
        <ObjetivosContainer />
      </PageModel1>
    </>
  );
};

export default UserPage;
