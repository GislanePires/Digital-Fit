import React, { useState } from "react";
import { deleteUserById, getUsuarios } from "../../service/api";
import ToastNotification from "../ToastNotification";
import { toast } from "react-toastify";
import TextInputForm from "./../TextInputForm/index";
import "./style.scss"

const FormDeleteUser = () => {
  const [matricula, setMatricula] = useState("");

  const handleNotFound = (show) => {
    toast.error("Usuário não encontrado", {
      position: "top-right",
      draggable: true,
    });
  };

  const handleSucess = (show) => {
    toast.success("Usuário Deletado", {
      position: "top-right",
      draggable: true,
    });
  };

  const handleEmpty = (show) => {
    toast.error("Por favor digite a matricula", {
      position: "top-right",
      draggable: true,
    });
  };

  const handleSubmit = () => {
    const acessToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${acessToken}`,
      },
    };

    if (matricula === "") {
      handleEmpty(true);
      return 0;
    } else {
      let userToDelete = [];
      getUsuarios(config)
        .then((response) => {
          userToDelete = response.data.find(
            (user) => user.matricula === matricula
          );
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          deleteUserById(userToDelete?.id, config)
            .then(() => {
              setMatricula("");
              handleSucess(true);
            })
            .catch((error) => {
              if (error.response && error.response.status === 400) {
                handleNotFound(true);
              } else {
                console.log(error);
              }
            });
        });
    }
  };

  return (
    <div className="delete-container">
      <h2>Deletar Usuário</h2>
      <ToastNotification />
      <label>Matrícula do usuário</label>
      {/* <input
        type="text"
        placeholder="Digite a matrícula do Colaborador"
        value={matricula}
        onChange={(e) => setMatricula(e.target.value)}
      /> */}
      <TextInputForm
        id={"delete-matricula"}
        name={"Digite a matrícula para deletar"}
        required={true}
        type={"text"}
        value={matricula}
        onChange={(e) => setMatricula(e.target.value)}
      />
      <button onClick={handleSubmit}>Excluir</button>
    </div>
  );
};

export default FormDeleteUser;
