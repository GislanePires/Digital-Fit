import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import FormObjetivos from "../../components/FormObjetivos";
import { getObjetivosById } from "../../service/api";
import PageModel1 from "../../components/PageModel1";
import ImgBG from "../../assets/imgs/parq-image-card.jpg";
import "./style.scss";

const CrudObjetivo = () => {
  const { id } = useParams();
  const userLogged = localStorage.getItem("userLogged");
  const arrayUser = JSON.parse(userLogged);
  const cadastrarObjetivo = arrayUser?.perfis[0].cadastrarObjetivo;
  const [objetivoParaEditar, setObjetivoParaEditar] = useState({});
  const acessToken = localStorage.getItem("token");
  const imgbgPosition = 'left';
  const config = {
    headers: {
      Authorization: `Bearer ${acessToken}`,
    },
  };

  const imagemMobile = " imagemMobile"
  const handleGetObjetivoById = async () => {
    const response = await getObjetivosById(id, config);
    setObjetivoParaEditar(response.data);
  }

  useEffect(() => {
    if (id != null && id.length > 0) {
      handleGetObjetivoById();
    }
  }, []);

  if (!userLogged) {
    return <Navigate to="/login" />;
  }

  if (!cadastrarObjetivo) {
    return <Navigate to="/carousel" />;
  }

  return (
  <>
    <Header greetings={`Olá, ${arrayUser.nome}`} />
      <PageModel1 imagemMobile={imagemMobile} imagemBg={ImgBG} imagemBgPosition={imgbgPosition} imagemPosition={'center'} imgbgPosition={imgbgPosition} formCenter={{display: "flex", flexDirection: "column", justifyContent: "center"}} textoInicial="Cadastro de " textoDestaque="objetivos">
      <FormObjetivos props={objetivoParaEditar}/>
      </PageModel1>
  </>
  );
};

export default CrudObjetivo;
