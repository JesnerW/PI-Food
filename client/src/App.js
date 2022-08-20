import React from "react";
import {Route, Link, Switch} from 'react-router-dom';
// Componentes
import ContainerRecipes from './components/ContenedorRecipes/Container.jsx';
import CreateRecipe from "./components/CreateRecipe/CreateRecipe.jsx";
import PageDetalleRecipe from "./components/PageDetalleRecipe/PageDetalleRecipe.jsx";
// imagenes para el slide
import fondo2 from './img/fondo2.jpg'
import fondo3 from './img/fondo3.jpg'
import fondo4 from './img/fondo4.jpg'
import fondo5 from './img/fondo5.jpg'
import error_image from './img/error.png'
// hoja de estilo
import style from './App.module.css';

function App() {
  return (
    <div className={style.app}>
      <Switch>
        <Route exact path='/'>
          <div className={style.conteiner_app}>
            <div className={style.menu}>
              <h1 className={style.title1}>Welcome to...</h1>
              <h1 className={style.title2}>FOOD <b className={style.extra}>RECIPE</b></h1>
              <Link className={style.boton_menu} to='/home' >Search</Link>    
            </div>
            <div className={style.slider}>
              <ul>
                <li><img alt="imagen-slider" src={fondo3}/></li>
                <li><img alt="imagen-slider" src={fondo4}/></li>
                <li><img alt="imagen-slider" src={fondo5}/></li>
                <li><img alt="imagen-slider" src={fondo2}/></li>
              </ul>
            </div>
          </div>
        </Route>
        <Route exact path='/home' component={ContainerRecipes}/>
        <Route exact path='/recipes/:idReceta' render={({match}) => (<PageDetalleRecipe id={match.params.idReceta}/>)}/>
        <Route exact path='/create' component={CreateRecipe}/>
        <Route path='*'>
          <div className={style.page_error}>
            <div className={style.contenedor_error}>
              <div className={style.datos_error}>
                <h1 className={style.title_error}>FOOD RECIPE</h1>
                <img className={style.error} src={error_image} alt="" />
              </div>
              <Link to='/' className={style.boton_error}>Regresar al Inicio</Link>
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
