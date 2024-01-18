import React, { useState } from "react";
import ButtonTabela from "../../components/ButtonTabela";
import "./style.scss";
import TabelaHeader from "../../components/TabelaHeader";

const TabelaBody = ({
  rows,
  infoColumns,
  renderCellContent,
  buttonClick01,
  title01,
  buttonClick02,
  title02,
  altorizacao01,
  altorizacao02,
}) => {
  const [idEditado, setIdEditado] = useState("");

  function handlerBotao1() {}

  return (
    <div className="container-principal-tabela">
      <div className="tabela-corpo-container">
        <TabelaHeader columns={infoColumns} />
        {rows.map((row, rowIndex) => (
          <div className="row-tabela" key={rowIndex}>
            <div className={`custom-row-height`}>
              {infoColumns.map((column, columnIndex, index) => (
                <div
                  key={column.id}
                  className={
                    `${rowIndex % 2 === 0 ? "even-row" : "odd-row"}` +
                    " " +
                    `conteudo  
              ${columnIndex === infoColumns.length - 1 ? "last-conteudo" : ""}
              ${
                column.id === "vlOriginal" || column.id === "vlAtualizado"
                  ? "scrollable-cell"
                  : ""
              } 
              ${
                column.id === "exercicioObjetivo" ||
                column.id === "exercicioTipoDeficiencia" ||
                column.id === "urlImage" ||
                column.id === "urlVideo" ||
                column.id === "descricaoUrlVideo"|| 
                column.id === "descricaoUrlImage"|| 
                column.id === "descricao"|| 
                column.id === "titulo"|| 
                column.id === "subtitulo" ||
                column.id === "nome" ||
                column.id === "description" 
                  ? "scrollable-cell"
                  : ""
              } 
              ${column.id === "vlOriginal" ? "vlOriginal" : ""} 
              ${column.id === "vlAtualizado" ? "vlAtualizado" : ""} 
              ${index === infoColumns.length - 1 ? "last-conteudo" : ""}`
                  }
                >
                  {column.id !== "id"
                    ? column.id
                      ? renderCellContent(row[column.id], column.id)
                      : row[column.id]
                    : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="tabela-div-principal-botoes">
        {rows.map((row, rowIndex) => (
          <div
            className={
              title02 === "" || altorizacao02 === false
                ? "button-table-empty"
                : "button-table"
            }
            key={rowIndex}
          >
            {title01 != "" && altorizacao01 === true && (
              <ButtonTabela
                texto={title01}
                onClick={() =>
                  buttonClick01(title01 === "Liberar" ? row.usuario : row.id)
                }
              />
            )}
            {title02 != "" && altorizacao02 === true && (
              <ButtonTabela
                texto={title02}
                typeColor="secundario"
                onClick={() => buttonClick02(row.id)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabelaBody;
