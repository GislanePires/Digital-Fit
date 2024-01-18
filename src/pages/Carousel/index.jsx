import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Acompanhamento from "../../assets/imgs/Acompanhamento.png";
import Retangle from "../../assets/imgs/Rectangle 9.png";
import Saudavel from "../../assets/imgs/saudavel.png";
import Dicas from "../../assets/imgs/Dicas.png";
import Header from "../../components/Header";
import Lock from "../../assets/imgs/padlock.png";
import "./style.scss";
import { api, getUsuariosById } from "../../service/api";

const images = [
  { id: "1", text: "Acompanhamento", source: Acompanhamento },
  { id: "2", text: "Treinos", source: Retangle },
  { id: "3", text: "Vida Saudável", source: Saudavel },
  { id: "4", text: "Alimentação", source: Dicas },
];

function MyCarousel() {
  const userLogged = localStorage?.getItem("userLogged");
  const arrayUser = JSON.parse(userLogged);
  const [laudoState, setLaudoState] = useState();

  useEffect(() => {
    const acessToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${acessToken}`,
      },
    };
    getUsuariosById(arrayUser?.id, config)
      .then((response) => {
        const userLogged = response.data;
        localStorage.setItem("userLogged", JSON.stringify(userLogged));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [arrayUser?.id]);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    api
      .get("usuario/laudo", config)
      .then((response) => {
        const laudoDoUsuario = response.data.find(
          (laudo) => laudo.usuario === arrayUser.id
        );
        // console.log("Laudo do usuário:", laudoDoUsuario);
        if (laudoDoUsuario === undefined) {
          setLaudoState(false);
        } else {
          setLaudoState(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [arrayUser?.id]);

  const navigate = useNavigate();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          vertical: true,
          verticalSwiping: true,
        },
      },
    ],
  };

  if (!userLogged) {
    return <Navigate to="/login" />;
  }

  if(arrayUser.liberadoPeloReponsavelTecnico === true){
    return <Navigate to="/meus-treinos" />;
  }

  const goToMedidas = () => {
    navigate("/medidas");
  };

  return (
    <>
      <Header greetings={`Olá, ${arrayUser.nome}`} />
      <main className="containerBody">
        {laudoState === false && arrayUser.liberadoPeloReponsavelTecnico === false ? (
          <button className="buttonComecar" onClick={goToMedidas}>
            Quero Começar!
          </button>
        ) : (
          <p className="texto-aguarde">
            Um responsável técnico irá avaliar seu laudo, por favor aguarde.
          </p>
        )}

        <Slider {...settings} className="containerGeral">
          {images.map((image) => (
            <div key={image.id} className="carouselContainer">
              <div className="carouselCenter">
                <div className="caCent">
                  <img
                    className="carousel-image"
                    src={image.source}
                    alt={image.id}
                  />
                  <div className="lockContainer">
                    <div className="lock">
                      <button className="buttonLock">
                        {image.text}
                        <div className="carousel-text"></div>
                      </button>
                      <img className="lock-image" src={Lock} alt="Lock" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </main>
    </>
  );
}

export default MyCarousel;
