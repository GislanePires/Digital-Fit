import React, { useState } from "react";
import "./style.scss";
import Header from "../../components/Header";
import digitalfitImage from "../../assets/imgs/logoMobile.png";
import { useNavigate, Navigate } from "react-router-dom";
import { getUsuarios, postLogin } from "../../service/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const userLogged = localStorage.getItem("userLogged");

  if (userLogged) {
    return <Navigate to="/carousel" />;
  }

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Preencha os dois campos.");
      return;
    }

    try {
      const response = await postLogin(username, password);

      const authorizationHeader = response.headers.authorization;
      const token = authorizationHeader.split(" ")[1];

      localStorage.setItem("token", token);

      setUsername("");
      setPassword("");
      setMessage(false);
    } catch (error) {
      setMessage(true);
    } finally {
      const acessToken = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${acessToken}`,
        },
      };
      try {
        const resposta = await getUsuarios(config);
        const userLogged = resposta.data.find(
          (user) => user.matricula === username
        );
        localStorage.setItem("userLogged", JSON.stringify(userLogged));
        if (userLogged.perfis[0].cadastrarUsuario) {
          navigate("/registro");
        } else {
          navigate("/carousel");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };


  return (
    <>
      <Header logoutState={false} menuState={false} imageLeft="45svw"/>
      <div className="containerLogin">
        <div className="overlay"></div>
        <div className="login-container">
          <div className="login">
            <img className="logo" src={digitalfitImage} alt="Logo DigitalFit" />
            <p className="entrar">Login</p>
            <input
              className="campo"
              type="text"
              aria-label="Matricula"
              placeholder="Matricula"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="inputPassword">
            <input
              className="campo"
              type={showPassword ? "text" : "password"}
              aria-label="Senha"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="ocultaSenha" type="button" onClick={toggleShowPassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            </div>
            <button className="login-button" onClick={handleLogin}>
              Entrar
            </button>
            {message && <p>Usuário não encontrado</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
