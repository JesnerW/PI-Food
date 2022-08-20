import {
  GET_RECIPES,
  GET_RECIPE_BY_ID,
  GET_DIETS,
  POST_RECIPE,
  FILTER
} from "../actions/index.js";
// Importa las actions types que necesites acá:

const initialState = {
  contenedorRecipes: [],
  recipes: [],
  recipebyid: {},
  diets: [],
  lastCreate: {}
};

function BuscarSimilitud(palabra, comparacion) {
  let nPalabra = palabra.toLowerCase();
  let nComparacion = comparacion.toLowerCase();
  for (let i = 0; i < nPalabra.length; i++) {
    const recorte = nPalabra.slice(i, i + nComparacion.length);
    if (recorte.length < nComparacion.length) return false;
    else if (recorte === nComparacion) return true;
  }
}
function ordenar(d, orden) {
  let datos = [...d];
  if (orden === "all") {return datos;}
  if (orden === "a-z") {
    datos.sort(function (a, b) {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      return 0;
    });
    return datos;
  }
  if (orden === "z-a") {
    datos.sort(function (a, b) {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return 1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return -1;
      }
      return 0;
    });
    return datos;
  }
  if (orden === "asc") {
    datos.sort(function (a, b) {
      if (a.healthScore > b.healthScore) {
        return 1;
      }
      if (a.healthScore < b.healthScore) {
        return -1;
      }
      return 0;
    });
    return datos;
  }
  if (orden === "des") {
    datos.sort(function (a, b) {
      if (a.healthScore < b.healthScore) {
        return 1;
      }
      if (a.healthScore > b.healthScore) {
        return -1;
      }
      return 0;
    });
    return datos;
  }
  if (orden === "asc_l") {
    datos.sort(function (a, b) {
      if (a.aggregateLikes > b.aggregateLikes) {
        return 1;
      }
      if (a.aggregateLikes < b.aggregateLikes) {
        return -1;
      }
      return 0;
    });
    return datos;
  }
  if (orden === "des_l") {
    datos.sort(function (a, b) {
      if (a.aggregateLikes < b.aggregateLikes) {
        return 1;
      }
      if (a.aggregateLikes > b.aggregateLikes) {
        return -1;
      }
      return 0;
    });
      return datos;
  }
  
}
function filtrar(listFilter, contenedorRecipes){        
  let f_by_diets = listFilter.diet === "all" ? contenedorRecipes : 
  contenedorRecipes.filter(x => x.diets.some(x => x === listFilter.diet));
  let f_by_order = ordenar(f_by_diets, listFilter.order);
  let f_by_tSearch = listFilter.text !== "" ?
   f_by_order.filter(recipe => BuscarSimilitud(recipe.title, listFilter.text) ? recipe : null)
    : f_by_order;
  return f_by_tSearch;
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        contenedorRecipes: action.payload,
        recipes: action.payload
      }
    case GET_RECIPE_BY_ID:
      return {
        ...state,
        recipebyid: action.payload
      }
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload
      }
    case FILTER:
      const newObjFilter = filtrar(action.payload, state.contenedorRecipes)
      return {
        ...state,
        recipes: newObjFilter
      }
    case POST_RECIPE:
      return {
        ...state,
        lastCreate: action.payload
      }
    default:
      return state;
  };
};

export default rootReducer;