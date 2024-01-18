import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { sendCode, validateCode } from "../../service/api";

function FormResponsabilidade() {
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accessCode, setAccessCode] = useState(new Array(6).fill(""));
  const [errorMessage, setErrorMessage] = useState("");
  const testCode = "1234";
  const inputRefs = accessCode.map(() => React.createRef());
  const navigate = useNavigate();
  const userLogged = localStorage.getItem("userLogged");
  const arrayUser = JSON.parse(userLogged);

  useEffect(() => {
    return () => {
      inputRefs.forEach((ref) => (ref.current = null));
    };
  }, []);

  useEffect(() => {
    checkAccessCode();
  }, [accessCode]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    if (isChecked) {
      setIsModalOpen(true);

      try {
        await sendCode(config);
        console.log("foi");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const checkAccessCode = () => {
    if (accessCode.join("").length === 6) {
      console.log("completo");
      console.log(accessCode.join(""));
      const codigoCompleto = accessCode.join("");
      validarCodigo(codigoCompleto);
    } else if (accessCode[accessCode.length - 1] !== "") {
      setErrorMessage("Código de acesso incorreto.");
    }
  };

  const validarCodigo = async (codigoCompleto) => {
    const accessToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await validateCode(arrayUser.id, codigoCompleto, config);
      console.log(response.data);
      setIsModalOpen(false);
      navigate("/carousel");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={`form-termo-input ${isModalOpen ? "overlay" : ""}`}>
      <div className="form-responsabilidade">
        <form className="form-termo scrollable-content">
          {isModalOpen && <div className="overlay"></div>}
          <label id="term-title" htmlFor="term-title">
            TERMO DE RESPONSABILIDADE
          </label>
          <ol id="term-text">
            <li>
              <p className="iten-title-term">Condição Física e Saúde</p>
              <ol>
                <li>
                  Declaro que estou ciente de que a prática de exercícios
                  físicos envolve riscos inerentes, e afirmo estar em condições
                  físicas adequadas para participar das atividades propostas no
                  Site.
                </li>
                <li>
                  Comprometo-me a informar imediatamente o Site sobre qualquer
                  alteração na minha condição de saúde que possa afetar minha
                  capacidade de realizar os exercícios propostos.
                </li>
              </ol>
            </li>
            <li>
              <p className="iten-title-term">Conhecimento das Instruções</p>
              <ol>
                <li>
                  Reconheço ter recebido e lido todas as instruções fornecidas
                  pelo Site, incluindo vídeos, textos e orientações sobre a
                  execução correta dos exercícios.
                </li>
                <li>
                  Comprometo-me a seguir rigorosamente as instruções fornecidas
                  pelo Site e a realizar os exercícios de forma segura.
                </li>
              </ol>
            </li>
            <li>
              <p className="iten-title-term">Responsabilidade Pessoal</p>
              <ol>
                <li>
                  Entendo que a prática de exercícios físicos online é de minha
                  inteira responsabilidade, e assumo os riscos associados a ela.
                </li>
                <li>
                  Isento o Site, seus colaboradores, instrutores e proprietários
                  de qualquer responsabilidade por lesões, danos, ou outros
                  inconvenientes que possam ocorrer durante ou após a prática de
                  exercícios propostos pelo Site.
                </li>
              </ol>
            </li>

            <li>
              <p className="iten-title-term">Aconselhamento Médico</p>
              <ol>
                <li>
                  Reconheço a importância de buscar a orientação de um
                  profissional de saúde antes de iniciar qualquer programa de
                  exercícios, especialmente se tenho alguma condição médica
                  pré-existente.
                </li>
                <li>
                  Comprometo-me a consultar um profissional de saúde antes de
                  iniciar qualquer programa de exercícios, caso tenha dúvidas
                  sobre minha condição física.
                </li>
              </ol>
            </li>
            <li>
              <p className="iten-title-term">Uso Adequado de Equipamentos</p>
              <ol>
                <li>
                  Comprometo-me a utilizar corretamente qualquer equipamento
                  indicado pelo Site, seguindo as instruções de segurança e
                  manutenção.
                </li>
                <li>
                  Isento o Site de qualquer responsabilidade por danos ou lesões
                  resultantes do uso inadequado de equipamentos.
                </li>
              </ol>
            </li>
            <li>
              <p className="iten-title-term">Menores de Idade</p>
              <ol>
                <li>
                  Caso o praticante seja menor de idade, o responsável legal
                  declara estar ciente dos termos deste documento e assume
                  integralmente a responsabilidade pelos atos do praticante.
                </li>
              </ol>
            </li>
            <li>
              <p className="iten-title-term">Aceitação dos Termos</p>
              <ol>
                <li>
                  Ao utilizar o Site e participar dos programas de exercícios,
                  declaro ter lido, compreendido e aceito todos os termos e
                  condições deste termo de responsabilidade.
                </li>
              </ol>
            </li>
            <label className="accept-term" htmlFor="accept-term">
              <div className="check-accept-term">
                <div className="text-check-term">
                  <input
                    className="check-acc"
                    type="checkbox"
                    id="accept-term"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                  <p className="span-term">Li e concordo com o termo.</p>
                </div>
              </div>
            </label>
          </ol>
        </form>
        <input
          className="bottom-term-submit"
          type="submit"
          value="Submit"
          onClick={handleSubmit}
        />
        <Modal isOpen={isModalOpen} className="modal-responsabilidade">
          <img src="" alt="" />
          <div className="text-input-modal-term">
            <p className="text-modal-term" htmlFor="Texto modal">
              Digite aqui o código de acesso recebido no e-mail cadastrado:
            </p>
            <div className="input-modal-container">
              {accessCode.map((digit, index) => (
                <input
                  className="digitos-email"
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  ref={inputRefs[index]}
                  onChange={(event) => {
                    const newAccessCode = [...accessCode];
                    newAccessCode[index] = event.target.value;
                    setAccessCode(newAccessCode);
                    if (event.target.value && index < accessCode.length - 1) {
                      inputRefs[index + 1].current.focus();
                    }
                    checkAccessCode();
                  }}
                />
              ))}
            </div>
          </div>
          {errorMessage && (
            <p className="error-message" aria-label="mensagem de erro">
              {errorMessage}
            </p>
          )}
        </Modal>
      </div>
    </main>
  );
}

export default FormResponsabilidade;
