import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from "./CreateRecipe.module.css";

//redux
import { useDispatch, useSelector } from 'react-redux';
import { getDiets, postRecipe }from '../../redux/actions/index.js';
//logo
import logo from '../../img/diet.png';
import ico from '../../img/icons8-ok.svg';

function CreateRecipe() {
  // hook para crear Receta y listar la seleccion de dietas
  const [createRecipe, setcreateRecipe] = useState({title: "",image: "", summary: "", healthScore: "", servings: "", readyInMinutes: "", instructions: "", diets: []});
  
  const dispatch=useDispatch();
  const diet = useSelector(value => value.diets)
  var respuesta = useSelector(value => value.lastCreate)
  useEffect(()=>{    
    dispatch(getDiets())
  },[dispatch])

  useEffect(()=>{
    if(createRecipe.title === "" || createRecipe.image === "" || 
       createRecipe.summary === "" || createRecipe.healthScore === "" || 
       createRecipe.instructions === "" || createRecipe.diets.length === 0){
       document.querySelector("#submit").disabled = true
    } else{
      if(createRecipe.title.includes("<" || ">") || createRecipe.image.includes("<" || ">") || 
         createRecipe.summary.includes("<" || ">") || createRecipe.healthScore > 100 || 
         createRecipe.instructions.includes("<" || ">")){
        document.querySelector("#submit").disabled = true
      }else{
        document.querySelector("#submit").removeAttribute("disabled");
      }
    }
  },[createRecipe])

  const preGuardado = (e) => {    
    if(e.target.name==="diets"){
      let idDiet = e.target.value;
      if(createRecipe.diets.some(id => id === idDiet)){
      setcreateRecipe({...createRecipe, diets: createRecipe.diets.filter(x => x !== idDiet)})
      }else{
        setcreateRecipe({...createRecipe, diets: [...createRecipe.diets, idDiet]})
      }
    }else{
      setcreateRecipe({...createRecipe, [e.target.name]: e.target.value, });
    }
  }
  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(postRecipe(createRecipe))
  }
  return ( 
    <div className={style.contenedor_principal}>
      
      {/* popup /cartelito/ indicando que la receta fue agregada con exito [boton para crear otro ó salir] */}
      {respuesta.status ?
      <div className={style.contenedor_alert}>
        <div className={style.alert}>
          {<img src={ico} alt="" />}
          <p>Receta creada correctamente</p>
          <div className={style.action_alert}>
            <Link to='/create' className={style.boton_alert} onClick={() => window.location.reload()}>Crear otro</Link>
            <Link to='/home' className={style.boton_alert}>Salir</Link>
          </div>
        </div>
      </div>:null}

      {/* barra superior con logo */}
      <div className={style.nav}>
        <div className={style.nav_left}>
          <img src={logo} alt="logo" className={style.logo}/>
          <h1 className={style.title}>Create Food Recipe</h1>
        </div>
        <div className={style.nav_rigth}>
          <Link className={style.boton} to='/home' >Exit</Link> 
        </div>
      </div>

      {/* contenedor de todo el formulario */}
      <div className={style.contenedor_formulario}>
        <form className={style.formulario} onSubmit={formSubmit}>
          <div className={style.inputs}>
            <label>Title of recipe*</label>
            <input 
              type='text' 
              name="title" 
              pattern="[a-zA-Z0-9\u00C0-\u017F ]+$" 
              title="Only letters or numbers are allowed"
              placeholder='Write a title...' 
              onChange={preGuardado}
            />
          </div>
          <div className={style.inputs}>
            <label>Photo of recipe {'('}URL{')'}*</label>
            <input 
              type='URL' 
              name="image" 
              pattern="https?://.+" title="Include http://"
              placeholder='Paste image address (URL)' 
              onChange={preGuardado}
            />
            <div className={style.contenedor_image_pre}>
              <div style={{
                  position: 'absolute', 
                  textAlign: 'center', 
                  fontSize: '20px', 
                  color:'#7e7e7e'}}>
                  <p>Image Preview</p>
                  ↑ Paste image address {'('}URL{')'} ↑
                  <p>JPG | PNG</p>
              </div>
              <img src={createRecipe.image} alt="" style={{height: '100%', zIndex: '2'}} />
            </div>

          </div>
          <div className={style.inputs}>
            <label>Healt Score*</label>
            <div>
              <input style={{width: '70px'}} 
                type="number" 
                name="healthScore" 
                defaultValue="" 
                min={ 0 } 
                max={ 100 } 
                step={ 1 } 
                onChange={preGuardado}
              />
              <span style={{marginLeft: '10px'}}>Show how healthy a recipe is a scale of 0-100</span>
            </div>
          </div>
          <div className={style.inputs}>
            <label>Cooking time*</label>
            <div>
              <input style={{width: '70px'}} 
                type="number" 
                name="readyInMinutes" 
                defaultValue="" 
                min={ 1 } 
                max={ 1440 } 
                step={ 1 } 
                onChange={preGuardado}
              />
              <span style={{marginLeft: '10px'}}>Ready in minutes</span>
            </div>
          </div>
          <div className={style.inputs}>
            <label>Servings*</label>
            <div>
              <input style={{width: '70px'}} 
                type="number" 
                name="servings" 
                defaultValue="" 
                min={ 1 } 
                max={ 100 } 
                step={ 1 } 
                onChange={preGuardado}
              />
              <span style={{marginLeft: '10px'}}>Numbers of servings</span>
            </div>
          </div>
          <div className={style.inputs}>
            <label>Choose the types of diets*</label>
            <div className={style.contenedor_diets}>
              <div className={style.list_diets}>
                {diet[0] && diet.map(d => (
                  <div key={d.id} className={style.check}>
                    <input 
                      name="diets" 
                      type="checkbox" 
                      onChange={preGuardado} 
                      value={d.id}
                    />
                      {d.nombre}
                  </div>))}
              </div>
            </div>
          </div>
          <div className={style.inputs}>
            <label>Recipe summary</label>
            <textarea 
              name="summary" 
              rows="10" 
              cols="50" 
              defaultValue="" 
              placeholder="Write summary..." 
              onChange={preGuardado}
            />
          </div>
          <div className={style.inputs}>
            <label>Recipe instructions</label>
            <textarea 
              name="instructions" 
              rows="10" 
              cols="50" 
              defaultValue="" 
              placeholder="Write instructions..." 
              onChange={preGuardado}
            />
          </div>  
          <input className={style.boton_submit} 
            type="submit" 
            id='submit' 
            disabled
            value="Save" onClick={formSubmit} 
          /> 
        </form>
        <div className={style.contenedor_errores}>    
          {createRecipe.title === "" ? <p style={{color:'red'}}>Falta titulo. ❌</p> : 
            createRecipe.title.includes("<" || ">") ? <p style={{color:'red'}}>Titulo: letras y numeros. 🚫</p> : <p style={{color:'green'}}>Titulo correcto. ✔</p>}

          {createRecipe.image === "" ? <p style={{color:'red'}}>Falta URL imagen. ❌</p> : 
            createRecipe.image.includes("<" || ">") ? <p style={{color:'red'}}>Imagen: revise el URL. 🚫</p> :<p style={{color:'green'}}>Imagen correcto. ✔</p>}

          {createRecipe.healthScore === "" ? <p style={{color:'red'}}>Falta HealtScore. ❌</p> :
            createRecipe.healthScore < 0 || createRecipe.healthScore > 100 ? <p style={{color:'red'}}>HealtScore: Min 0 - Max 100. 🚫</p> : <p style={{color:'green'}}>HealtScore correcto. ✔</p>}
          
          {createRecipe.readyInMinutes === "" ? <p style={{color:'red'}}>Falta el tiempo de cocción. ❌</p> :
            createRecipe.readyInMinutes < 1 || createRecipe.readyInMinutes > 1440 ? <p style={{color:'red'}}>HealtScore: Min 1 - Max 1440. 🚫</p> : <p style={{color:'green'}}>Tiempo de cocción correcto. ✔</p>}
          
          {createRecipe.servings === "" ? <p style={{color:'red'}}>Falta la cantidad de porciones. ❌</p> :
            createRecipe.servings < 1 || createRecipe.servings > 100 ? <p style={{color:'red'}}>Servings: Min 1 - Max 100. 🚫</p> : <p style={{color:'green'}}>Servings correcto. ✔</p>}

          {createRecipe.diets.length === 0 ? <p style={{color:'red'}}>Marque al menos 1 dieta ❌</p> : <p style={{color:'green'}}>Dietas correcto. ✔</p>}

          {createRecipe.summary === "" ? <p style={{color:'red'}}>Escriba el resumen de su receta ❌</p> : 
            createRecipe.summary.includes("<" || ">") ? <p style={{color:'red'}}>Resumen: letras y numeros 🚫</p> : <p style={{color:'green'}}>Resumen correcto. ✔</p>}

          {createRecipe.instructions === "" ? <p style={{color:'red'}}>Escriba las instrucciones de su receta❌</p> : 
            createRecipe.instructions.includes("<" || ">") ? <p style={{color:'red'}}>Instrucciones: letras y numeros 🚫</p> : <p style={{color:'green'}}>Instrucciones correcto. ✔</p>}        
    
      </div>
      </div>
  </div>
  );
}

export default CreateRecipe;