import React, { useEffect } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeByID } from '../../redux/actions/index.js'
// style
import style from './PageDetalleRecipe.module.css'
// logos
import logo from '../../img/diet.png';

function PageDetalleRecipe({id}) {
  // const recipe = valorPrincipal length > 1
  const dispatch = useDispatch();
  const recipe = useSelector(value => value.recipebyid)
  useEffect(()=>{
    dispatch(getRecipeByID(id))
  },[dispatch, id])


  return ( 
    <div className={style.contenedor_principal}>
      <div className={style.nav}>
        <div className={style.nav_left}>
          <img src={logo} alt="logo" className={style.logo}/>
          <h1 className={style.title}>Food Recipe Detail</h1>
        </div>
      </div>
      <div className={style.contenedor_detail}>                
        {recipe.error && 
          <div className={style.title_detail}>
            El ID no concuerda con ninguna receta ó la receta no existe.
            <p>ID ingresado: {id}</p>{/* Nombre de la receta */}            
          </div>
        }
        {recipe.title && 
          <div className={style.title_detail}>
            {recipe.title}{/* Nombre de la receta */}          
            <img src={recipe.image} alt={recipe.title} />{/* Imagen de la receta */}
          </div>
        }
        {recipe.summary && 
          <div className={style.resumen}>
            {/* resumen de la receta */}
            <h2>Resumen</h2>
            <p>{recipe.summary}</p>
          </div>
        }
        {recipe.aggregateLikes && 
          <div>
            {/* Likes, popularidad de la receta */}
            <h2>Popularidad</h2>
            <p>👍 Likes {recipe.aggregateLikes}</p>
          </div>
        }
        {recipe.diets?.length > 0 && 
          <div>
            {/* Lista, tipo de dieta */}
            <h2>Dietas</h2>
              {recipe.diets?.map(data => (
                <p key={recipe.diets?.indexOf(data)}>
                  ✅{data.charAt(0).toUpperCase() + data.slice(1)}
                </p>))}
          </div>
        }
        {recipe.dishTypes?.length > 0 &&
          <div>
            {/* Lista, tipo de plato */}
            <h2>Tipo de Plato</h2>
              {recipe.dishTypes?.map(data => (
                <p key={recipe.dishTypes?.indexOf(data)}>
                  🍴 {data.charAt(0).toUpperCase() + data.slice(1)}
                </p>))}
          </div>
        }
        {recipe.cuisines?.length > 0 && 
          <div>
            {/* Lista, tipo de comida */}
            <h2>Tipo de Comida</h2>
              {recipe.cuisines?.map(data => (
                <p key={recipe.cuisines?.indexOf(data)}>
                  👩‍🍳{data.charAt(0).toUpperCase() + data.slice(1)}
                </p>))}
          </div>
        }
        {recipe.healthScore && 
          <div>
            {/* puntuacion Saludable */}
            <h2>Puntuacion Saludable</h2>
            <p>💗 {recipe.healthScore} %</p>
          </div>
        }
        {recipe.servings && 
          <div>
            {/* Numero de porciones */}
            <h2>Porciones</h2>
            <p>🍛 {recipe.servings} Porciones</p>
          </div>
        }      
        {recipe.readyInMinutes && 
          <div>
            {/* Tiempo de coccion */}
            <h2>Lista en minutos</h2>
            <p>⏰ {recipe.readyInMinutes} Minutos</p>
          </div>
        }
        {recipe.listIngred?.length > 0 && 
          <div className={style.list_ingred}>
            {/* Lista de Ingredientes */}
            <h2>Ingredientes</h2>
              <div className={style.content_card}>
                {recipe.listIngred?.map(data => data.image !== "" && (
                <div key={data.id} className={style.card_ingred}>
                  {data.name.charAt(0).toUpperCase() + data.name.slice(1)} 
                  <img src={`https://spoonacular.com/cdn/ingredients_100x100/${data.image}`} alt={data.name} />
                </div>))}
              </div>
          </div>
        }
        {recipe.listEquip?.length > 0 && 
          <div className={style.list_ingred}>
            {/* Lista de equipo de cocina */}
            <h2>Equipo de cocina</h2>
              <div className={style.content_card}>
                {recipe.listEquip?.map(data => data.image !== "" && (
                  <div key={data.id} className={style.card_ingred}>
                    {data.name.charAt(0).toUpperCase() + data.name.slice(1)} 
                    <img src={`https://spoonacular.com/cdn/equipment_100x100/${data.image}`} alt={data.name} />
                  </div>))}
              </div>
          </div>
        }
        {recipe.analyzedInstructions?.length > 0 ?  
          <div>
            {/* Instrucciones */}
            <h2>Instrucciones</h2>
              {recipe.analyzedInstructions?.map(data => (
              <p key={recipe.analyzedInstructions.indexOf(data)}>
                ◾ {data}
              </p>)) }          
          </div>
          : recipe.instructions && 
          <div>
            {/* Instrucciones */}
            <h2>Instrucciones</h2>
            <p>{recipe.instructions}</p>
          </div>
        }
        {recipe.sourceUrl && 
          <div className={style.fuente_externa}>
            <h2>Fuente original</h2>
            <a href={recipe.sourceUrl} target="_blank" rel="noreferrer noopener">Click aqui para ver la fuente original</a>
          </div>
        }
      </div>
    </div>
  );
};

export default PageDetalleRecipe;