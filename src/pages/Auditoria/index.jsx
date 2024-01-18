import React, { useEffect, useState } from 'react';
import "./style.scss";
import { api } from "../../service/api";
import Header from "../../components/Header";
import { Navigate } from "react-router-dom";
import InputForm from "../../components/InputForm/index"
import TabelaHeader from '../../components/TabelaHeader';
import TabelaPaginacao from '../../components/TabelaPaginacao';
import TabelaBody from '../../components/TabelaBody';
import { format } from 'date-fns';

const infoColumns = [
    { id: 'idAuditoria', label: 'ID da Auditoria' },
    { id: 'usuario', label: 'Usuário' },
    { id: 'dataAlteracao', label: 'Data de Alteração' },
    { id: 'movimentacao', label: 'Movimentação' },
    { id: 'entidade', label: 'Entidade' },
    { id: 'vlOriginal', label: 'Valor Original' },
    { id: 'vlAtualizado', label: 'Valor Atualizado' },
];


function Auditoria() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const userLogged = localStorage.getItem("userLogged");
    const acessToken = localStorage.getItem("token");
    const arrayUser = JSON.parse(userLogged);
    const perfilParaVisualizar = arrayUser?.perfis[0].visualizarAuditoria;
    const config = {
        headers: {
            Authorization: `Bearer ${acessToken}`,
        },
    };

    const [buscar, setBuscar] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`auditorias`, config); // 
                const rowsFiltradas = response.data.filter(row => {
                   
                    return (
                        row.idAuditoria.toLowerCase().includes(buscar.toLowerCase()) ||
                        row.usuario.toLowerCase().includes(buscar.toLowerCase()) ||
                        row.movimentacao.toLowerCase().includes(buscar.toLowerCase())||
                        row.entidade.toLowerCase().includes(buscar.toLowerCase())||
                        row.dataAlteracao.toLowerCase().includes(buscar.toLowerCase())
        
                    );
                });
    
                const formattedRows = rowsFiltradas.map(row => ({
                    ...row,
                    dataAlteracao: format(new Date(row.dataAlteracao), 'dd/MM/yyyy HH:mm:ss'),
                }));

                setRows(formattedRows);
                setPage(0);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [buscar]);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
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


    function renderCellContent(value) {
        if (typeof value === 'object') {
            return value.createdAt ? value.createdAt : JSON.stringify(value);
        }

        return value;
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

            <Header greetings={`Olá, ${arrayUser?.nome}`} />

            <div className="container-auditoria">

                <div className="container-buscar">
                    <InputForm text={"Buscar"} type="text" value={buscar} onChange={handleChange} 
                    />
                </div>

                <TabelaBody
                    rows={rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                    infoColumns={infoColumns}
                    renderCellContent={renderCellContent}
                    title01={""}
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

export default Auditoria;