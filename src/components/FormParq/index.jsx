import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { api } from "../../service/api";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "500px",
    padding: "40px",
    background: "var(--laranja-header)",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
};

const questions = [
  {
    id: "problemaCoracao",
    question:
      "Algum médico já disse que você possui algum problema de coração e que só deveria realizar atividade física supervisionado por profissionais de saúde?",
  },
  {
    id: "doresPeito",
    question: "Você sente dores no peito quando pratica atividade física?",
  },
  {
    id: "ultimoMes",
    question:
      "No último mês, você sentiu dores no peito quando praticou atividade física?",
  },
  {
    id: "desiquilibrio",
    question:
      "Você apresenta desequilíbrio devido à tontura e/ou perda de consciência?",
  },
  {
    id: "osseo",
    question:
      "Você possui algum problema ósseo ou articular que poderia ser piorado pela atividade física?",
  },
  {
    id: "medicamento",
    question:
      "Você toma atualmente algum medicamento para pressão arterial e/ou problema de coração?",
  },
  {
    id: "razao",
    question:
      "Sabe de alguma outra razão pela qual você não deve praticar atividade física?",
  },
];

const FormParq = () => {
  const navigate = useNavigate();
  const initialAnswersState = questions.reduce((acc, q) => {
    acc[q.id] = { value: null };
    return acc;
  }, {});

  const [answers, setAnswers] = useState(initialAnswersState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const [assinatura, setAssinatura] = useState();

  const userLogged = localStorage.getItem("userLogged");
  const arrayUser = JSON.parse(userLogged);

  useEffect(() => {
    if (isFormValid()) {
      sendPostRequest();
    }
  }, [assinatura]);

  const handleAnswerChange = (id, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: { value },
    }));
  };

  const isFormValid = () => {
    return Object.values(answers).every((answer) => answer.value !== null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      const hasYesAnswer = Object.values(answers).some(
        (answer) => answer.value === true
      );

      if (hasYesAnswer) {
        setAssinatura(false);
        setMessage(true);
        setIsModalOpen(true);
      } else {
        setAssinatura(true);
      }
    } else {
      alert("Por favor, responda a todas as perguntas antes de enviar.");
    }
  };

  const sendPostRequest = async () => {
    const accessToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await api.post(
        "usuario/laudo",
        {
          coracao: answers.problemaCoracao.value,
          doresNoPeito: answers.doresPeito.value,
          desiquilibrio: answers.desiquilibrio.value,
          ultimoMes: answers.ultimoMes.value,
          osseo: answers.osseo.value,
          pressao: answers.medicamento.value,
          outraRazao: answers.razao.value,
          assinatura: assinatura,
          usuario: arrayUser.id,
        },
        config
      );
      setAnswers(initialAnswersState);
      console.log(response.data);
      if (assinatura === false) {
        setTimeout(() => {
          navigate("/termo");
        }, 5000);
      } else {
        navigate("/termo");
      }
    } catch (error) {
      console.log("Erro ao cadastrar PAR-Q:", error.message);
    }
  };

  return (
    <main className="parq-container">
      <h2 className="parq-description">
        Questionário de Prontidão para Atividade Física (PAR-Q)
      </h2>
      <section className="parq">
        <p className="parq-title">
          Este questionário tem o objetivo de identificar a necessidade de
          avaliação por um médico antes do início da atividade física. Caso você
          responda “SIM” a uma ou mais perguntas, converse com seu médico ANTES
          de aumentar seu nível atual de atividade física. Mencione este
          questionário e as perguntas às quais você respondeu “SIM”.
        </p>
        <form className="parq-form" onSubmit={handleSubmit}>
          {questions.map((q) => (
            <div className="parq-question" key={q.id}>
              <p className="parq-question-text">{q.question}</p>
              <div>
                <label htmlFor={`question${q.id}sim`}>Sim</label>
                <input
                  id={`question${q.id}sim`}
                  type="radio"
                  name={`question${q.id}`}
                  value={true}
                  checked={answers[q.id].value === true}
                  onChange={() => handleAnswerChange(q.id, true)}
                />{" "}
                <label htmlFor={`question${q.id}nao`}>Não</label>
                <input
                  id={`question${q.id}nao`}
                  type="radio"
                  name={`question${q.id}`}
                  value={false}
                  checked={answers[q.id].value === false}
                  onChange={() => handleAnswerChange(q.id, false)}
                />{" "}
              </div>
            </div>
          ))}
          <button className="parq-submit" type="submit">
            Enviar
          </button>
        </form>
      </section>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Aceitar Termos de Responsabilidade"
        ariaHideApp={false}
        style={customStyles}
      >
        {message && (
          <p className="modal-title">
            recomendável conversar com um médico antes de aumentar seu nível
            atual de atividade física, por ter respondido “SIM” a uma ou mais
            perguntas do “Questionário de Prontidão para Atividade Física”
            (PAR-Q)
          </p>
        )}
      </Modal>
    </main>
  );
};

export default FormParq;
