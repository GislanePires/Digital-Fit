import React from "react";
import { Navigate, useParams  } from "react-router-dom";
import Header from './../../components/Header/index';
import FormExercicios from "../../components/FormExercicios";
import ImgBG from "../../assets/imgs/cadastrar1.png";
import PageModel1 from "../../components/PageModel1";
// import { getExercicioById } from "../../service/api";

const CrudExercicio = () => {
  const { id } = useParams();
  const userLogged = localStorage.getItem("userLogged");
  const arrayUser = JSON.parse(userLogged);
  const cadastrarExercicios = arrayUser?.perfis[0].cadastrarExercicio;
  const imgbgPosition = "right";


  if (!userLogged) {
    return <Navigate to="/login" />;
  }

  if (!cadastrarExercicios) {
    return <Navigate to="/carousel" />;
  }

  return (
    <>
      <Header greetings={`Olá, ${arrayUser.nome}`}/>
      <PageModel1
        imagemBg={ImgBG}
        imagemBgPosition={imgbgPosition}
        imagemPosition={"left"}
        imgbgPosition={imgbgPosition}
        textoInicial="Cadastro de "
        textoDestaque="Exercícios"
      >

     <div className="containerCrudExercício" >
      <FormExercicios exercicioId={id} />
      </div>

      </PageModel1>

    </>
  );
};

export default CrudExercicio;
