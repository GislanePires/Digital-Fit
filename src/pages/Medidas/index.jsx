import React, { useState } from "react";
import Header from "../../components/Header";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../../service/api";
import FormMedidas from "../../../src/components/FormMedidas";
import "./style.scss";
import PageModel1 from "../../components/PageModel1";
import ImgBG from "../../assets/imgs/medida(3).jpg";

function Medidas() {
  const navigate = useNavigate();
  const [medidas, setMedidas] = useState({
    altura: "",
    peso: "",
    bracoRelaxadoEsquerdo: "",
    bracoRelaxadoDireito: "",
    bracoContraidoEsquerdo: "",
    bracoContraidoDireito: "",
    coxaEsquerda: "",
    coxaDireita: "",
    panturrilhaEsquerda: "",
    panturrilhaDireita: "",
    peitoral: "",
    abdomem: "",
    cintura: "",
    quadril: "",
    usuario: "",
  });

  
  const userLogged = localStorage.getItem("userLogged");
  const arrayUser = JSON.parse(userLogged);
  const acessToken = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${acessToken}`,
    },
  };

  if (!userLogged) {
    return <Navigate to="/login" />;
  }
  const Laudo = localStorage.getItem("laudoUser");
  const laudoUser = JSON.parse(Laudo);

  if(laudoUser){
    return <Navigate to="/carousel" />;
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post(
        "usuario/medidas",
        {
          altura: parseFloat(medidas.altura),
          peso: parseFloat(medidas.peso),
          bracoRelaxadoEsquerdo: parseFloat(medidas.bracoRelaxadoEsquerdo),
          bracoRelaxadoDireito: parseFloat(medidas.bracoRelaxadoDireito),
          bracoContraidoEsquerdo: parseFloat(medidas.bracoContraidoEsquerdo),
          bracoContraidoDireito: parseFloat(medidas.bracoContraidoDireito),
          coxaEsquerda: parseFloat(medidas.coxaEsquerda),
          coxaDireita: parseFloat(medidas.coxaDireita),
          panturrilhaEsquerda: parseFloat(medidas.panturrilhaEsquerda),
          panturrilhaDireita: parseFloat(medidas.panturrilhaDireita),
          peitoral: parseFloat(medidas.peitoral),
          abdomem: parseFloat(medidas.abdomem),
          cintura: parseFloat(medidas.cintura),
          quadril: parseFloat(medidas.quadril),
          usuario: arrayUser.id,
        },
        config
      );
      console.log(response.data);
      setMedidas((prevMedidas) => ({
        altura: "",
        peso: "",
        bracoRelaxadoEsquerdo: "",
        bracoRelaxadoDireito: "",
        bracoContraidoEsquerdo: "",
        bracoContraidoDireito: "",
        coxaEsquerda: "",
        coxaDireita: "",
        panturrilhaEsquerda: "",
        panturrilhaDireita: "",
        peitoral: "",
        abdomem: "",
        cintura: "",
        quadril: "",
        usuario: arrayUser.id,
      }));
      navigate("/avaliacao")
    } catch (error) {
      console.error("Erro ao enviar medidas:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMedidas((prevMedidas) => ({
      ...prevMedidas,
      [name]: value,
    }));
  };

  const imgbgPosition = 'right';
  return (
    <>
      <Header greetings={`Olá, ${arrayUser.nome}`} />
      <PageModel1 imagemBg={ImgBG} imagemBgPosition={imgbgPosition} imagemPosition={'right'} imgbgPosition={imgbgPosition} textoInicial="Informe suas" textoDestaque="medidas">
        <FormMedidas medidas={medidas} onChange={handleChange} onSubmit={handleSubmit} />
      </PageModel1>
    </>
  );
}

export default Medidas;
