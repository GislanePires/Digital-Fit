import React, { useState } from "react";
import "./style.scss";

const ShowContent = ({ opcao, children }) => {
  const [containerVisibility, setContainerVisibility] = useState(true);

  const handleDropDown = () => {
    if (containerVisibility) {
      setContainerVisibility(false);
    } else {
      setContainerVisibility(true);
    }
  };

  return (
    <section className="form-section-container">
      <button className="mostrar" onClick={handleDropDown}>
        <div className="container-showContent">
          <h3 className="container-title">{opcao}</h3>
        </div>
      </button>
      <section className="form-avaliacao">{containerVisibility && children}</section>
    </section>
  );
};

export default ShowContent;
