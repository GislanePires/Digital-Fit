import React, { useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import Counter from "../Counter/index";
import { api } from "../../service/api";

function FormAvaliacaoSimples() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    capacidade: "",
    forcaMuscular: "",
    flexibilidade: "",
    equilibrioCoordenacao: "",
    recuperacaoPosExercicio: "",
    desempenhoFisico: "",
    doresMusculares: "",
    fadiga: "",
    flexoes: 0,
    abdominais: 0,
  });

  const userLogged = localStorage.getItem("userLogged");

  const arrayUser = JSON.parse(userLogged);

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCounterChange = (name, event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "capacidade",
      "forcaMuscular",
      "flexibilidade",
      "equilibrioCoordenacao",
      "recuperacaoPosExercicio",
      "desempenhoFisico",
      "doresMusculares",
      "fadiga",
      "flexoes",
      "abdominais",
    ];

    const isEmptyField = requiredFields.some((field) => !formData[field]);
    if (isEmptyField) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const acessToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${acessToken}`,
      },
    };

    try {
      const doresMuscularesExcessivas =
        formData.doresMusculares.toLowerCase() === "sim";

      const fadigaProlongadaAposExercicio =
        formData.fadiga.toLowerCase() === "sim";

      const response = await api.post(
        "usuario/avaliacaoFisicaSimplificada",
        {
          cardiovascular: formData.capacidade.toUpperCase(),
          forca: formData.forcaMuscular.toUpperCase(),
          flexibilidade: formData.flexibilidade.toUpperCase(),
          coordenacao: formData.equilibrioCoordenacao.toUpperCase(),
          recuperacao: formData.recuperacaoPosExercicio.toUpperCase(),
          doresMuscularesExcessivas: doresMuscularesExcessivas,
          fadigaProlongadaAposExercicio: fadigaProlongadaAposExercicio,
          flexoes: parseInt(formData.flexoes, 10),
          abdominais: parseInt(formData.abdominais, 10),
          usuario: arrayUser.id,
        },
        config
      );
      console.log(response.data);
      navigate("/parq");
      setFormData({
        capacidade: "",
        forcaMuscular: "",
        flexibilidade: "",
        equilibrioCoordenacao: "",
        recuperacaoPosExercicio: "",
        desempenhoFisico: "",
        doresMusculares: "",
        fadiga: "",
        flexoes: 0,
        abdominais: 0,
      });
    } catch (error) {
      console.log("Erro:", error.message);
    }
  };

  return (
    <main className="avaliacao-simlificada-container">
      <h1>Avaliação Física Simplificada</h1>
      <form className="form-avaliacao-simplificada" onSubmit={handleSubmit}>
        <label htmlFor="Teste de resistência" className="labelForm">
          1. Teste de Resistência Cardiovascular{" "}
        </label>
        <p aria-label="Capacidade cardiovascular" className="text-avaliacao">
          Qual é a sua capacidade atual de realizar atividades cardiovasculares,
          como correr ou andar de bicicleta?
        </p>
        <div className="checkbox-fisico">
          <div className="inputs-form">
            <input
              type="radio"
              id="baixa"
              name="capacidade"
              value="baixa"
              checked={formData.capacidade === "baixa"}
              onChange={handleRadioChange}
            />
            <label htmlFor="baixa" className="opcao">
              Baixa
            </label>
          </div>

          <div className="inputs-form">
            <input
              type="radio"
              id="media"
              name="capacidade"
              value="media"
              checked={formData.capacidade === "media"}
              onChange={handleRadioChange}
            />
            <label htmlFor="media" className="opcao">
              Média
            </label>
          </div>
          <div className="inputs-form">
            <input
              type="radio"
              id="alta"
              name="capacidade"
              value="alta"
              checked={formData.capacidade === "alta"}
              onChange={handleRadioChange}
            />
            <label htmlFor="alta" className="opcao">
              Alta
            </label>
          </div>
        </div>

        <label htmlFor="Teste de força muscular" className="labelForm">
          2. Teste de Força Muscular{" "}
        </label>
        <p aria-label="Capacidade cardiovascular" className="text-avaliacao">
          Como você avaliaria sua força muscular?
        </p>

        <div className="checkbox-fisico">
          <div className="inputs-form">
            <input
              type="radio"
              id="baixaForcaMuscular"
              name="forcaMuscular"
              value="baixa"
              checked={formData.forcaMuscular === "baixa"}
              onChange={handleRadioChange}
            />
            <label htmlFor="baixaForcaMuscular" className="opcao">
              Baixa
            </label>
          </div>
          <div className="inputs-form">
            <input
              type="radio"
              id="mediaForcaMuscular"
              name="forcaMuscular"
              value="media"
              checked={formData.forcaMuscular === "media"}
              onChange={handleRadioChange}
            />
            <label htmlFor="mediaForcaMuscular" className="opcao">
              Média
            </label>
          </div>
          <div className="inputs-form">
            <input
              type="radio"
              id="altaForcaMuscular"
              name="forcaMuscular"
              value="alta"
              checked={formData.forcaMuscular === "alta"}
              onChange={handleRadioChange}
            />
            <label htmlFor="altaForcaMuscular" className="opcao">
              Alta
            </label>
          </div>
        </div>

        <label htmlFor="Teste de Flexibilidade" className="labelForm">
          3. Teste de Flexibilidade{" "}
        </label>
        <p aria-label="Teste de Flexibilidade" className="text-avaliacao">
          Como você se classificaria em termos de flexibilidade?
        </p>

        <div className="checkbox-fisico">
          <div className="inputs-form">
            <input
              type="radio"
              id="baixaFlexibilidade"
              name="flexibilidade"
              value="baixa"
              checked={formData.flexibilidade === "baixa"}
              onChange={handleRadioChange}
            />
            <label htmlFor="baixaFlexibilidade">Baixa</label>
          </div>
          <div className="inputs-form">
            <input
              type="radio"
              id="mediaFlexibilidade"
              name="flexibilidade"
              value="media"
              checked={formData.flexibilidade === "media"}
              onChange={handleRadioChange}
            />
            <label htmlFor="mediaFlexibilidade">Média</label>
          </div>
          <div className="inputs-form">
            <input
              type="radio"
              id="altaFlexibilidade"
              name="flexibilidade"
              value="alta"
              checked={formData.flexibilidade === "alta"}
              onChange={handleRadioChange}
            />
            <label htmlFor="altaFlexibilidade">Alta</label>
          </div>
        </div>

        <label htmlFor="Teste de força muscular" className="labelForm">
          4. Teste de Equilíbrio e Coordenação{" "}
        </label>
        <p aria-label="Equilíbrio e Coordenação" className="text-avaliacao">
          Como você avaliaria seu equilíbrio e coordenação geral?
        </p>

        <div className="checkbox-fisico">
          <div className="inputs-form">
            <input
              type="radio"
              id="baixaEquilibrioCoordenacao"
              name="equilibrioCoordenacao"
              value="baixa"
              checked={formData.equilibrioCoordenacao === "baixa"}
              onChange={handleRadioChange}
            />
            <label htmlFor="baixaEquilibrioCoordenacao">Baixa</label>
          </div>
          <div className="inputs-form">
            <input
              type="radio"
              id="mediaEquilibrioCoordenacao"
              name="equilibrioCoordenacao"
              value="media"
              checked={formData.equilibrioCoordenacao === "media"}
              onChange={handleRadioChange}
            />
            <label htmlFor="mediaEquilibrioCoordenacao">Média</label>
          </div>
          <div className="inputs-form">
            <input
              type="radio"
              id="altaEquilibrioCoordenacao"
              name="equilibrioCoordenacao"
              value="alta"
              checked={formData.equilibrioCoordenacao === "alta"}
              onChange={handleRadioChange}
            />
            <label htmlFor="altaEquilibrioCoordenacao">Alta</label>
          </div>
        </div>

        <label htmlFor="Recuperação Pós Exercício" className="labelForm">
          5. Teste de Recuperação Pós Exercício{" "}
        </label>
        <p aria-label="Recuperação Pós Exercício" className="text-avaliacao">
          Como é sua recuperação após um treino intenso?
        </p>

        <div className="checkbox-fisico">
          <div className="inputs-form">
            <input
              type="radio"
              id="baixaRecuperacao"
              name="recuperacaoPosExercicio"
              value="baixa"
              checked={formData.recuperacaoPosExercicio === "baixa"}
              onChange={handleRadioChange}
            />
            <label htmlFor="baixaRecuperacao">lenta</label>
          </div>
          <div className="inputs-form">
            <input
              type="radio"
              id="mediaRecuperacao"
              name="recuperacaoPosExercicio"
              value="media"
              checked={formData.recuperacaoPosExercicio === "media"}
              onChange={handleRadioChange}
            />
            <label htmlFor="mediaRecuperacao">Moderada</label>
          </div>
          <div className="inputs-form">
            <input
              type="radio"
              id="altaRecuperacao"
              name="recuperacaoPosExercicio"
              value="alta"
              checked={formData.recuperacaoPosExercicio === "alta"}
              onChange={handleRadioChange}
            />
            <label htmlFor="altaRecuperacao">Rápida</label>
          </div>
        </div>

        <label htmlFor="Recuperação Pós Exercício" className="labelForm">
          6. Teste de Desempenho físico
        </label>
        <p aria-label="Recuperação Pós Exercício" className="text-avaliacao">
          Como você classificaria o seu desempenho físico?
        </p>

        <div className="checkbox-fisico">
          <div className="inputs-form">
            <input
              type="radio"
              id="inicianteDesempenhoFisico"
              name="desempenhoFisico"
              value="iniciante"
              checked={formData.desempenhoFisico === "iniciante"}
              onChange={handleRadioChange}
            />
            <label htmlFor="inicianteDesempenhoFisico">Iniciante</label>
          </div>
          <div className="inputs-form">
            <input
              type="radio"
              id="intermediarioDesempenhoFisico"
              name="desempenhoFisico"
              value="intermediario"
              checked={formData.desempenhoFisico === "intermediario"}
              onChange={handleRadioChange}
            />
            <label htmlFor="intermediarioDesempenhoFisico">Intermediário</label>
          </div>
          <div className="inputs-form">
            <input
              type="radio"
              id="avancadoDesempenhoFisico"
              name="desempenhoFisico"
              value="avancado"
              checked={formData.desempenhoFisico === "avancado"}
              onChange={handleRadioChange}
            />
            <label htmlFor="avancadoDesempenhoFisico">Avançado</label>
          </div>
        </div>

        <p
          aria-label="Dores musculares"
          className="text-avaliacao"
          style={{ marginTop: "30px" }}
        >
          Existe a presença de dores musculares excessivas?
        </p>
        <div className="checkbox-opcao">
          <div className="inputs-form">
            <input
              type="radio"
              id="simDoresMusculares"
              name="doresMusculares"
              value="sim"
              checked={formData.doresMusculares === "sim"}
              onChange={handleRadioChange}
              aria-label="Sim"
            />
            <label htmlFor="simDoresMusculares">Sim</label>
          </div>
          <div className="inputs-form">
            <input
              type="radio"
              id="naoDoresMusculares"
              name="doresMusculares"
              value="nao"
              checked={formData.doresMusculares === "nao"}
              onChange={handleRadioChange}
              aria-label="Não"
            />
            <label htmlFor="naoDoresMusculares">Não</label>
          </div>
        </div>
        <p
          aria-label="Fadiga"
          className="text-avaliacao"
          style={{ marginTop: "30px" }}
        >
          Existe a presença de fadiga prolongada após o exercício?
        </p>
        <div className="checkbox-opcao">
          <div className="inputs-form">
            <input
              type="radio"
              id="simFadiga"
              name="fadiga"
              value="sim"
              checked={formData.fadiga === "sim"}
              onChange={handleRadioChange}
              aria-label="Sim"
            />
            <label htmlFor="simFadiga">Sim</label>
          </div>
          <div className="inputs-form">
            <input
              type="radio"
              id="naoFadiga"
              name="fadiga"
              value="nao"
              checked={formData.fadiga === "nao"}
              onChange={handleRadioChange}
              aria-label="Não"
            />
            <label htmlFor="naoFadiga">Não</label>
          </div>
        </div>

        <section className="container-flexao">
          <label htmlFor="flexoes">
            Quantas flexões você consegue realizar em 60 segundos?
          </label>
          <div className="input-button">
            <input
              type="number"
              id="flexoes"
              name="flexoes"
              value={formData.flexoes}
              onChange={(event) => handleCounterChange("flexoes", event)}
            />
          </div>
          <Counter button="btn1" />
        </section>

        <section className="container-abdominal">
          <label htmlFor="abdominais">
            Quantas abdominais você consegue realizar em 60 segundos?
          </label>
          <div className="input-button">
            <input
              type="number"
              id="abdominais"
              name="abdominais"
              value={formData.abdominais}
              onChange={(event) => handleCounterChange("abdominais", event)}
            />
          </div>
          <Counter button="btn2" />
        </section>

        <div className="div-Button-Avaliacao">
          <button type="submit" className="buttonAvaliacao">
            Enviar
          </button>
        </div>
      </form>
    </main>
  );
}
export default FormAvaliacaoSimples;
