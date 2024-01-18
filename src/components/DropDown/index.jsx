import React, { useState } from "react";
import expand from "../../assets/imgs/expand.png";
import retract from "../../assets/imgs/retract.png";
import "./style.scss";

const DropDown = ({ opcao, children }) => {
  const [containerVisibility, setContainerVisibility] = useState(false);
  const [arrow, setArrow] = useState(expand);

  const handleDropDown = () => {
    if (containerVisibility) {
      setContainerVisibility(false);
      setArrow(expand);
    } else {
      setContainerVisibility(true);
      setArrow(retract);
    }
  };

  return (
    <section className="dropOption">
      <div className="dropDown-container">
        <h3 className="container-title">{opcao}</h3>
        <button className="Botao-bandeja" onClick={handleDropDown}>
          <img src={arrow} alt="Botão de expandir bandeja" />
        </button>
      </div>
      <section className={`filho ${containerVisibility ? "open-container" : ""}`}>{children}</section>
    </section>
  );
};

export default DropDown;
