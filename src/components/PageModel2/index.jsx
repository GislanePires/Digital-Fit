import React, { useState, useEffect } from "react";
import "@fontsource/roboto/400.css";
import "./style.scss";
import Title from "../TitlePages";

const PageModel2 = ({
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
  textoDestaque
}) => {
  const [containerPrincipalDiv, setContainerPrincipalDiv] = useState("container-PageModel2");
  const [imagemBgClass, setImagemBgClass] = useState("imagemBg");

  useEffect(() => {
    if (imagemBgPosition === 'top') {
      setContainerPrincipalDiv('container-PageModel2 container-PageModel2-top');
      setImagemBgClass('imagemBg imagemBg-top');
    }
  }, [])

  return (
    <div className={containerPrincipalDiv}>
      {(imagemBgPosition === "left" || imagemBgPosition === "top") && (
        <div className={imagemBgClass}>
          <img
            className={"imagemBgPosition-" + imagemBgPosition + " objImgPosition-" + imagemPosition}
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
      <div className={"children children-" + imgbgPosition}>
        <Title textoInicial={textoInicial} textoDestaque={textoDestaque} />
        {children}
      </div>
      {imagemBgPosition === "right" && (
        <div className="imagemBg">
          <img
            className={imagemBgPosition + " imgPosition" + imagemPosition}
            src={imagemBg}
            alt={textAlt}
            // style={imgBg2Style}
          />
            </div>

      )}
    </div>
  );
};

export default PageModel2;
