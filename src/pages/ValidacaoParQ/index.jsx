import React, { useEffect, useState } from 'react';
import "./style.scss";
import { api } from "../../service/api";
import Header from "../../components/Header";
import { Navigate } from "react-router-dom";
import InputForm from "../../components/InputForm/index"
import { format } from 'date-fns';
import ButtonTabela from '../../components/ButtonTabela';
import ToastNotification from '../../components/ToastNotification';
import { toast } from "react-toastify";
import TabelaHeader from '../../components/TabelaHeader';
import TabelaPaginacao from '../../components/TabelaPaginacao';
import TabelaBody from '../../components/TabelaBody';


const infoColumns = [
    { id: 'createdAt', label: 'Data do Laudo' },
    { id: 'usuario', label: 'Usuário' },
    { id: 'coracao', label: 'Problema de coração' },
    { id: 'doresNoPeito', label: 'Dores no peito' },
    { id: 'desiquilibrio', label: 'Desiquilibrio ou perda de Consciência' },
    { id: 'ultimoMes', label: 'Alguma dor no peito no ultmo Mês' },
    { id: 'osseo', label: 'Algum problema ósseo ou articular' },
    { id: 'pressao', label: 'Toma medicamento para pressão' },
    { id: 'outraRazao', label: 'Alguma outra razão' },
];


function ValidacaoParQ() {
    const [buscar, setBuscar] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const userLogged = localStorage.getItem("userLogged");
    const acessToken = localStorage.getItem("token");
    const arrayUser = JSON.parse(userLogged);
    const perfilParaVisualizar = arrayUser?.perfis[0].editarLaudo;
    const perfilParaValidar = arrayUser?.perfis[0].editarUsuario;
    const config = {
        headers: {
            Authorization: `Bearer ${acessToken}`,
        },
    };


    const fetchData = async () => {
        try {
            const response = await api.get(`usuario/laudo/parq-pendente`, config);

            const rowsFiltradas = response.data.filter(row => {
                return (
                    row.createdAt.toLowerCase().includes(buscar.toLowerCase()) ||
                    row.usuario.toLowerCase().includes(buscar.toLowerCase())
                );
            });
            const formattedRows = rowsFiltradas.map(row => ({
                ...row,
                createdAt: format(new Date(row.createdAt), 'dd/MM/yyyy HH:mm:ss'),
            }));

            setRows(formattedRows);
            setPage(0);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [buscar]);

    const handleSucess = (show) => {
        toast.success("Usuário liberado com sucesso", {
            position: "top-right",
            draggable: true,
        });
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const releaseButtonClick = async (userId) => {
        try {
            const updateData = {
                "liberadoPeloReponsavelTecnico": true
            };

            await api.put(`usuarios/${userId}`, updateData, config);

        } catch (error) {

        }
        handleSucess(true);
        fetchData();
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (!userLogged) {
        return <Navigate to="/login" />;
    }else if (!perfilParaVisualizar) {
        return <Navigate to="/carousel" />;
    } 
  


    function renderCellContent(value, columnId) {

        if (typeof value === 'object') {

            return value.createdAt ? value.createdAt : JSON.stringify(value);
        } else if (typeof value === 'boolean') {

            return value ? 'Sim' : 'Não';
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
                    <InputForm text={"Buscar"} type="text" value={buscar} onChange={handleChange}
                    />
                </div>

                <TabelaBody
                    rows={rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                    infoColumns={infoColumns}
                    renderCellContent={renderCellContent}
                    title01={"Liberar"}
                    altorizacao01={perfilParaValidar}
                    buttonClick01={releaseButtonClick}
                    title02={""}
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

export default ValidacaoParQ;