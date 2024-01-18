import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Acessibilidade from "../Acessibilidade";
import logoutIcon from "../../assets/imgs/logoutIcon.png";
import digitalfitImage from "../../assets/imgs/logo.png";
import logoMobile from "../../assets/imgs/logoMobile.png";
import "./style.scss";
import Modal from "../../components/Modal_Menu";

const Header = ({ greetings, logoutState, menuState, imageLeft }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 490);
  const userLogged = localStorage.getItem("userLogged");
  const arrayUser = JSON.parse(userLogged);
  const cadastrarObjetivo = arrayUser?.perfis[0].cadastrarObjetivo;
  const editarObjetivo = arrayUser?.perfis[0].editarObjetivo;
  const editarExercicio = arrayUser?.perfis[0].editarExercicio;
  const cadastrarExercicios = arrayUser?.perfis[0].cadastrarExercicio;
  const cadastrarPerfil = arrayUser?.perfis[0].cadastrarPerfil;
  const cadastrarUsuario = arrayUser?.perfis[0].cadastrarUsuario;
  const validarLaudo = arrayUser?.perfis[0].editarLaudo;
  const visualizarAuditoria = arrayUser?.perfis[0].visualizarAuditoria;
  const cadastrarTipoDeficiencia = arrayUser?.perfis[0].cadastrarTipoDeficiencia;

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 490);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("userLogged");
    localStorage.removeItem("token");
    localStorage.removeItem("laudoUser");
    navigate("/");
  };

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setAnimationClass(isModalOpen ? "slide-out" : "slide-in");
  };

  return (
    <header>
      <Modal
        isOpen={isModalOpen}
        onClose={handleToggleModal}
        animationClass={animationClass}
      >
        <ul className="lista-menu">
          <button
            className="botao-menu"
            onClick={() => {
              navigate("/minhas-infos");
            }}
          >
            <li className="lista-menu-item">Minhas informações</li>
          </button>
          <button
            className="botao-menu"
            onClick={() => {
              navigate("/user-page");
            }}
          >
            <li className="lista-menu-item">Objetivos</li>
          </button>
          <button
            className="botao-menu"
            onClick={() => {
              navigate("/meus-treinos");
            }}
          >
            <li className="lista-menu-item">Meus treinos</li>
          </button>
          {cadastrarObjetivo && (
            <button
              className="botao-menu"
              onClick={() => {
                navigate("/crud-objetivo");
              }}
            >
              <li className="lista-menu-item">Gerenciar Objetivos</li>
            </button>
          )}
          {editarObjetivo && (
            <button
              className="botao-menu"
              onClick={() => {
                navigate("/listar/objetivos");
              }}
            >
              <li className="lista-menu-item">Visualizar Objetivos</li>
            </button>
          )}
          {cadastrarExercicios && (
            <button
              className="botao-menu"
              onClick={() => {
                navigate("/crud-exercicio");
              }}
            >
              <li className="lista-menu-item">Gerenciar Exercicio</li>
            </button>
          )}
          {editarExercicio && (
            <button
              className="botao-menu"
              onClick={() => {
                navigate("/listar/exercicios");
              }}
            >
              <li className="lista-menu-item">Visualizar Exercicios</li>
            </button>
          )}
          {cadastrarTipoDeficiencia && (
            <button
              className="botao-menu"
              onClick={() => {
                navigate("/crud-tipoDeficiencia");
              }}
            >
              <li className="lista-menu-item">Gerenciar Deficiências</li>
            </button>
          )}
          {cadastrarTipoDeficiencia && (
            <button
              className="botao-menu"
              onClick={() => {
                navigate("/listar/Deficiencias");
              }}
            >
              <li className="lista-menu-item">Visualizar Deficiências</li>
            </button>
          )}
          {validarLaudo && (
            <button
              className="botao-menu"
              onClick={() => {
                navigate("/validacao/parq");
              }}
            >
              <li className="lista-menu-item">Par-Q's Pendentes</li>
            </button>
          )}
          {cadastrarPerfil && (
            <button
              className="botao-menu"
              onClick={() => {
                navigate("/cadastrodeperfil");
              }}
            >
              <li className="lista-menu-item">Cadastrar Perfil</li>
            </button>
          )}
          {cadastrarUsuario && (
            <button
              className="botao-menu"
              onClick={() => {
                navigate("/registro");
              }}
            >
              <li className="lista-menu-item">Cadastrar Usuario</li>
            </button>
          )}
          {cadastrarUsuario && (
            <button
              className="botao-menu"
              onClick={() => {
                navigate("/listar/usuarios");
              }}
            >
              <li className="lista-menu-item">Visualizar Usuários</li>
            </button>
          )}
          {visualizarAuditoria && (
            <button
              className="botao-menu"
              onClick={() => {
                navigate("/auditoria");
              }}
            >
              <li className="lista-menu-item">Visualizar Auditoria</li>
            </button>
          )}
          <button
            className="botao-menu"
            onClick={() => {
              navigate("/imc");
            }}
          >
            <li className="lista-menu-item">Calcular IMC</li>
          </button>
          <button
            className="botao-menu"
            onClick={() => {
              navigate("/receitas");
            }}
          >
            <li className="lista-menu-item">Receitas</li>
          </button>
        </ul>
      </Modal>
      {menuState !== false && (
        <button className="botaoMenu" onClick={handleToggleModal}>
          <span className="textMenu">|||</span>
        </button>
      )}

      <div className="imgHeader" style={{ left: `${imageLeft}` }}>
        {isSmallScreen ? (
          <img src={logoMobile} alt="Logo DigitalFit para mobile" />
        ) : (
          <img src={digitalfitImage} alt="Logo DigitalFit" />
        )}
      </div>

      <div className="botoes-acessibilidade">
        <p style={{ color: "#000" }}>{greetings}</p>
        <Acessibilidade />

        {logoutState !== false && (
          <button
            className="botaoLogout"
            aria-label="Botão de Logout"
            onClick={logout}
          >
            <img
              className="imgLogout"
              src={logoutIcon}
              alt="Imagem de logout"
            />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
