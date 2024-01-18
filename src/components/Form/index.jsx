import React, { useState } from 'react';
import "../Form/style.scss";

function Form() {
    // const [isDisabled, setIsDisabled] = useState(false);
    // const [disabilityType, setDisabilityType] = useState('');
    const [disabilityTypes, setDisabilityTypes] = useState([]);
    const [isYes, setIsYes] = useState(false);
    const [isNo, setIsNo] = useState(false);

    const handleDisabilityTypeChange = (e) => {
        if (e.target.checked) {
            setDisabilityTypes([...disabilityTypes, e.target.value]);
        } else {
            setDisabilityTypes(disabilityTypes.filter(type => type !== e.target.value));
        }
    };

    return (
        <main>
            <section >

                <form
                    className="possui-deficiencia"
                    role="form"
                    tabIndex={0}
                    aria-label="Formulário para saber se existe deficiência.">
                    <label>
                        O colaborador é uma pessoa com deficiência?
                    </label>
                    <label htmlFor='sim'>
                        Sim
                        <input
                            type="checkbox"
                            id="sim"
                            aria-checked={isYes}
                            onChange={(e) => setIsYes(e.target.checked)}
                        />
                    </label>
                    <label htmlFor='não'>
                        Não
                        <input
                            type="checkbox"
                            id="não"
                            aria-checked={isNo}
                            onChange={(e) => setIsNo(e.target.checked)}
                        />
                    </label>
                </form>
                <form
                    className="tipo-deficiencia"
                    role="form"
                    tabIndex={0}
                    aria-label="Tipo de deficiência">
                    <label htmlFor='Tipo de deficiência'>
                        Classifique o tipo de deficiência:
                    </label>

                    <label htmlFor='Tipo 1'>
                        <input
                            type="checkbox"
                            value="tipo1"
                            aria-checked={disabilityTypes.includes('tipo1')}
                            onChange={handleDisabilityTypeChange}
                        />
                        Tipo 1

                    </label>
                    <label htmlFor='Tipo 2'>
                    <input
                        type="checkbox"
                        value="tipo2"
                        aria-checked={disabilityTypes.includes('tipo2')}
                        onChange={handleDisabilityTypeChange}
                    />
                    Tipo 2
                    </label>
                    <label htmlFor='Tipo 3'>
                    <input
                        type="checkbox"
                        value="tipo3"
                        aria-checked={disabilityTypes.includes('tipo3')}
                        onChange={handleDisabilityTypeChange}
                    />
                    Tipo 3
                    </label>
                </form>
            </section>
        </main>
    );
}

export default Form;

