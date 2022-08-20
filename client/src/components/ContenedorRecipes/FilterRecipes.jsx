import React from 'react';
// style
import style from './style/FilterRecipes.module.css'
//redux
import { useSelector } from 'react-redux';
// ico_Search
import ico_search from '../../img/ico_search.png'

function FilterRecipes({ filter }) {

  const diets = useSelector(value => value.diets)

  return (
    <div className={style.nav_center}>

      <div className={style.f_diet}>
        <label >Dieta</label>
        <select id="dietas" className={style.diet_select} name="diet" onChange={(e) => filter(e)}>
          <option value="all">All</option>
          {diets[0] && diets?.map(d => (<option key={d.id} value={d.apodo}>{d.nombre}</option>))}
        </select>
      </div>

      <div className={style.f_alf}>
        <label >Order</label>
        <select id="alfabetico" name="order" onChange={(e) => filter(e)}>
          <option value="all">Default</option>
          <optgroup label="Alphabetical">
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </optgroup>
          <optgroup label="HealtScore">
            <option value="asc">0-100</option>
            <option value="des">100-0</option>
          </optgroup>
          <optgroup label="Likes">
            <option value="asc_l">ASC</option>
            <option value="des_l">DES</option>
          </optgroup>
        </select>
      </div>

      <div className={style.f_name}>
        <label>Search</label>
        <div className={style.div_input_search}>
          <input className={style.input_search} type="text" id="name" name="text" onChange={(e) => filter(e)} placeholder="Busqueda rapida..." />
          <div className={style.ico_search}>
            <img src={ico_search} className={style.ico} alt="search" />
          </div>
        </div>

        {/* <button onClick={()=>cambio()}>Default</button> */}
      </div>
    </div>
  );
}

export default FilterRecipes;