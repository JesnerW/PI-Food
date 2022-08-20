import React, { useState } from 'react';
import DetalleRecipe from '../DetalleRecipe/DetalleRecipe.jsx';
import CardSkeleton from './skeleton/CardSkeleton.jsx'
import style from './style/CardRecipes.module.css'

function CardRecipes({ recipes, loading }) {

  const [popup, setPop] = useState(false);
  const [id, setID] = useState("");

  if (!loading) { return <CardSkeleton />  }
  const obtenerID = (id) => { setPop(!popup); setID(id) }

  return (
    <div className={style.contenedor_recipes}>
      {recipes?.map(r => (
        <div className={style.card_recipe} key={r.id} >
          {/* logo heart para el HealtScore */}
          <div className={style.h_score}>
            <img src="https://img.icons8.com/color/96/000000/heart-health.png" alt="ico_health" className={style.ico_score} />
            {r.healthScore}%
          </div>
          {/* contenedor imagen de la receta */}
          <div className={style.contenedor_image_recipe}>
            <img src={r.image} alt={r.title} onClick={() => obtenerID(r.id)} style={{ height: '100%', zIndex: '2' }} />
          </div>
          {/* contenedor titulo de la receta */}
          <div className={style.card_info}>
            <div className={style.title_recipe}>
              {r.title}
            </div>
            {/* contenedor lista de dietas de la receta */}
            <div className={style.diets_recipe}>
              {r.diets[0] && r.diets.map(diet => { return <p className={style.p_list} key={r.id + Math.random()}>»{diet.charAt(0).toUpperCase() + diet.slice(1)}</p> })}
            </div>
          </div>
        </div>
      ))}
      {/* aqui se abre un componente en modo popUp para mostrar mas informacion y el boton para ir a detalles de la receta */}
      {popup && <DetalleRecipe id={id} close={obtenerID} />}
    </div>
  );
}

export default CardRecipes;