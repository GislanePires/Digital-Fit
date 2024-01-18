import React from 'react';

const TabelaPaginacao = ({ page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, rows }) => (
  <div className="paginacao">
    <div style={{ marginRight: '10px' }}>
      Linhas por página:
      <select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
        {[10, 25, 100].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
    <div>
      Página:
      <button onClick={() => handleChangePage(null, page - 1)} disabled={page === 0}>
        {page}
      </button>
      <span>{page + 1}</span>
      <button onClick={() => handleChangePage(null, page + 1)} disabled={rows.length <= (page + 1) * rowsPerPage}>
        {page + 2}
      </button>
    </div>
  </div>
);

export default TabelaPaginacao;