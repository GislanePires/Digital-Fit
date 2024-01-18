import React, { useEffect, useState } from "react";
import "./style.scss";
import { api, getObjetivos } from "../../service/api";
import Header from "../../components/Header";
import { Navigate, useNavigate } from "react-router-dom";
import InputForm from "../../components/InputForm/index";
import ToastNotification from "../../components/ToastNotification";
import { toast } from "react-toastify";
import TabelaPaginacao from "../../components/TabelaPaginacao";
import TabelaBody from "../../components/TabelaBody";

const infoColumns = [
  { id: "nome", label: "Nome do objetivo" },
  { id: "description", label: "Descrição" },
];

function ListarObjetivos() {
  const [buscar, setBuscar] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const userLogged = localStorage.getItem("userLogged");
  const acessToken = localStorage.getItem("token");
  const arrayUser = JSON.parse(userLogged);
  const perfilParaVisualizar = arrayUser?.perfis[0].editarLaudo;
  const perfilParaValidar = arrayUser?.perfis[0].editarUsuario;
  const cadastrarObjetivo = arrayUser?.perfis[0].cadastrarObjetivo;

  const config = {
    headers: {
      Authorization: `Bearer ${acessToken}`,
    },
  };
  const perfilParaExcluir = arrayUser?.perfis[0].deletarObjetivo;
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await getObjetivos(config);
      console.log(response.data);

      const rowsFiltradas = response.data.filter((row) => {
        return (
          row.nome.toLowerCase().includes(buscar.toLowerCase()) ||
          row.description.toLowerCase().includes(buscar.toLowerCase())
        );
      });
      setRows(rowsFiltradas);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSucess = (show) => {
    toast.success("Objetivo Deletado com sucesso", {
        position: "top-right",
        draggable: true,
      });
  };

  const handleError = (show) => {
    toast.error("Existem exercícios vinculados a esse objetivo, exclua esses exercícios primeiro se deseja mesmo excluí-lo", {
        position: "top-right",
        draggable: true,
      });
  };

  const releaseButtonClick = async (objetivoId) => {
    navigate(`/crud-objetivo/${objetivoId}`);
  };

  const deleteButtonClick = async(objetivoId) => {
    try {
        await  api.delete(`objetivo/${objetivoId}`, config);
        handleSucess(true);
        fetchData();
      } catch (error) {
        handleError(true)
        console.log(error)
      }
      fetchData();
};


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!userLogged) {
    return <Navigate to="/login" />;
  } else if (!cadastrarObjetivo) {
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

      <div className="container-parq">
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
          title01={"Editar"}
          altorizacao01={perfilParaValidar}
          buttonClick01={releaseButtonClick}
          title02={"Deletar"}
          buttonClick02={deleteButtonClick}
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

export default ListarObjetivos;
