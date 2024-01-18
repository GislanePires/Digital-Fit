import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./style.css";
import contrastImg from "../../assets/imgs/contrast.png";

export default function Acessibilidade() {
  const { darkThemeIsActive, handleTheme } = useContext(ThemeContext);

  function handleFontSize(updateValue) {
    const selectors = "h1, h2, h3, p, a, span, li, label, input, button";
    const elements = document.querySelectorAll(selectors);
    elements.forEach((element) => {
      const currentSize = window.getComputedStyle(element).fontSize;
      const newSize = parseInt(currentSize) + updateValue;
      element.style.fontSize = `${newSize}px`;
    });
  }

  return (
    <div id="secao-acessibilidade">
      <div id="container-botoes">
        <button
          id="diminuir"
          className="btnAce"
          aria-label="Diminuir tamanho da fonte -A"
          onClick={() => handleFontSize(-1)}
        >
          -A
        </button>

        <button
          className="btnAce"
          aria-label="Aumentar tamanho da fonte +A"
          onClick={() => handleFontSize(+1)}
        >
          +A
        </button>

        <button
          className="btnAceC"
          aria-label="Ativar alto contraste"
          aria-pressed={darkThemeIsActive}
          onClick={handleTheme}
        >
          <img
            id="icone-contraste"
            src={contrastImg}
            alt="Icone de contraste"
          />
        </button>
      </div>
    </div>
  );
}
