import React, { useState, useEffect } from "react";
import FormRegister from "./../../components/FormRegister";
import { Navigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Header from "../../components/Header";
import { getUsuariosById } from "../../service/api";
import "./style.scss";
import FormDeleteUser from "../../components/FormDeleteUser";
import ToastNotification from "../../components/ToastNotification";
import backgroundImage from "../../assets/imgs/Dicas.png";

function Register() {
  const { id } = useParams();
  const acessToken = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${acessToken}`,
    },
  };

  const [usuarioParaEditar, setUsuarioParaEditar] = useState({});

  const handleGetUsuarioById = async () => {
    const response = await getUsuariosById(id, config);
    setUsuarioParaEditar(response.data);
  }

  useEffect(() => {
    if (id != null && id.length > 0) {
      handleGetUsuarioById();
    }
  }, []);

  const arrayUser = localStorage.getItem("userLogged");
  const userLogged = JSON.parse(arrayUser);
  const editarCadastroUsuario = userLogged?.perfis[0].editarUsuario;
  const perfilParaCadastro = userLogged?.perfis[0].cadastrarUsuario;
  const perfilParaExcluir = userLogged?.perfis[0].deletarUsuario;

  if (!userLogged) {
    return <Navigate to="/login" />;
  } else if (!perfilParaCadastro) {
    return <Navigate to="/carousel" />;
  }
  return (
    <>
      <Header greetings={"Espaço do RH"} />
      <ToastNotification />
      <main className="register" style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}>
        <section>
          <label className="boas-vindas" htmlFor="Boas-vindas">
            Bem vindo! <br />
            Aqui você cadastra seus funcionários e parceiros autorizados para
            acesso ao DIGITALFIT. <br />
            Vamos começar? <br />É necessário informar os dados do novo usuário
            já cadastrado no seu banco de dados.
          </label>
        </section>
        <section className="forms">
          <FormRegister props={usuarioParaEditar} />
          {/* {perfilParaExcluir && <FormDeleteUser />} */}

        </section>
      </main>
    </>
  );
}
export default Register;
