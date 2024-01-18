import React from "react";
import "./style.scss";

// https://alvarotrigo.com/blog/css-text-animations/
// https://freefrontend.com/css-text-effects/
// https://freefrontend.com/css-text-animations/

const TitlePages = ({ textoInicial, textoDestaque }) => {
  function verifyTextoDestaque() {
    if (textoDestaque === "") {
      return "";
    } else {
      return "underlined underline-clip";
    }
  }

  return (
    <div className="titleContainer">
      <h1>
        {textoInicial}{" "}
        <span className={verifyTextoDestaque()}>{textoDestaque}</span>
      </h1>
    </div>
  );
};

export default TitlePages;
