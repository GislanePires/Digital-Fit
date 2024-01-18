import React, { useEffect, useState } from "react";
import "./style.scss";
import { api } from "../../service/api";
import Header from "../../components/Header";
import { Navigate, useNavigate } from "react-router-dom";
import InputForm from "../../components/InputForm/index";
import TabelaPaginacao from "../../components/TabelaPaginacao";
import TabelaBody from "../../components/TabelaBody";
import ToastNotification from "../../components/ToastNotification";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";

const infoColumns = [
  { id: "nome", label: "Nome" },
  { id: "sobrenome", label: "Sobrenome" },
  { id: "matricula", label: "Numero da matricula" },
  { id: "telefone", label: "Telefone" },
  { id: "email", label: "Email" },
  { id: "dataNascimento", label: "Data de nascimento" },
  {
    id: "liberadoPeloReponsavelTecnico",
    label: "Liberado pelo responsavel tecnico",
  },
  { id: "contaVerificada", label: "Conta verificada" },
  { id: "contaAtiva", label: "Conta ativa" },
  { id: "perfis", label: "Perfis" },
  { id: "tipoDeficiencias", label: "Tipo de deficiencia" },
  { id: "genero", label: "Genero" },
];

function ListarUsuarios() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const userLogged = localStorage.getItem("userLogged");
  const acessToken = localStorage.getItem("token");
  const arrayUser = JSON.parse(userLogged);
  const perfilParaVisualizar = arrayUser?.perfis[0].cadastrarUsuario;
  const perfilParaEditar = arrayUser?.perfis[0].editarUsuario;
  const perfilParaExcluir = arrayUser?.perfis[0].deletarUsuario;
  const config = {
    headers: {
      Authorization: `Bearer ${acessToken}`,
    },
  };

  const [buscar, setBuscar] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await api.get(`usuarios`, config); //

      console.log(buscar);

      const rowsFiltradas = response.data.filter((row) => {
        return (
          row.nome?.toLowerCase().includes(buscar?.toLowerCase()) ||
          row.sobrenome?.toLowerCase().includes(buscar?.toLowerCase()) ||
          row.telefone?.toLowerCase().includes(buscar?.toLowerCase()) ||
          row.email?.toLowerCase().includes(buscar?.toLowerCase()) ||
          row.dataNascimento?.toLowerCase().includes(buscar?.toLowerCase()) ||
          row.genero?.toLowerCase().includes(buscar?.toLowerCase())
        );
      });

      const formattedRows = rowsFiltradas.map((row) => {
        const perfisNomes = row.perfis.map((perfil) => perfil.nome).join(", ");
        const tipoDeficienciasNomes = row.tipoDeficiencias
          .map((tipoDeficiencia) => tipoDeficiencia.nome)
          .join(", ");

        return {
          ...row,
          perfis: perfisNomes,
          tipoDeficiencias: tipoDeficienciasNomes,
          dataNascimento: format(new Date(row.dataNascimento), "dd/MM/yyyy"),
        };
      });

      setRows(formattedRows);
      // console.log(JSON.stringify(response.data))
      setPage(0);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [buscar]);

  const handleSucess = (show) => {
    toast.success("Usuário alterado com sucesso", {
      position: "top-right",
      draggable: true,
    });
  };

  const handleDelete = (show) => {
    toast.success("Usuário deletado com sucesso", {
      position: "top-right",
      draggable: true,
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const alterButtonClick = async (userId) => {
    navigate(`/registro/${userId}`);
  };

  const deleteButtonClick = async (userId) => {
    try {
      await api.delete(`usuarios/${userId}`, config);
      handleSucess(true);
      fetchData();
    } catch (error) {}
    handleDelete(true);
    fetchData();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!userLogged) {
    return <Navigate to="/login" />;
  } else if (!perfilParaVisualizar) {
    return <Navigate to="/carousel" />;
  }

  function renderCellContent(value, columnId) {
    if (typeof value === "object") {
      return value.createdAt ? value.createdAt : JSON.stringify(value);
    } else if (typeof value === "boolean") {
      return value ? "Sim" : "Não";
    }

    return value;
  }

  const handleChange = (event) => {
    setBuscar(event.target.value);
  };

  return (
    <>
      <Header greetings={`Olá, ${arrayUser.nome}`} />

      <div className="container-lista-usuario">
        <ToastNotification />
        <div className="container-buscar">
          <InputForm
            text={"Buscar"}
            type="text"
            value={buscar}
            onChange={handleChange}
          />
        </div>

        <TabelaBody
          rows={rows.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )}
          infoColumns={infoColumns}
          renderCellContent={renderCellContent}
          buttonClick01={alterButtonClick}
          title01={"Alterar"}
          altorizacao01={perfilParaEditar}
          buttonClick02={deleteButtonClick}
          title02={"Deletar"}
          altorizacao02={perfilParaExcluir}
        />

        <TabelaPaginacao
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          rows={rows}
        />
      </div>
    </>
  );
}

export default ListarUsuarios;
