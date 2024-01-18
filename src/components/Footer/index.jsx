import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import "./style.scss";
const Footer = () => {
  return (
    <footer>
      <div className="containerFooter">
      <div className="social-icons">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
      </div>
      <div className="links">
        <a href="/sobre">Sobre</a>
        <a href="/servicos">Serviços</a>
        <a href="/contato">Contato</a>
      </div>
      <div className="contact">
        <p>Fale Conosco</p>
        <a href="mailto:contato@example.com">
          <FaEnvelope /> contato@digitalfit.com
        </a>
      </div>
      </div>

      <div className="copyr">
        <p className="copy">
          &copy; 2023 DigitalFit. Todos os direitos reservados.
        </p>
      </div>

    </footer>
  );
};

export default Footer;