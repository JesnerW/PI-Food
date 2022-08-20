import React from 'react';
import style from './style/Pagination.module.css'

function Pagination({ recipesPerPage, totalRecipes, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.contenedor_paginacion}>
      <nav>
        {pageNumbers.length > 0 && <>
          <button
            onClick={() => paginate(1)}
            className={style.boton_paginacion}>
            First
          </button>
          <button
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            className={style.boton_paginacion}>
            Prev
          </button>
        </>
        }

        {pageNumbers.map(x => (
          <button
            key={x}
            id={x}
            style={currentPage === x ? { fontWeight: '700', padding: '4px 15px', fontSize: '22px', borderBottom: '3px solid #b9b3b3' } : { color: 'black' }}
            onClick={() => paginate(x)}
            className={style.boton_paginacion}>
            {x}
          </button>
        ))}

        {pageNumbers.length > 0 && <>
          <button
            onClick={() => paginate(currentPage < pageNumbers.length ? currentPage + 1 : pageNumbers.length)}
            className={style.boton_paginacion}>
            Next
          </button>
          <button
            onClick={() => paginate(pageNumbers.length)}
            className={style.boton_paginacion}>
            Last
          </button>
        </>
        }
      </nav>
    </div>
  );
}

export default Pagination;