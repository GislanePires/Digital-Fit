import React, { useState } from "react";
import "./style.css";
import PageModel1 from "../../components/PageModel1";
import ImgBG from "../../assets/imgs/cadastrar1.png";
import { Navigate } from "react-router-dom";
import Header from "../../components/Header";
import InputForm from "../../components/InputForm";
import CheckCadastroDePerfil from "../../components/CheckCadastroDePerfil";
import { postPerfil } from "../../service/api";
import ToastNotification from "../../components/ToastNotification";
import { toast } from "react-toastify";

function CadastroDePerfil() {
  const userLogged = localStorage.getItem("userLogged");
  const [title, setTitle] = useState('');
  const arrayUser = JSON.parse(userLogged);
  const imgbgPosition = "right";
  const cadastrarPerfil = arrayUser?.perfis[0].cadastrarPerfil;

  if (!userLogged) {
    return <Navigate to="/login" />;
  } else if (!cadastrarPerfil) {
    return <Navigate to="/carousel" />;
  }

  const handleGetListaCheckboxChecked = () => {
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    const selectedValues = Array.from(checkboxes).map(
      (checkbox) => checkbox.id
    );

    if (selectedValues.length === 0) {
      // handleShowAlert(true);
      return 0;
    }
    return selectedValues;
  };

  function onHandlerClickSave() {
    const selectedValues = handleGetListaCheckboxChecked();
    // console.log(title);
    if (title != '') {
      var perfil = {
        nome: title,
        cadastrarUsuario: selectedValues.includes("cadastrarUsuario"),
        visualizarUsuario: selectedValues.includes("visualizarUsuario"),
        editarUsuario: selectedValues.includes("editarUsuario"),
        deletarUsuario: selectedValues.includes("deletarUsuario"),
        cadastrarTipoDeficiencia: selectedValues.includes("cadastrarTipoDeficiencia"),
        visualizarTipoDeficiencia: selectedValues.includes("visualizarTipoDeficiencia"),
        editarTipoDeficiencia: selectedValues.includes("editarTipoDeficiencia"),
        deletarTipoDeficiencia: selectedValues.includes("deletarTipoDeficiencia"),
        cadastrarTermoDeResponsabilidade: selectedValues.includes("cadastrarTermoDeResponsabilidade"),
        visualizarTermoDeResponsabilidade: selectedValues.includes("visualizarTermoDeResponsabilidade"),
        editarTermoDeResponsabilidade: selectedValues.includes("editarTermoDeResponsabilidade"),
        deletarTermoDeResponsabilidade: selectedValues.includes("deletarTermoDeResponsabilidade"),
        cadastrarPerfil: selectedValues.includes("cadastrarPerfil"),
        visualizarPerfil: selectedValues.includes("visualizarPerfil"),
        editarPerfil: selectedValues.includes("editarPerfil"),
        deletarPerfil: selectedValues.includes("deletarPerfil"),
        cadastrarObjetivo: selectedValues.includes("cadastrarObjetivo"),
        visualizarObjetivo: selectedValues.includes("visualizarObjetivo"),
        editarObjetivo: selectedValues.includes("editarObjetivo"),
        deletarObjetivo: selectedValues.includes("deletarObjetivo"),
        cadastrarMedidas: selectedValues.includes("cadastrarMedidas"),
        visualizarMedidas: selectedValues.includes("visualizarMedidas"),
        editarMedidas: selectedValues.includes("editarMedidas"),
        deletarMedidas: selectedValues.includes("deletarMedidas"),
        cadastrarLaudo: selectedValues.includes("cadastrarLaudo"),
        visualizarLaudo: selectedValues.includes("visualizarLaudo"),
        editarLaudo: selectedValues.includes("editarLaudo"),
        deletarLaudo: selectedValues.includes("deletarLaudo"),
        cadastrarExercicio: selectedValues.includes("cadastrarExercicio"),
        visualizarExercicio: selectedValues.includes("visualizarExercicio"),
        editarExercicio: selectedValues.includes("editarExercicio"),
        deletarExercicio: selectedValues.includes("deletarExercicio"),
        cadastrarAvaliacaoFisicaSimplificada: selectedValues.includes("cadastrarAvaliacaoFisicaSimplificada"),
        visualizarAvaliacaoFisicaSimplificada: selectedValues.includes("visualizarAvaliacaoFisicaSimplificada"),
        editarAvaliacaoFisicaSimplificada: selectedValues.includes("editarAvaliacaoFisicaSimplificada"),
        deletarAvaliacaoFisicaSimplificada: selectedValues.includes("deletarAvaliacaoFisicaSimplificada")
      }
      const acessToken = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${acessToken}`,
        },
      };

      postPerfil(perfil, config)
        .then((response) => {
          console.log(response.data);
          toast.success(`Perfil ${title} adicionado com Sucesso!`, {
            position: "top-right",
            draggable: true,
          });
          setTitle('');
        })
        .catch((error) => {
          console.log(error);
        });
    } else{
      toast.error(`O perfil precisa ter um nome`, {
        position: "top-right",
        draggable: true,
      });
    }
  }

  // function desmarcarCheckboxes() {
  //   const checkboxes = document.querySelectorAll('input[type="checkbox"]');    
  //   checkboxes.forEach((checkbox) => {
  //     checkbox.checked = false;
  //   });
  // }

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <>
      <Header greetings={`Olá, ${arrayUser.nome}`} />
      <ToastNotification />
      <PageModel1
        imagemBg={ImgBG}
        imagemBgPosition={imgbgPosition}
        imagemPosition={"left"}
        imgbgPosition={imgbgPosition}
        textoInicial="Cadastro de "
        textoDestaque="Perfil"
      >
        <div className="inputCadastroDePerfilTopo">
          {/* <p className="nomeDoPerfil">Nome do Perfil:</p> */}
          <InputForm text="Nome do perfil: " type="text" name="nomePerfil" value={title} onChange={handleChange} />
        </div>

        <div className="alinhamentoDeBotao">
          <div className="quadradosPai">
            <CheckCadastroDePerfil title="Usuário:" idCadastrar="cadastrarUsuario" idVisualizar="visualizarUsuario" idEditar="editarUsuario" idExcluir="deletarUsuario" />
            <CheckCadastroDePerfil title="Deficiência:" idCadastrar="cadastrarTipoDeficiencia" idVisualizar="visualizarTipoDeficiencia" idEditar="editarTipoDeficiencia" idExcluir="deletarTipoDeficiencia" />
            <CheckCadastroDePerfil title="Term. Resp.:" idCadastrar="cadastrarTermoDeResponsabilidade" idVisualizar="visualizarTermoDeResponsabilidade" idEditar="editarTermoDeResponsabilidade" idExcluir="deletarTermoDeResponsabilidade" />
            <CheckCadastroDePerfil title="Perfil:" idCadastrar="cadastrarPerfil" idVisualizar="visualizarPerfil" idEditar="editarPerfil" idExcluir="deletarPerfil" />
            <CheckCadastroDePerfil title="Objetivo:" idCadastrar="cadastrarObjetivo" idVisualizar="visualizarObjetivo" idEditar="editarObjetivo" idExcluir="deletarObjetivo" />
            <CheckCadastroDePerfil title="Medidas:" idCadastrar="cadastrarMedidas" idVisualizar="visualizarMedidas" idEditar="editarMedidas" idExcluir="deletarMedidas" />
            <CheckCadastroDePerfil title="Laudo:" idCadastrar="cadastrarLaudo" idVisualizar="visualizarLaudo" idEditar="editarLaudo" idExcluir="deletarLaudo" />
            <CheckCadastroDePerfil title="Exercício:" idCadastrar="cadastrarExercicio" idVisualizar="visualizarExercicio" idEditar="editarExercicio" idExcluir="deletarExercicio" />
            <CheckCadastroDePerfil title="Aval. Simp.:" idCadastrar="cadastrarAvaliacaoFisicaSimplificada" idVisualizar="visualizarAvaliacaoFisicaSimplificada" idEditar="editarAvaliacaoFisicaSimplificada" idExcluir="deletarAvaliacaoFisicaSimplificada" />
          </div>

          <div >
            <button className="botaoCadastroDePerfil" onClick={() => onHandlerClickSave()}>Salvar</button>
          </div>

        </div>
      </PageModel1>
    </>
  );
}

export default CadastroDePerfil;
