import React from "react";
import Header from "../../components/Header";
import FormIMC from "../../components/FormIMC";
import ImgBG from "../../assets/imgs/fita_metrica_imc.jpg";
import PageModel1 from "../../components/PageModel1";
import { Navigate } from "react-router-dom";

function Imc() {
  const imgbgPosition = 'left';
  const userLogged = localStorage.getItem("userLogged");

  if (!userLogged) {
    return <Navigate to="/login" />;
  }
  
  return (
    <>
      <Header />
      <PageModel1 imagemBg={ImgBG} imagemBgPosition={imgbgPosition} imagemPosition={'center'} imgbgPosition={imgbgPosition} textoInicial="Vamos calcular o" textoDestaque="IMC">
        <FormIMC />
      </PageModel1>
    </>
  );
}
export default Imc;
