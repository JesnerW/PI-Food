import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeByID }from '../../redux/actions/index.js';

//style
import stylo from './DetalleRecipe.module.css'
// imagenes
import portion from '../../img/portion.png'
import watch from '../../img/watch.png'

function DetalleRecipe({id, close}) {
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const data = useSelector(value => value.recipebyid)
  
  useEffect(()=>{
    const actualizar = () => {
      setDetail(data);
      setLoading(true);
    }
    const borrar = () => {
      setDetail({});
      setLoading(false);
    }
    if(data.id !== id){
      borrar();
      dispatch(getRecipeByID(id))
    }else{
      actualizar();
    }
  },[data,id, dispatch])

  return (
    <div className={stylo.main}>
      <div className={stylo.popup}>
          {/* boton cerrar */}
          {/* foto receta */}
          <div className={stylo.contenedor_imagen_recipe}>
            <div className={stylo.imagen_recipe} style={{backgroundImage: 'url('+detail.image+')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover',     backgroundPosition: 'center'}}/>
          </div>
          {/* contenido texto */}
          <div className={stylo.contenido}>
            {/* titulo receta */}
            <h1 className={stylo.name_recipe}>{loading ? detail.title : "Cargando..."}</h1>
            {/* resumen receta */}
            <div className={stylo.summary}>
              <p dangerouslySetInnerHTML={loading ? { __html: detail.summary } : { __html: "Cargando..." }} />
            </div>
            <h1 className={stylo.name_recipe}>{loading ? "Instructions": "Cargando..."}</h1>
            <div className={stylo.instructions}>
              <p dangerouslySetInnerHTML={loading ? { __html: detail.instructions } : { __html: "Cargando..." }} />
            </div>
            <div className={stylo.footer}>
              <div style={{display:'flex'}}>
                <div className={stylo.ico_portions}>
                  <img src={portion} alt="icon-portions" className={stylo.ico_p}/>
                  <p>{detail.servings} Portions</p>
                </div>
                <div className={stylo.ico_readyInMinutes}>
                  <img src={watch} alt="icon-readyInMinutes" className={stylo.ico_r}/>
                  <p>Ready in {detail.readyInMinutes} minutes.</p>
                </div>
              </div>
              <Link target="_blank" to={`/recipes/${id}`} className={stylo.boton_exit}>Mas Detalles</Link>
              <button className={stylo.boton_exit} onClick={()=>close()}>Close</button>
            </div>
          </div>
      </div>
    </div>
  );  
}

export default DetalleRecipe;