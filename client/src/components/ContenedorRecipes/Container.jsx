import React, { useState, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom';
import CardRecipes from './CardRecipes.jsx';
import Pagination from './Pagination.jsx';
import FilterRecipes from './FilterRecipes.jsx';
// style
import style from './style/Container.module.css'
// logo
import logo from '../../img/diet.png'
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes, getDiets, funct_Filter } from '../../redux/actions/index.js'

function Container() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(12);
  const [filter, setFilter] = useState({ diet: "all", order: "all", text: "" });
  // redux
  const dispatch = useDispatch();
  const recipe = useSelector(value => value.recipes);
  // ejectuta para cargar los recipes (dispach)
  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getDiets());
  }, [dispatch])
  // manda los datos al hook recipes
  const actualizar = useCallback(() => {
    setRecipes(recipe);
  }, [recipe])
  // verifica si recipe tiene datos para que le mande al hook recipe e intercambia el estado de Loading cuando recipe ya tenga los datos
  useEffect(() => {
    if (recipe[0]?.id) {
      setLoading(true)
      actualizar();
    }
  }, [recipe, actualizar])
  // actualiza el estado cada vez que hay un evento en los filtros
  useEffect(() => {
    dispatch(funct_Filter(filter));
  }, [dispatch, filter])
  // evento que actualiza el hook que contiene la info del filtro
  function list_filter(e) {
    paginate(1)
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }
  // paginacion y numeracion
  var indexOfLastRecipes = currentPage * recipesPerPage;
  var indexOfFirstRecipes = indexOfLastRecipes - recipesPerPage;
  var currentRecipes = recipes.slice(indexOfFirstRecipes, indexOfLastRecipes);
  // cambio de paginas
  const paginate = pageNumber => setCurrentPage(pageNumber);
  console.log(recipe)
  return (
    <div className={style.contenedor_principal}>
      <div className={style.nav}>
        <div className={style.nav_left}>
          <img src={logo} alt="logo" className={style.logo} />
          <h1 className={style.title}>Search Food Recipe</h1>
        </div>
        <FilterRecipes filter={list_filter} />
        <div className={style.nav_rigth}>
          <Link className={style.boton_create} to='/create' >Crear Receta</Link>
          <Link className={style.boton_create} to='/' >Exit</Link>
        </div>
      </div>
      <Pagination recipesPerPage={recipesPerPage} totalRecipes={recipes.length} paginate={paginate} currentPage={currentPage} />
      <CardRecipes recipes={currentRecipes} loading={loading} />
    </div>
  );
}

export default Container;
