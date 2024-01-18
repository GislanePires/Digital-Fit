import React from "react";
import Header from "../../components/Header";
import { Navigate } from "react-router-dom";
import FormResponsabilidade from "../../components/FormResponsabilidade";
import "./style.scss";

function TermoResponsabilidade() {
  const userLogged = localStorage.getItem("userLogged");
  if (!userLogged) {
    return <Navigate to="/login" />;
  }

  const arrayUser = JSON.parse(userLogged);
  console.log(arrayUser.id)
  return (
    <main className="containerTermo">
      <Header greetings={`Olá, ${arrayUser.nome}`} />
      <section className="container-termo-resp">
        <FormResponsabilidade className="form-accept-terms" />
      </section>
    </main>
  );
}
export default TermoResponsabilidade;
