import React from "react";
import "./style.scss";

function RadioButton() {
    return (
        <>
            <div class="radio-button-container">
                <form>
                    <label>
                        <input type="radio" name="radio" checked />
                        <span>Masculino</span>
                    </label>
                    <label>
                        <input type="radio" name="radio" />
                        <span>Feminino</span>
                    </label>
                </form>
            </div>
        </>
    );
};

export default RadioButton;