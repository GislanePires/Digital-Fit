import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const CardsAnimados = (props) => {
  const { imageSrc, title, description, buttonText } = props;

  return (
    <section className="cardAnimadoContainer">
      <article className="cardAnimado">
        <img
          className="card__background"
          src={imageSrc}
          alt="Card Background"
          width="1920"
          height="2193"
        />
        <div className="card__content | flow">
          <div className="card__content--container | flow">
            <h2 className="card__title">{title}</h2>
            <p className="card__description">{description}</p>
          </div>

          <Link to="/login">
            <button className="card__button">{buttonText}</button>
          </Link>
        </div>
      </article>
    </section>
  );
};

export default CardsAnimados;
