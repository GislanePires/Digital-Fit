import React, { useState } from "react";
import axios from "axios";
import Botao from "../Button";
import "./style.scss";

const Gpt = () => {
    const [pergunta, setPergunta] = useState("");
    const [resposta, setResposta] = useState("");
    const GPT_API_KEY = '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';
    const pre_pergunta = "Atue como você é um renomado chef de cozinha, você também possui doutorado em nutrição. Eu vou te passar alguns ingredientes que tenho em casa, e você precisará elaborar uma receita saborosa, saudável e fácil de fazer com os ingredientes que eu informar. Você pode usar todos os ingredientes que eu informar ou apenas alguns, você decide. Os ingredientes que tenho em casa e você precisará usar para a preparação são:\n\n";

    const handlePrepararClick = async () => {
        try {
            const respostaAPI = await obterRespostaDoChatGPT(pre_pergunta + pergunta);
            // const respostaAPI = "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.";

            const textoPadrao = '';
            const respostaFinal = textoPadrao + respostaAPI;
            setResposta(respostaFinal);
        } catch (error) {
            console.error("Erro ao obter resposta do ChatGPT:", error);
        }
    };

    const obterRespostaDoChatGPT = async (pergunta) => {
        try {
            const resposta = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "Atue como um chef de cozinha renomado, com vários restaurantes ao redor do mundo. Você é famoso por elaborar preparações saudáveis e gostosas." },
                        { role: "user", content: pergunta },
                    ],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + GPT_API_KEY
                    },
                }
            );
            
            if (resposta && resposta.data && resposta.data.choices && resposta.data.choices.length > 0) {
                const mensagem = resposta.data.choices[0].message;

                // Verificar se a mensagem é válida
                if (mensagem && mensagem.content) {
                    console.log(mensagem.content);
                    return mensagem.content;
                } else {
                    throw new Error("A mensagem da resposta não contém conteúdo válido.");
                }
            } else {
                throw new Error("A resposta não contém escolhas válidas.");
            }
        } catch (error) {
            throw new Error("Erro ao obter resposta do ChatGPT: " + error.message);
        }
    };

    return (
        <>
            <div className="gpt">
                <div className="container-gpt">
                    <div className="gpt-left-column">
                        <div className="gpt-container-text-pergunta">
                            <textarea
                            placeholder="Informe os ingredientes que você possui em casa:"
                                id="gpt-pergunta"
                                value={pergunta}
                                onChange={(e) => setPergunta(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="gpt-right-column">
                        <div className="gpt-container-text">
                        <textarea id="gpt-response" value={resposta} placeholder="Sua receita aparecerá aqui:" readOnly />
                        </div>
                    </div>
                </div>            
                <div className="botao">
                <button className="botaoPreparar" onClick={handlePrepararClick}>Preparar</button>
                    {/* <Botao texto="Preparar" onClick={handlePrepararClick} typeColor="primaria" /> */}
                </div>
            </div>
        </>
    );
};

export default Gpt;
