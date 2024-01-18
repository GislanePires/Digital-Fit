import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./style.scss";
import Header from "./../../components/Header/index";
import PageModel1 from "../../components/PageModel1";
import imgBg1 from "../../assets/imgs/medidas-icon.png";
import imgBg2 from "../../assets/imgs/Treino_info.jpg";
import imgBg4 from "../../assets/imgs/profissionais.jpg";
import iconProf from "../../assets/imgs/icons-profissionais.png";
import ProfileCard from "../../components/ProfileCard";
import MedidasPageInfo from "../../components/MedidasPageInfo";
import ParqInfo from "../../components/ParqInfo";
import { api, deleteUserById, getLaudos, getMedidas } from "../../service/api";
import ModalUpload from "../../components/ModalUpload";
import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
// import CalendarModal from "../../components/CalendarModal"
import Footer from "../../components/Footer";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

const MinhasInfos = () => {
  const navigate = useNavigate();
  const imgbgPosition = "top";
  const imgbg1Position = "right";
  const imgbg2Position = "left";
  const userLogged = localStorage.getItem("userLogged");
  const arrayUser = JSON.parse(userLogged);
  const [medidas, setMedidas] = useState();
  const [imc, setImc] = useState(0);
  const [parq, setParq] = useState();
  const fitaMetrica =
    "https://images.unsplash.com/photo-1523901839036-a3030662f220?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const imgBg =
    "https://images.unsplash.com/photo-1571019613531-fbeaeb790845?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const imgBg3 =
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const parqImage =
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const meuCadastro =
    "https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const Orientacao =
    "https://images.unsplash.com/photo-1533681475364-326b6803d677?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  // const imgBg2 = "https://i.pinimg.com/originals/9f/1c/7d/9f1c7dcb6d4a51a62c83f4a56fef35e4.jpg";

  //Calendário de consultas
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const openCalendar = () => {
    setIsOpen(true);
  };

  const closeCalendar = () => {
    setIsOpen(false);
  };

  const onDateChange = (date) => {
    setSelectedDate(date);
    closeCalendar();
  };
  //foto de perfil

  const handleDelete = () => {
    setImage(null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const [image, setImage] = useState(null);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const acessToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${acessToken}`,
      },
    };

    // Medidas e IMC
    getMedidas(config)
      .then((response) => {
        const userMedidas = response.data.find(
          (user) => user.user === arrayUser.id
        );
        console.log("Medidas do usuário", userMedidas);
        setMedidas(userMedidas);

        const alturaMetros = userMedidas.altura / 100;
        const userImc = userMedidas.peso / (alturaMetros * alturaMetros);
        console.log("imc", userImc.toFixed(2));
        setImc(userImc.toFixed(2));
      })
      .catch((error) => {
        console.log(error);
      });

    // PAR-Q
    getLaudos(config)
      .then((response) => {
        const userLaudo = response.data.find(
          (user) => user.user === arrayUser.id
        );
        const convertedLaudo = {
          coracao: userLaudo?.coracao ? "Sim" : "Não",
          doresNoPeito: userLaudo?.doresNoPeito ? "Sim" : "Não",
          desiquilibrio: userLaudo?.desiquilibrio ? "Sim" : "Não",
          ultimoMes: userLaudo?.ultimoMes ? "Sim" : "Não",
          osseo: userLaudo?.osseo ? "Sim" : "Não",
          pressao: userLaudo?.pressao ? "Sim" : "Não",
          outraRazao: userLaudo?.outraRazao ? "Sim" : "Não",
          assinatura: userLaudo?.assinatura ? "Sim" : "Não",
          id: userLaudo?.id,
          user: userLaudo?.user,
        };

        console.log("Par-Q", convertedLaudo);
        setParq(convertedLaudo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [arrayUser?.id]);

  if (!userLogged) {
    return <Navigate to="/login" />;
  }
  console.log(arrayUser);

  function formatarDataParaExibicao(dataNascimento) {
    const dataObj = new Date(dataNascimento);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); 
    const ano = dataObj.getFullYear();
  
    return `${dia}/${mes}/${ano}`;
  }

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteAccount = async () => {
    const acessToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${acessToken}`,
      },
    };
    
      deleteUserById(arrayUser.id, config).then((response) => {
        console.log(response.data);
        localStorage.removeItem("userLogged");
        localStorage.removeItem("token");
        localStorage.removeItem("laudoUser");
        navigate("/");
      }).catch((error)=>{
        console.log(error)
      })

    closeDeleteModal();
  };

  return (
    <main
      className="principal-page-info"
      aria-label="Página de informações do usuário"
    >
      <Header greetings={`Olá, ${arrayUser.nome}`} />
      <img
        className="img-section-principal"
        src={imgBg}
        alt="Mulher fazendo flexões"
      />
      <div className="cards-info-container">
        <ProfileCard
          className="card"
          image={fitaMetrica}
          alt="Uma fita métrica"
          aria-label="Minhas medidas"
          name="Minhas Medidas"
          buttonText="Vamos lá"
          section="#section-medidas-info"
        />
        <ProfileCard
          className="card"
          image={parqImage}
          alt="Homem escrevendo num papel"
          aria-label="Meu Par-q"
          name="Meu Par-q"
          buttonText="Vamos lá"
          section="#section-parq-info"
        />
        <ProfileCard
          className="card"
          image={meuCadastro}
          alt="Mulher sentada sorrindo numa cafeteria digitando em um notebook"
          aria-label="Meu cadastro"
          name="Meu Cadastro"
          buttonText="Vamos lá"
          section="#section-register-info"
        />
        <ProfileCard
          className="card"
          image={Orientacao}
          alt="Mulher segurando um peso de academia"
          aria-label="Orientação Profissional"
          name="Orientação Profissional"
          buttonText="Vamos lá"
          section="#section-orientacao-info"
        />
      </div>
      <section id="section-medidas-info" className="section-medidas-info">
        <div className="div-text-item-medidas">
          <div className="title-linha-info-medidas">
            <div>
              <h1 className="title-page-info-medidas">Minhas Medidas</h1>
              <hr className="linha-page-info-medidas" />
            </div>

            <MedidasPageInfo>
              <>
                <ol className="minhas-medidas-info">
                  <li className="medida-item">
                    Braco Contraido Direito: {medidas?.bracoContraidoDireito} cm
                  </li>
                  <li className="medida-item">
                    Braco Contraido Esquerdo: {medidas?.bracoContraidoEsquerdo}{" "}
                    cm
                  </li>
                  <li className="medida-item">
                    Braco Relaxado Esquerdo: {medidas?.bracoRelaxadoEsquerdo} cm
                  </li>
                  <li className="medida-item">
                    Braco Relaxado Direito: {medidas?.bracoRelaxadoDireito} cm
                  </li>
                  <li className="medida-item">
                    Cintura: {medidas?.cintura} cm
                  </li>
                  <li className="medida-item">
                    Coxa Direita: {medidas?.coxaDireita} cm
                  </li>
                  <li className="medida-item">
                    Coxa Esquerda: {medidas?.coxaEsquerda} cm
                  </li>
                  <li className="medida-item">
                    Peitoral: {medidas?.peitoral} cm
                  </li>
                  <li className="medida-item">
                    Quadril: {medidas?.quadril} cm
                  </li>
                  <li className="medida-item">
                    Panturrilha Direita: {medidas?.panturrilhaDireita} cm
                  </li>
                  <li className="medida-item">
                    Panturrilha Esquerda: {medidas?.panturrilhaEsquerda} cm
                  </li>
                </ol>

                <div className="minhas-medidas-info-button">
                  <h2 className="texto-imc-medidas-info">Seu IMC é: {imc}</h2>
                </div>
              </>
            </MedidasPageInfo>
          </div>
          <img
            className="img-section-container-imc"
            src={imgBg1}
            alt="Imagem de corpo com fita métrica"
          />
        </div>
      </section>
      <section id="section-parq-info" className="section-parq-info">
        <div className="title-linha-info-parq">
          <h1 className="title-page-info-parq">Meu Par-q</h1>
          <hr className="linha-page-info-parq" />
        </div>
        <img
          className="img-section-parq"
          src={imgBg2}
          alt="Mulher com luvas de boxe"
        />
        <div className="container-title-content-parq">
          <ParqInfo parq={parq} />
        </div>
      </section>

      <section id="section-register-info" className="section-register-info">
        <div className="classe-conteudo-total-register" >
          <div className="perfil-foto-info">
            <input
              id="file"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              tabIndex="0"
              className="input-foto-perfil-info"
            />
            {image && (
              <img
                src={image}
                className="image-perfil-page-info"
                alt="Foto de perfil"
              />
            )}
            <div className="buttons-foto-perfil">
              <button
                className="button-delete"
                onClick={handleDelete}
                tabIndex="0"
              >
                Deletar
              </button>
            </div>
            <div className="modal-fotos">
              <button className="button-upload-register" onClick={toggleModal} tabIndex="0">Minhas Imagens</button>
            </div>
            <ModalUpload isOpen={isModalOpen} onClose={toggleModal} />
          </div>
          <div className="classe-conteudo-register">
            <div className="title-linha-info-register">
              <h1 className="title-page-info-register">Meu Cadastro</h1>
              <hr className="linha-page-info-register" />
            </div>
            <ul className="container-content-register">
              <li className="register-result-item">
                Matrícula: {arrayUser.matricula}
              </li>
              <li className="register-result-item">Nome: {arrayUser.nome}</li>
              <li className="register-result-item">Sobrenome: {arrayUser.sobrenome}</li>
              <li className="register-result-item">Data de Nacimento: {formatarDataParaExibicao(arrayUser.dataNascimento)}</li>
              <li className="register-result-item">Gênero: {arrayUser.genero}</li>
              <li className="register-result-item">E-mail: {arrayUser.email}</li>
              <li className="register-result-item">Telefone: {arrayUser.telefone}</li>
              <button className="deletar-conta" onClick={openDeleteModal}>
                Deletar minha conta
              </button>

            </ul>
          </div>
        </div>
        <div className="div-image-register">
          <img
            className="img-section-register"
            src={imgBg3}
            alt="Mulher digitando em notebook"
          />
        </div>
        {/* </PageModel1> */}
      </section>
      <section id="section-orientacao-info" className="section-orientacao-info">
        <img
          className="img-section-orientacao"
          src={imgBg4}
          alt="Homem e mulher com roupas esportivas"
        />
        <div className="div-title-items-orientacao">
          <div className="title-linha-info-orientacao">
            <h1 className="title-page-info-orientacao">
              Orientação Profissional
            </h1>
            <hr className="linha-page-info-orientacao" />
          </div>
          <div className="container-title-content-orientacao">
            <div className="nutricionista-text-atendimento">
              <div className="nutricionista-text">
                <label className="nutri-tittle">Nutricionista</label>
                <p className="nutri-paragrafo1">
                  Comece a comer comida de verdade! Com poucas mudanças você vai
                  perceber quanto dá para melhorar sua saúde comendo muito
                  melhor e tendo experiências de sabor incríveis.
                </p>
                <p className="nutri-paragrafo2">
                  Não tem segredo não, marque uma consulta agora que vou te
                  ajudar com isso.
                </p>
             
              {/* <div className="nutri-horario"> */}
                {/* <label>Atendimentos</label> */}
                <div className="div-calendar">
                  <button className="calendar-button" onClick={openCalendar}>
                    Agende uma consulta
                  </button>
                  {isOpen && (
                    <div className="calendar-container">
                      <Calendar
                        className="my-custom-calendar"
                        onChange={setSelectedDate}
                        value={selectedDate}
                        minDate={new Date()}
                      />
                      <button
                        className="calendar-close-button"
                        onClick={closeCalendar}
                      >
                        Fechar
                      </button>
                    </div>
                  )}
                </div>
                </div>
              {/* </div> */}
            </div>
            <div className="personal-text">
              <div className="div-orientacao">
                <img
                  className="img-orientacao"
                  src={iconProf}
                  alt="Imagem de corpo com fita métrica"
                />
              </div>
              <div className="div-personal">
                <label className="personal-tittle">Personal Trainner</label>
                <p className="personal-paragrafo3">
                  Pronto para começar seu novo estilo de vida saudável?
                </p>
                <p className="personal-paragrafo1">
                  Solicite treinamento pessoal
                </p>
                <p className="personal-paragrafo3">
                  Entre em contato conosco pelo e-mail do nosso suporte!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDeleteAccount}
      />
      <Footer />
    </main>
  );
};

export default MinhasInfos;
