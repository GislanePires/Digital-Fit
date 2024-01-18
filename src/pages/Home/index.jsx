import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import Header from "../../components/Header";
import acess from "../../assets/imgs/accessible_forward.png";
import CardsAnimados from "../../components/CardsAnimados";
import CardHomeOffice from "../../assets/imgs/CardHomeOffice.png";
import CardAlimentação from "../../assets/imgs/CardAlimentação.jpg";
import CardYoga from "../../assets/imgs/CardYoga.png";
import Footer from "../../components/Footer";
import homem from "../../assets/imgs/cadeirante1.png";
import CarrosselInfinito from "../../components/CarrosselInfinito";
import Depoimentos from "../../components/Depoimentos";

const Home = () => {
  const navigate = useNavigate();

  const login = () => {
    navigate("/login");
  };

  const testimonialsData = [
    {
      image:
        "https://media.licdn.com/dms/image/D4D03AQEBYz6ulJz6rQ/profile-displayphoto-shrink_800_800/0/1695773854586?e=1707955200&v=beta&t=T-WVfmKzRARsNjLAnczE_Tuuws4iL5zmcgH0lRLC80k",
      text: "Minha jornada com a digitalFit é verdadeiramente transformadora. Antes, eu lutava para encontrar tempo para malhar, mas agora, com a flexibilidade dos treinos online, consegui incorporar a atividade física de forma consistente na minha rotina. Os resultados falam por si - me sinto mais saudável, mais forte e mais confiante. A digitalFit não é apenas uma academia virtual; é uma parceira de mudança de vida.",
      client: "Dias, Liz.",
    },

    {
      image:
        "https://media.licdn.com/dms/image/D4D03AQE0XvhdGiYTNg/profile-displayphoto-shrink_800_800/0/1684190823632?e=1707955200&v=beta&t=q3YEY1fhI0Nl_37fR8d_xWJv692lHcNwcjHpbpjtmwo",
      text: " Estou completamente apaixonado pela praticidade e eficiência da Digital Fit. Como alguém com uma rotina imprevisível, a capacidade de acessar treinos de alta qualidade a qualquer momento é simplesmente incrível. Os instrutores são motivadores e a diversidade de exercícios mantém cada sessão empolgante. A Digital Fit é a academia virtual que se encaixa perfeitamente no meu dia a dia!",
      client: "Melo, Isabela.",
    },

    {
      image:
        "https://media.licdn.com/dms/image/D5603AQGKQN44FNGpUw/profile-displayphoto-shrink_800_800/0/1692913125012?e=1707955200&v=beta&t=wJJS0uEbx-J0evgMZE8MQMpDDbMmOduqXcpiXQ6R6ZQ",
      text: " Na DigitalFit, meu amor pelo fitness ganha vida, impulsionado pela conveniência e eficácia que essa plataforma excepcional proporciona. Cada treino é uma experiência viciante, guiada por instrutores que fazem meu coração acelerar e meus músculos queimarem, tornando o desafio uma verdadeira alegria.",
      client: "Quintanilha, Filipe.",
    },
    {
      image:
        "https://media.licdn.com/dms/image/D4D03AQG6Z2-_7C0NOQ/profile-displayphoto-shrink_800_800/0/1695919867036?e=1707955200&v=beta&t=pqBUA-eQzs4FTYqGxXpdxF2GbgXWlxUpNqH6AZKloJU",
      text: " Descobrir a Digital Fit foi um verdadeiro divisor de águas na minha jornada fitness. A flexibilidade de poder treinar quando e onde quiser, aliada à qualidade dos treinos e à variedade de opções, tornaram a experiência incrível. Agradeço à Digital Fit por proporcionar uma academia virtual que se adapta ao meu estilo de vida agitado, mantendo-me motivado e em forma.",
      client: "Pires, Gisa.",
    },
    {
      image:
        "https://media.licdn.com/dms/image/D4D03AQEOrfyKsiJppA/profile-displayphoto-shrink_800_800/0/1692115971203?e=1707955200&v=beta&t=RjIfIV3P89_2WasnbrkAOQXyZqJdOxlAJ6xXW1lutg4",
      text: "A conveniência oferecida pela digitalFit é simplesmente incomparável. Posso acessar uma variedade impressionante de treinos de qualquer lugar, a qualquer hora. Essa flexibilidade não apenas se encaixa perfeitamente na minha agenda, mas também eliminou as desculpas para pular os treinos. É como ter um personal trainer na palma da minha mão, sempre pronto para me motivar.",
      client: "Marchiori, Nimai.",
    },

    {
      image:
        "https://media.licdn.com/dms/image/D4D03AQE__ZbnU97n1w/profile-displayphoto-shrink_800_800/0/1696619563457?e=1707955200&v=beta&t=kN5xXKOsoHgLPoE64_XOTXOp7VLpf_P-IZm4nGI_mvg",
      text: " Digital fit é a maior ideia tecnológica que eu já vi. A versatilidade de treinar em qualquer lugar, sem precisar de fato de uma academia física ,e tendo todos os acampamhamentos necessários me motiva diariamente. Com toda certeza é a minha maior e melhor escolha diária.",
      client: "Beatriz, Paula.",
    },

    {
      image:
        "https://media.licdn.com/dms/image/D4D03AQG6XKi_9Z1n5w/profile-displayphoto-shrink_800_800/0/1701054289716?e=1707955200&v=beta&t=F3iQ3qjqh4cyL2o2z9K9-n5L8RAZ_fV6jNYb_Kq7y1I",
      text: " Não consigo mais imaginar minha rotina de exercícios sem a Digital Fit. A liberdade de escolher entre uma variedade de programas de treinamento, combinada com a conveniência de fazer os exercícios em casa, trouxe uma nova dimensão ao meu compromisso com a saúde. Agradeço à Digital Fit por proporcionar uma experiência fitness personalizada e acessível a todos.",
      client: "Aguiar, Eduardo.",
    },

    {
      image:
        "https://media-gig4-1.cdn.whatsapp.net/v/t61.24694-24/319703429_1577547426004008_2499993073330927218_n.jpg?ccb=11-4&oh=01_AdS7MB-o-Q8Mgj36hWbuOvmUO1SCI3nYSbbDyGI-RSt76g&oe=6589CD2C&_nc_sid=e6ed6c&_nc_cat=109",
      text: " A Digital Fit é a revolução que eu precisava para manter meu compromisso com a saúde em dia. Os treinos envolventes e acessíveis tornaram minha jornada fitness mais prazerosa do que nunca. Poder adaptar os exercícios ao meu ritmo e receber orientações valiosas dos instrutores virtuais fez toda a diferença. Estou verdadeiramente grato por ter encontrado uma academia virtual tão completa e motivadora como a Digital Fit.",
      client: "Lucas, Leonardo.",
    },

    {
      image:
        "https://media.licdn.com/dms/image/D4D03AQGc_DDPV4p6tg/profile-displayphoto-shrink_800_800/0/1701967877919?e=1708560000&v=beta&t=EpcBIbdoP7IpcKatGLVr9fJc9MXtTHbyjmObJVxrLhU",
      text: "A monotonia nunca foi um problema desde que me tornei membro da digitalFit. A gama diversificada de treinos disponíveis mantém minha motivação em alta. Seja buscando um treino intenso de cardio, uma sessão de ioga relaxante ou um desafio de levantamento de peso, a digitalFit tem tudo. É uma experiência fitness verdadeiramente personalizada.",
      client: "Pitzer, Joice.",
    },
  ];

  return (
    <>
      <Header imageLeft="45svw" logoutState={false} menuState={false} />

      <section
        className="containerHome"
        aria-label="Tela principal com características da empresa"
      >
        <div className="backgroundHome">
          <div className="topo">
            <button className="login-button" onClick={login}>
              LOGIN
            </button>
            <div className="fundoTopo" aria-label="Banner principal">
              <div className="textosTopo">
                <p className="textoTopo1" aria-label="Texto de apresentação">
                  Para empresas que buscam alternativas para seus funcionários e
                  dependentes praticarem exercícios em casa!
                </p>

                <p className="textoTopo2" aria-label=" Texto de apresentação">
                  Para colaboradores que querem conforto e praticidade na hora
                  de se exercitar! O DigitalFit é para todos{" "}
                  <img className="acess" src={acess} alt="acess" />.
                </p>
              </div>

              {/* <img className="imgHomem" src={homem} alt="homem" /> */}
            </div>
          </div>
        </div>

        <div className="cardsSegundoEscopo">
          <CardsAnimados
            imageSrc={CardHomeOffice}
            title="Alongamento"
            description="O alongamento é essencial para melhorar a flexibilidade e prevenir lesões além de relaxar os músculos e aprimoram a postura."
            buttonText="Saiba Mais"
          />
          <CardsAnimados
            imageSrc={CardAlimentação}
            title="Receitas"
            description="Receitas saudáveis priorizam ingredientes frescos e equilibrados, garantindo nutrientes sem sacrificar o sabor."
            buttonText="Saiba Mais"
          />
          <CardsAnimados
            imageSrc={CardYoga}
            title="Yoga"
            description="O Yoga além de fortalecer e flexibilizar, reduz o estresse, melhora a concentração e promove uma sensação de paz interior."
            buttonText="Saiba Mais"
          />
        </div>

        <div className="background2">
          <div className="topo">
            <div className="fundoTopo" aria-label="Banner principal">
              <div className="textosTopo">
                <p className="textoTopo1" aria-label="Texto de apresentação">
                  Disponibilidade de treinos personalizados e acompanhados pelo
                  Personal Trainer.
                </p>

                <p className="textoTopo2" aria-label=" Texto de apresentação">
                  Acompanhamento nutricional e área de acesso a dicas de vida
                  saudável.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="tituloMarcas">
          <p className="pMarcas">MARCAS PARCEIRAS:</p>
          <CarrosselInfinito />
        </div>

        <div className="depoimentos">
          <Depoimentos testimonials={testimonialsData} />
        </div>

        <Footer />
      </section>
    </>
  );
};

export default Home;
