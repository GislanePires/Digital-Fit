import React from 'react';
import "./style.scss";
import InputForm from '../InputForm';
import Button from '../Button';

function FormMedidas({ medidas, onChange, onSubmit }) {
    const {
        altura,
        peso,
        bracoRelaxadoEsquerdo,
        bracoRelaxadoDireito,
        bracoContraidoEsquerdo,
        bracoContraidoDireito,
        coxaEsquerda,
        coxaDireita,
        panturrilhaEsquerda,
        panturrilhaDireita,
        peitoral,
        abdomem,
        cintura,
        quadril,
    } = medidas;

    return (
        <div className="medidas-container">
            <form className="form-page-medidas" onSubmit={onSubmit}>
                <InputForm text="Altura" type="text" name="altura" value={altura} onChange={onChange} />
                <InputForm text="Peso" type="text" name="peso" value={peso} onChange={onChange} />
                <InputForm text="Braço Direito Relaxado" type="text" name="bracoRelaxadoDireito" value={bracoRelaxadoDireito} onChange={onChange} />
                <InputForm text="Braço Esquerdo Relaxado" type="text" name="bracoRelaxadoEsquerdo" value={bracoRelaxadoEsquerdo} onChange={onChange} />
                <InputForm text="Braço Esquerdo Contraído" type="text" name="bracoContraidoEsquerdo" value={bracoContraidoEsquerdo} onChange={onChange} />
                <InputForm text="Braço Direito Contraído " type="text" name="bracoContraidoDireito" value={bracoContraidoDireito} onChange={onChange} />
                <InputForm text="Coxa Esquerda" type="text" name="coxaEsquerda" value={coxaEsquerda} onChange={onChange} />
                <InputForm text="Coxa Direita" type="text" name="coxaDireita" value={coxaDireita} onChange={onChange} />
                <InputForm text="Panturrilha Esquerda" type="text" name="panturrilhaEsquerda" value={panturrilhaEsquerda} onChange={onChange} />
                <InputForm text="Panturrilha Direita" type="text" name="panturrilhaDireita" value={panturrilhaDireita} onChange={onChange} />
                <InputForm text="Peitoral" type="text" name="peitoral" value={peitoral} onChange={onChange} />
                <InputForm text="Abdômem" type="text" name="abdomem" value={abdomem} onChange={onChange} />
                <InputForm text="Cintura" type="text" name="cintura" value={cintura} onChange={onChange} />
                <InputForm text="Quadril" type="text" name="quadril" value={quadril} onChange={onChange} />

                {/* <input className="botao-enviar-medidas" type="submit" value="Enviar" /> */}
            </form>
            <Button texto="Enviar" typeColor="primario" type="submit" aria-label="salvar medidas" onClick={onSubmit} />
        </div>
    );
}

export default FormMedidas;