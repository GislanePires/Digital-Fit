import React from 'react';
import "./style.scss";

function TabelaHeader({ columns }) {
  return (
    <div className="cabecalho">
      {columns.map((column, index) => (
        <div key={column.id}
          className={`containerCabecalho ${index === 0 ? 'first-column' : ''}
              ${index === columns.length - 1 ? 'last-column' : ''}
              
              ${index > 0 && index < columns.length - 1 ? 'middle-column' : ''}`}>
          {column.label}
        </div>
      ))}
    </div>
  );
}

export default TabelaHeader;