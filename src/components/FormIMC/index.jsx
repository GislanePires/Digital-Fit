import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import BaixoPeso from "../../../src/assets/imgs/Abaixo_do_Peso.png";
import Normal from "../../../src/assets/imgs/Peso_Normal.png";
import Sobrepeso from "../../assets/imgs/Acima_do_Peso.png";
import GrauUm from "../../assets/imgs/Obesidade_Grau_I.png";
import GrauDois from "../../assets/imgs/Obesidade_Grau_II.png";
import "./style.scss";
import Button from '../Button';
import InputForm from '../InputForm';

function FormIMC() {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [imc, setImc] = useState(0);
    const classColorImg = 'imagem-imc-selecionada'
    const [baixoPesoOpacity, setBaixoPesoOpacity] = useState(classColorImg);
    const [normalOpacity, setNormalOpacity] = useState(classColorImg);
    const [sobrepesoOpacity, setSobrePesoOpacity] = useState(classColorImg);
    const [grauUmOpacity, setGrauUmOpacity] = useState(classColorImg);
    const [grauDoisOpacity, setGrauDoisOpacity] = useState(classColorImg);

    const limparCampos = () => {
        setPeso('');
        setAltura('');
        setImc(0);
        resetOpacityImages(0);
    }

    function resetOpacityImages(op) {
        setBaixoPesoOpacity('');
        setNormalOpacity('');
        setSobrePesoOpacity('');
        setGrauUmOpacity('');
        setGrauDoisOpacity('');
        if (op === 1) {
            setBaixoPesoOpacity(classColorImg);
        }
        else if (op === 2) {
            setNormalOpacity(classColorImg);
        }
        else if (op === 3) {
            setSobrePesoOpacity(classColorImg);
        }
        else if (op === 4) {
            setGrauUmOpacity(classColorImg);
        }
        else if (op === 5) {
            setGrauDoisOpacity(classColorImg);
        }
        else if (op === 0) {
            setBaixoPesoOpacity(classColorImg);
            setNormalOpacity(classColorImg);
            setSobrePesoOpacity(classColorImg);
            setGrauUmOpacity(classColorImg);
            setGrauDoisOpacity(classColorImg);
        }
    }

    const calcularIMC = () => {
        if (peso === '' || altura === '') {
            return;
        }

        const pesoNumero = Number(peso.replace(',', '.'));
        const alturaNumero = Number(altura.replace(',', '.'));
        const imc = pesoNumero / ((alturaNumero / 100) ** 2);
        setImc(imc);
        // const opcacity = 0.3
        if (imc < 18.5) {
            resetOpacityImages(1);
        } else if (imc >= 18.6 && imc <= 24.9) {
            resetOpacityImages(2);
        } else if (imc >= 25 && imc <= 29.9) {
            resetOpacityImages(3);
        } else if (imc >= 30 && imc <= 39.9) {
            resetOpacityImages(4);
        } else if (imc >= 40) {
            resetOpacityImages(5);
        }
    }

    const handleAlturaChange = (value) => {
        const alturaSemCaracteresNaoNumericos = value.replace(/[^0-9.,]/g, '').replace(',', '.');
        const quantidadePontos = alturaSemCaracteresNaoNumericos.split('.').length - 1;
        const quantidadeVirgulas = alturaSemCaracteresNaoNumericos.split(',').length - 1;
        if (quantidadePontos <= 1 && quantidadeVirgulas <= 1) {
            setAltura(alturaSemCaracteresNaoNumericos);
        }
    };


    const handlePesoChange = (value) => {
        const alturaSemCaracteresNaoNumericos = value.replace(/[^0-9.,]/g, '').replace(',', '.');
        const quantidadePontos = alturaSemCaracteresNaoNumericos.split('.').length - 1;
        const quantidadeVirgulas = alturaSemCaracteresNaoNumericos.split(',').length - 1;
        if (quantidadePontos <= 1 && quantidadeVirgulas <= 1) {
            setPeso(alturaSemCaracteresNaoNumericos);
        }
    };



    return (
        <>
            <div className="container-imc">
                <form className="form-imc">
                    <section className='campos-alturaPeso'>
                        <div className='inputButton'>
                            <InputForm text="Peso (ex: 60 Kg)" type="text" name="peso" value={peso} onChange={e => handlePesoChange(e.target.value)} />
                            <button type="button" className="button button-limpar" onClick={limparCampos}>Limpar <FaArrowRight className="iconLimpar" /></button>
                        </div>
                        <div className='inputButton'>
                            <InputForm text="Estatura (ex: 160 cm)" type="text" name="altura" value={altura} onChange={e => handleAlturaChange(e.target.value)} />
                            <button type="button" className="button button-calcularImc" onClick={calcularIMC}>Calcular <FaArrowRight className="iconImc" /></button>
                        </div>
                    </section>
                    <div className="resultado-imc-form">
                        {imc !== 0 && <label className="resultado-imc" htmlFor="resultado imc">O seu IMC é: <span className="imcDestaque">{imc.toFixed(2)}</span></label>}
                    </div>
                </form>

                <div className="image-resultado-imc">
                    <img src={BaixoPeso} alt="Baixo Peso" className={"imagem-imc" + ' ' + baixoPesoOpacity} />
                    <img src={Normal} alt="Peso Normal" className={"imagem-imc" + ' ' + normalOpacity} />
                    <img src={Sobrepeso} alt="Sobrepeso" className={"imagem-imc" + ' ' + sobrepesoOpacity} />
                    <img src={GrauUm} alt="Grau I de Obesidade" className={"imagem-imc" + ' ' + grauUmOpacity} />
                    <img src={GrauDois} alt="Grau II de Obesidade" className={"imagem-imc" + ' ' + grauDoisOpacity} />
                </div>
            </div>
        </>
    )
}

export default FormIMC;
