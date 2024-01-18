import React, { useEffect, useState } from "react";
import TimerCrescente from "./../TimerCrescente/index";
import SpotifyPlayer from "../SpotifyPlayer";

const ContainerTreino = ({
  addMeusTreinos,
  temParaplegia,
  treino,
  buttonState,
  timerState,
  spotifyState,
}) => {
  const url = treino.urlVideo;
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 700);
  const startIndex = url.indexOf("v=") + 2;
  const endIndex =
    url.indexOf("&", startIndex) !== -1
      ? url.indexOf("&", startIndex)
      : url.length;
  const videoId = url.substring(startIndex, endIndex);
  const [onLoad, setOnLoad] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 700);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(()=>{
    setOnLoad(true);
  }, [])

  return (
    <section className="container-treino">
      {buttonState && (
        <button className="addTreino" onClick={addMeusTreinos}>
          Adicionar aos meus treinos
        </button>
      )}
      {temParaplegia && (
        <p className="tem-paraplegia-text">
          Antes de iniciar o seu alongamento, certifique-se de estar com uma
          roupa confortável para evitar lesões ou desconforto. Também é bom
          travar as rodas da sua cadeira, assim você garante maior estabilidade
          durante o exercício
        </p>
      )}
      <h1 className="treino-title">{treino.subtitulo}</h1>
      <img
        className="treino-image"
        src={treino.urlImage}
        alt={treino.descricaoUrlImage}
      />
      {isSmallScreen ? (
        <iframe
          width="300"
          height="200"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={treino.descricaoUrlVideo}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      ) : (
        <iframe
          width="650"
          height="400"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={treino.descricaoUrlVideo}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      )}
      {spotifyState && (
        <div className={`spotify-player-container ${onLoad === true ? "spotify-animation" : ""}`}>
          <SpotifyPlayer playlistId="7c8YrzHlapYbk3OpZYi31K" />
        </div>
      )}
      {timerState && <TimerCrescente />}
      <p>{treino.descricao}</p>
    </section>
  );
};

export default ContainerTreino;
