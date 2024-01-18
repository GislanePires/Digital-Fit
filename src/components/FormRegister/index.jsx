import React, { useEffect, useState } from "react";
import "./style.scss";
import { api, getPerfis, getTiposDeficiencia } from "../../service/api";
import InputText from "../InputForm";
import CheckBox from "../CheckBox";
import { toast } from "react-toastify";

function FormRegister({ props }) {
  const [podeEditar, setPodeEditar] = useState(false);
  const [buttonName, setButtonName] = useState("Cadastrar");
  const [tipoDeficiencia, setTiposDeficiencia] = useState([]);

  const [employee, setEmployee] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    dataNascimento: "",
    matricula: "",
    senha: "",
    confirmarSenha: "",
    genero: "",
    telefone: "",
    possuiDeficiencia: false,
    tipoDeficiencia: [],
    perfil: "",
  });

  const [message, setMessage] = useState(false);
  const [genderMessage, setGenderMessage] = useState(false);
  const [deficienciaMessage, setDeficienciaMessage] = useState(false);
  const [registerSuccessful, setRegisterSuccessful] = useState(false);
  const [perfis, setPerfis] = useState();

  useEffect(() => {
    if (props.id != null) {
      setPodeEditar(true);

      setEmployee({
        nome: props?.nome,
        sobrenome: props?.sobrenome,
        email: props?.email,
        dataNascimento: props?.dataNascimento.split("T")[0],
        matricula: props?.matricula,
        senha: "",
        confirmarSenha: "",
        genero: props?.genero,
        telefone: props?.telefone,
        possuiDeficiencia: props?.possuiDeficiencia,
        tipoDeficiencia: props?.tipoDeficiencia || "",
        perfil: props?.perfil || "",
      });

      setButtonName("Salvar");
      console.log(props);
    }
  }, [props]);

  useEffect(() => {
    const acessToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${acessToken}`,
      },
    };

    getPerfis(config)
      .then((response) => {
        setPerfis(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getTiposDeficiencia(config)
      .then((response) => {
        setTiposDeficiencia(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSucess = (show) => {
    toast.success("Usuário cadastrado com sucesso", {
      position: "top-right",
      draggable: true,
    });
  };

  const handleGetListaCheckboxChecked = () => {
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    const selectedValues = Array.from(checkboxes).map(
      (checkbox) => checkbox.id
    );

    if (selectedValues.length === 0) {
      // handleShowAlert(true);
      return 0;
    }
    return selectedValues;
  };


  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      const checkedValue = e.target.value;
      setEmployee((prevEmployee) => {
        if (e.target.name === "possuiDeficiencia") {
          return {
            ...prevEmployee,
            [e.target.name]: e.target.checked,
            tipoDeficiencia: e.target.checked ? [] : [],
          };
        } else {
          const currentTipoDeficiencia = prevEmployee.tipoDeficiencia || [];
          const updatedTipoDeficiencia = e.target.checked
            ? [...currentTipoDeficiencia, checkedValue]
            : currentTipoDeficiencia.filter((tipo) => tipo !== checkedValue);
            console.log("Updated tipoDeficiencia:", updatedTipoDeficiencia);
          return {
            ...prevEmployee,
            tipoDeficiencia: updatedTipoDeficiencia,
          };
        }
      });
    } else {
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        [e.target.name]: e.target.value,
      }));
    }
  };

  function formatarDataParaEnvio(data) {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate() + 1).padStart(2, "0");
    const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
    const ano = dataObj.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  function verificaSeTemDeficiencia(id) {
    return props.tipoDeficiencias?.some((tipo) => tipo.id === id);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Dados enviados para a API:", {
            nome: employee.nome,
            sobrenome: employee.sobrenome,
            matricula: employee.matricula,
            email: employee.email,
            telefone: employee.telefone,
            genero: employee.genero,
            tipoDeficiencia: employee.tipoDeficiencia,
            perfis: [employee.perfil],
            dataNascimento: employee.dataNascimento,
          })

    if (employee.genero === "") {
      toast.error("Selecione um genero", {
        position: "top-right",
        draggable: true,
      });
      
      return;
    }

    if (employee.perfil === "") {
      toast.error("Selecione um perfil", {
        position: "top-right",
        draggable: true,
      });
      
      return;
    }

    if (employee.tipoDeficiencia?.length === 0) {
      toast.error("Selecione um tipo de deiciência ou clique em Nenhum", {
        position: "top-right",
        draggable: true,
      });
      
      return;
    }

    if (employee.senha !== employee.confirmarSenha) {
      toast.error("Confirme as senhas", {
        position: "top-right",
        draggable: true,
      });
      
      return;
    } else {
      setMessage(false);
    }

    const dataNascimentoFormatada = formatarDataParaEnvio(
      employee.dataNascimento
    );

    const acessToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${acessToken}`,
      },
    };

    try {
      if (podeEditar) {
        await api.put(
          `usuarios/deficiencia/${props.id}`,
          {
            nome: employee.nome,
            sobrenome: employee.sobrenome,
            matricula: employee.matricula,
            email: employee.email,
            telefone: employee.telefone,
            genero: employee.genero,
            tipoDeficiencia: employee.tipoDeficiencia,
            perfis: [employee.perfil],
            dataNascimento: employee.dataNascimento,
          },
          config
          
        );
      } else {
        await api.post(
          "usuarios",
          {
            nome: employee.nome,
            sobrenome: employee.sobrenome,
            matricula: employee.matricula,
            email: employee.email,
            senha: employee.senha,
            confirmarSenha: employee.confirmarSenha,
            telefone: employee.telefone,
            genero: employee.genero,
            tipoDeficiencia: employee.tipoDeficiencia,
            perfis: [employee.perfil],
            dataNascimento: dataNascimentoFormatada,
          },
          config
        );
      }
      
      setRegisterSuccessful(true);
      setEmployee({
        nome: "",
        sobrenome: "",
        email: "",
        dataNascimento: "",
        matricula: "",
        senha: "",
        confirmarSenha: "",
        genero: "",
        telefone: "",
        possuiDeficiencia: false,
        tipoDeficiencia: [],
      });
    } catch (error) {
      if (error.response.status) {
        alert("Email ou Matrícula já estão em uso!");
      }
    }
  };

  return (
    <form className="form-tela-register" onSubmit={handleSubmit}>
      
      <fieldset>
        <legend>Informações Pessoais</legend>
        <div className="form-registro-container">
          <div className="input-form-registro">
            <InputText
              text="Nome"
              type="text"
              name="nome"
              value={employee.nome}
              onChange={handleChange}
            />
          </div>
          <div className="input-form-registro">
            <InputText
              text="Sobrenome"
              type="text"
              name="sobrenome"
              value={employee.sobrenome}
              onChange={handleChange}
            />
          </div>
          <div className="input-form-registro">
            <InputText
              text="Email"
              type="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
            />
          </div>
          {!podeEditar && (
            <>
              <div className="input-form-registro">
                <InputText
                  text="Confirmar Email"
                  type="email"
                  name="confirmarEmail"
                  value={employee.confirmarEmail}
                  onChange={handleChange}
                />
                {message && (
                  <p className="error-message">Os emails devem ser iguais</p>
                )}
              </div>
            </>
          )}
          <div className="input-form-registro">
            <InputText
              text="Data de Nascimento"
              type="date"
              name="dataNascimento"
              value={employee.dataNascimento}
              onChange={handleChange}
            />
          </div>
          <div className="input-form-registro">
            <InputText
              text="Número de Matrícula"
              type="text"
              name="matricula"
              value={employee.matricula}
              onChange={handleChange}
            />
          </div>
          {!podeEditar && (
            <>
              <div className="input-form-registro">
                <InputText
                  text="Senha"
                  type="password"
                  name="senha"
                  value={employee.senha}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {!podeEditar && (
            <>
              <div className="input-form-registro">
                <InputText
                  text="Confirmar Senha"
                  type="password"
                  name="confirmarSenha"
                  value={employee.confirmarSenha}
                  onChange={handleChange}
                />
                {message && (
                  <p className="error-message">As senhas devem ser iguais</p>
                )}
              </div>
            </>
          )}
          <div className="input-form-registro">
            <InputText
              text="Telefone"
              type="tel"
              name="telefone"
              value={employee.telefone}
              onChange={handleChange}
            />
          </div>
          <div className="input-form-registro">
            <div className="opcoes-perfil">
              <label className="label-select" htmlFor="profiles-select">
                Perfil:
              </label>
              <select
                name="perfil"
                id="profiles-select"
                value={employee.perfil || ""}
                onChange={handleChange}
              >
                <option value="">Escolha um perfil</option>
                {perfis?.map((perfil) => {
                  return (
                    <option key={perfil.id} value={perfil.id}>
                      {perfil.nome}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {!podeEditar && (
            <>
              <div>
                <label htmlFor="genero">Gênero:</label>
                <div className="genero-options">
                  <label htmlFor="masculino">Masculino</label>
                  <input
                    id="masculino"
                    type="radio"
                    name="genero"
                    value="masculino"
                    checked={employee.genero === "masculino"}
                    onChange={handleChange}
                  />

                  <label htmlFor="feminino">Feminino</label>
                  <input
                    id="feminino"
                    type="radio"
                    name="genero"
                    value="feminino"
                    checked={employee.genero === "feminino"}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </fieldset>
      <fieldset className="deficiencia-wrapper">
        <legend>Informações Médicas</legend>
        <label htmlFor="possuiDeficiencia">Possui Deficiência:</label>
        <div className="tipos-deficiencia-container">
          <div className="all-types">
            {tipoDeficiencia?.length > 0 && tipoDeficiencia.map((deficiencia) => (
                <CheckBox
                  id={`tipo${deficiencia.id}`}
                  label={deficiencia.nome}
                  isChecked={
                    Array.isArray(employee.tipoDeficiencia) &&
                    employee.tipoDeficiencia.includes(deficiencia.id)
                  }
                  handleCheckboxChange={handleChange}
                  inputProps={{
                    type: "checkbox",
                    name: "tipoDeficiencia",
                    value: deficiencia.id,
                  }}
                />
            ))}
          </div>
        </div>
      </fieldset>

      <div className="enviar-erro-success">
        <button className="enviar" type="submit">
          {buttonName}
        </button>
        {registerSuccessful && (
          handleSucess(true)
        )}
      </div>
    </form>
  );
}

export default FormRegister;