import React from "react";
import Header from "../../components/Header";
import { Navigate } from "react-router-dom";
import FormParq from "../../components/FormParq";
import PageModel1 from "../../components/PageModel1"
// import ImgBG from "../../assets/imgs/Dicas.png";
// import ImgBG from url("https://i1.wp.com/letbefit.ru/img/1475420825.jpg");
import Gpt from "../../components/PergunteAoGpt"

const Receitas = () => {
  const ImgBG = "https://i1.wp.com/letbefit.ru/img/1475420825.jpg";
  const userLogged = localStorage.getItem("userLogged");
  const imgbgPosition = 'top';

  if (!userLogged) {
    return <Navigate to="/login" />;
  }

  const arrayUser = JSON.parse(userLogged);
  return (
    <>
      <Header greetings={`Olá, ${arrayUser.nome}`} />
      <PageModel1 imagemBg={ImgBG} imagemBgPosition={imgbgPosition} imagemPosition={'left'} imgbgPosition={imgbgPosition} textoInicial="Receitas" textoDestaque="Chef Fit">
        <Gpt />
      </PageModel1>
    </>
  );
};

export default Receitas;
