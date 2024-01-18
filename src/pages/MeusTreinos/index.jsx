import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { api, getUsuariosById } from "../../service/api";
import Header from "../../components/Header";
import { useTreinoContext } from "../../context/TreinoContext";
import "./meusTreinos.scss";
import { toast } from "react-toastify";
import ToastNotification from "./../../components/ToastNotification/index";

const MeusTreinos = () => {
  const forceUpdate = useForceUpdate();
  const { setTreino } = useTreinoContext();
  const navigate = useNavigate();
  const userLogged = localStorage.getItem("userLogged");
  const arrayUser = JSON.parse(userLogged);
  const [treinosList, setTreinosList] = useState([]);
  const [arrayTreinos, setArrayTreinos] = useState([]);
  const [passou, setPassou] = useState(false);
  useEffect(() => {
    const acessToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${acessToken}`,
      },
    };
    getUsuariosById(arrayUser?.id, config)
      .then((response) => {
        if (response.data.notepad) {
          setTreinosList(JSON.parse(response.data.notepad));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [arrayUser?.id]);

  useEffect(() => {
    const fetchTreinos = async () => {
      const accessToken = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const arrayTreinos = await Promise.all(
        treinosList.map(async (treino) => {
          try {
            const response = await api.get(`exercicio/${treino}`, config);
            return response.data;
          } catch (error) {
            console.log(error);
            return null;
          }
        })
      );

      setArrayTreinos(arrayTreinos.filter((treino) => treino !== null));
    };

    if (treinosList.length > 0) {
      fetchTreinos();
    }
  }, [treinosList]);

  useEffect(() => {
    const acessToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${acessToken}`,
      },
    };

    api
      .get(`usuario/laudo/parq-pendente`, config)
      .then((response) => {
        if (response.data.length === 0) {
          console.log("sem laudos");
        } else if (arrayUser?.perfis[0].editarLaudo && passou === false) {
          toast.info("Você tem laudos pendentes", {
            position: "top-right",
            draggable: true,
          });
          setPassou(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [arrayUser, passou]);

  const redirectToTreinoPage = (treino) => {
    if (treino != null) {
      setTreino(null);
    }
    setTreino(treino);
    navigate("/treino");
  };

  const removeFromTreinosList = async (treinoToRemove) => {
    const updatedTreinosList = treinosList.filter(
      (treino) => treino !== treinoToRemove.id
    );

    const updatedTreinosString = JSON.stringify(updatedTreinosList);

    const accessToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      await api.put(
        `usuarios/${arrayUser.id}`,
        {
          notepad: updatedTreinosString,
        },
        config
      );

      setTreinosList(updatedTreinosList);
      setArrayTreinos(updatedTreinosList.map((treino) => ({ id: treino })));
      forceUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  if (!userLogged) {
    return <Navigate to="/login" />;
  }

  if (arrayUser.liberadoPeloReponsavelTecnico === false) {
    return <Navigate to="/carousel" />;
  }

  return (
    <>
      <Header greetings={`Olá, ${arrayUser.nome}`} />
      <ToastNotification />
      <div className="treinos-container">
        {arrayTreinos.length === 0 ? (
          <>
            <p>Não há treinos disponíveis. Escolha seus treinos primeiro</p>
            <button
              className="go-to-treinos"
              onClick={() => {
                navigate("/user-page");
              }}
            >
              Escolher treinos
            </button>
          </>
        ) : (
          arrayTreinos.map((treino) => (
            <div className="treino-wrapper" key={treino?.id}>
              <button
                className="treino-button"
                onClick={() => redirectToTreinoPage(treino)}
              >
                <div className="treino">
                  <h1 className="treino-title">{treino?.subtitulo}</h1>
                  <img
                    className="treino-image"
                    src={treino?.urlImage}
                    alt={treino?.descricaoUrlImage}
                  />
                </div>
              </button>
              <button
                className="remove-treino"
                onClick={() => removeFromTreinosList(treino)}
              >
                Remover dos meus treinos
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

function useForceUpdate() {
  const [, forceUpdate] = useState(null);
  return () => forceUpdate((prev) => !prev);
}

export default MeusTreinos;
