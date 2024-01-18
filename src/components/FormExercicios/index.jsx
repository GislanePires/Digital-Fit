import React, { useEffect, useState } from "react";
import "./style.scss";
import {
  getObjetivos,
  getTiposDeficiencia,
  postExercicio,
  atualizarExercicio,
  getExercicioById,
} from "../../service/api";

const FormExercicios = ({ exercicioId }) => {
  const [tiposDeficiencia, setTiposDeficiencia] = useState();
  const [objetivos, setObjetivos] = useState();
  const [formData, setFormData] = useState({
    titulo: "",
    subtitulo: "",
    descricao: "",
    objetivos: [],
    tipoDeficiencia: [],
    urlVideo: "",
    descricaoUrlVideo: "",
    urlImage: "",
    descricaoUrlImage: "",
  });

  useEffect(() => {
    const acessToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${acessToken}`,
      },
    };

    // Carregar tipos de deficiência e objetivos
    getTiposDeficiencia(config)
      .then((response) => {
        setTiposDeficiencia(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    getObjetivos(config)
      .then((response) => {
        setObjetivos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Carregar dados do exercício se estiver sendo editado
    if (exercicioId) {
      getExercicioById(exercicioId, config)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [exercicioId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [field]: checked
        ? [...prevData[field], value]
        : prevData[field].filter((item) => item !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.objetivos?.length === 0) {
      alert("Selecione pelo menos um objetivo.");
      return;
    }

    if (formData.tipoDeficiencia?.length === 0) {
      alert("Selecione pelo menos um tipo de deficiência.");
      return;
    }

    const acessToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${acessToken}`,
      },
    };

    if (exercicioId) {
      atualizarExercicio(exercicioId, formData, config)
        .then((response) => {
          console.log(response.data);
          setFormData({
            titulo: "",
            subtitulo: "",
            descricao: "",
            objetivos: [],
            tipoDeficiencia: [],
            urlVideo: "",
            descricaoUrlVideo: "",
            urlImage: "",
            descricaoUrlImage: "",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      postExercicio(formData, config)
        .then((response) => {
          console.log(response.data);
          setFormData({
            titulo: "",
            subtitulo: "",
            descricao: "",
            objetivos: [],
            tipoDeficiencia: [],
            urlVideo: "",
            descricaoUrlVideo: "",
            urlImage: "",
            descricaoUrlImage: "",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <section className="containerFormExercicio">
      <form onSubmit={handleSubmit}>
        <section className="primeiroEscopo">
          <div className="primeiraDiv">
            <div className="inputContainerPE">
              <label className="labelPrimeiroEscopo">
                Título:
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="inputContainerPE">
              <label className="labelPrimeiroEscopo">
                Subtítulo:
                <input
                  type="text"
                  name="subtitulo"
                  value={formData.subtitulo}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="inputContainerPE">
              <label className="labelPrimeiroEscopo">
                URL do Vídeo:
                <input
                  type="text"
                  name="urlVideo"
                  value={formData.urlVideo}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          </div>

          <div className="segundaDiv">
            <div className="inputContainerPE">
              <label className="labelPrimeiroEscopo">
                Descrição do Vídeo:
                <input
                  type="text"
                  name="descricaoUrlVideo"
                  value={formData.descricaoUrlVideo}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="inputContainerPE">
              <label className="labelPrimeiroEscopo">
                URL da Imagem:
                <input
                  type="text"
                  name="urlImage"
                  value={formData.urlImage}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="inputContainerPE">
              <label className="labelPrimeiroEscopo">
                Descrição da Imagem:
                <input
                  type="text"
                  name="descricaoUrlImage"
                  value={formData.descricaoUrlImage}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          </div>
          <div className="terceiraDiv">
            <div className="inputContainerPE">
              <label className="labelPrimeiroEscopo">
                Descrição:
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          </div>
        </section>
        {!exercicioId && (
          <div>
            <div className="formExerciciosObjetivos">
              <label className="escopoObjetivos">
                <h5 className="h5tile">Objetivos:</h5>

                <div>
                  {objetivos?.map((objetivo) => (
                    <label key={objetivo.id}>
                      <input
                        type="checkbox"
                        className="inputFormExercicios"
                        name={objetivo.nome}
                        value={objetivo.id}
                        checked={formData.objetivos?.includes(objetivo.id)}
                        onChange={(e) => handleCheckboxChange(e, "objetivos")}
                      />
                      {objetivo.nome}
                    </label>
                  ))}
                </div>
              </label>
            </div>
            <div className="formExerciciosTipoDeDeficiencia">
              <label className="escopoTipoDeDeficiencia">
                <h5 className="h5tile"> Tipo de Deficiência:</h5>
                <div>
                  {tiposDeficiencia?.map((deficiencia) => (
                    <label key={deficiencia.id}>
                      <input
                        type="checkbox"
                        className="inputFormExercicios"
                        name={deficiencia.nome}
                        value={deficiencia.id}
                        checked={formData.tipoDeficiencia?.includes(
                          deficiencia.id
                        )}
                        onChange={(e) =>
                          handleCheckboxChange(e, "tipoDeficiencia")
                        }
                      />
                      {deficiencia.nome}
                    </label>
                  ))}
                </div>
              </label>
            </div>
          </div>
        )}
      
        <button className="botaoCE" type="submit">Enviar</button>
      
      </form>
    </section>
  );
};

export default FormExercicios;
