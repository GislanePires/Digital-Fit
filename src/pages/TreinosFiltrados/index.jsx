import React, { useEffect, useState } from "react";
import { useObjetivosContext } from "../../context/ObjetivosContext";
import { useNavigate, Navigate } from "react-router-dom";
import Header from "../../components/Header";
import { getObjetivos, getTreinosByObjetivos } from "../../service/api";
import "./style.scss";
import { useTreinoContext } from "../../context/TreinoContext";

const TreinosFiltrados = () => {
  const { objetivos: objetivosContext } = useObjetivosContext();
  const { setTreino } = useTreinoContext();
  const [treinosPorObjetivo, setTreinosPorObjetivo] = useState({});
  const [objetivosIdsFiltrados, setObjetivosIdsFiltrados] = useState([]);
  const navigate = useNavigate();
  const userLogged = localStorage.getItem("userLogged");
  const arrayUser = JSON.parse(userLogged);

  useEffect(() => {
    const fetchTreinos = async () => {
      const acessToken = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${acessToken}`,
        },
      };
      try {
        const objetivos = await getObjetivos(config);
        const objetivosIds = objetivosContext.map((objetivo) => {
          const objetivoEncontrado = objetivos.data.find(
            (item) => item.nome === objetivo
          );
          return objetivoEncontrado ? objetivoEncontrado.id : null;
        });
        const objetivosIdsFiltrados = objetivosIds.filter((id) => id !== null);

        const treinosPorObjetivo = {};
        await Promise.all(
          objetivosIdsFiltrados.map(async (objetivoId) => {
            const response = await getTreinosByObjetivos(
              objetivoId,
              arrayUser.id,
              config
            );
            const treinos = response.data;
            if (treinos.length > 0) {
              treinosPorObjetivo[objetivoId] = treinos;
            }
          })
        );

        setTreinosPorObjetivo(treinosPorObjetivo);
        setObjetivosIdsFiltrados(objetivosIdsFiltrados);
      } catch (error) {
        console.error("Erro ao obter dados:", error);
      }
    };

    fetchTreinos();
  }, [objetivosContext, arrayUser?.id]);

  const redirectToTreinoPage = (treino) => {
    if (treino != null) {
      setTreino(null);
    }
    setTreino(treino);
    navigate("/treino-escolhido");
  };

  if (!userLogged) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header greetings={`Olá, ${arrayUser?.nome}`} />
      <section className="Objetivos-treinos">
        {objetivosContext.map((objetivo, index) => (
          <div className="objetivo-categoria" key={index}>
            {treinosPorObjetivo[objetivosIdsFiltrados[index]]?.length > 0 && (
              <>
                <h1 className="Objetivos-treinos-titulo">{objetivo}:</h1>
                <section className="treinos-container">
                  {treinosPorObjetivo[objetivosIdsFiltrados[index]]?.map(
                    (treino) => (
                      <button
                        key={treino.id}
                        onClick={() => redirectToTreinoPage(treino)}
                        className="treino-button"
                      >
                        <div className="treino">
                          <h1 className="treino-title">{treino.subtitulo}</h1>
                          <img
                            className="treino-image"
                            src={treino.urlImage}
                            alt={treino.descricaoUrlImage}
                          />
                        </div>
                      </button>
                    )
                  )}
                </section>
              </>
            )}
          </div>
        ))}
      </section>
    </>
  );
};

export default TreinosFiltrados;
