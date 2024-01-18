import React, { useState, useEffect } from "react";
import "@fontsource/roboto/400.css";
import "./style.scss";
import Title from "../TitlePages";

const PageModel1 = ({
  children,
  imgBg2,
  imagemBg,
  imagemBg2,
  textAlt,
  textAlt2,
  imagemBgPosition,
  imagemBgPosition2,
  imagemPosition,
  imagemPosition2,
  imgbgPosition,
  textoInicial,
  textoDestaque,
  formCenter,
  imagemMobile
}) => {
  const [containerPrincipalDiv, setContainerPrincipalDiv] = useState("container-PageModel1");
  const [imagemBgClass, setImagemBgClass] = useState("imagemBg");
  const [localDaImagem, setLocalDaImagem] = useState(imagemBgPosition);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  }, []);

  useEffect(() => {
    if (imagemBgPosition === 'right' && windowWidth <= 850) {
      setLocalDaImagem('top');
    } else {
      setLocalDaImagem(imagemBgPosition);
    }
  }, [imagemBgPosition, windowWidth])

  useEffect(() => {
    if (localDaImagem === 'top') {
      setContainerPrincipalDiv('container-PageModel1 container-PageModel1-top');
      setImagemBgClass('imagemBg imagemBg-top');
    }
  }, [])

  const verificaImagemMobile = (imagemMobile) => {
    if (imagemMobile === undefined) { return "" } else { return imagemMobile }
  }
  return (
    <div className={containerPrincipalDiv}>
      {(localDaImagem === "left" || localDaImagem === "top") && (
        <div className={imagemBgClass + " " + verificaImagemMobile(imagemMobile)}>
          <img
            className={"imagemBgPosition-" + localDaImagem + " objImgPosition-" + imagemPosition}
            src={imagemBg}
            alt={textAlt}
          />
          <div className="imagemBg2">
            <img
              className={"imagemBgPosition-" + imagemBgPosition2 + " objImgPosition-" + imagemPosition2 + " imgBg2"}
              src={imgBg2}
              alt={textAlt2}
            />
          </div>
        </div>
      )}
      <div style={formCenter} className={"children children-" + imgbgPosition}>
        <Title textoInicial={textoInicial} textoDestaque={textoDestaque} />
        {children}
      </div>
      {localDaImagem === "right" && (
        <div className={"imagemBg "}>
          <img
            className={localDaImagem + " imgPosition" + imagemPosition}
            src={imagemBg}
            alt={textAlt}
          // style={imgBg2Style}
          />
        </div>

      )}
    </div>
  );
};

export default PageModel1;