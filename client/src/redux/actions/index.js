export const GET_RECIPES = "GET_RECIPES"; // Muestra 20 recetas, se puede cambiar en el API/SRC/ROUTERS/RECIPE.JS
export const GET_RECIPE_BY_ID = "GET_RECIPE_BY_ID"; // Muestra todas las dietas predeterminadas y las futuras agregadas. API/SRC/ROUTERS/DIETS.JS
export const GET_DIETS = "GET_DIETS";
export const FILTER = "FILTER";
export const POST_RECIPE = "POST_RECIPE";

// const host = "https://api-food-jesner.herokuapp.com";
const host= "http://localhost:3001";

export const getAllRecipes = () => async dispatch => {
    const response = await fetch(host+'/recipes');
    const recipes = await response.json();
    await dispatch({ type: GET_RECIPES, payload: recipes });
};

export const getRecipeByID = (id) => async dispatch => {
    const response = await fetch(host+'/recipes/'+id);
    const recipeByID = await response.json();
    await dispatch({ type: GET_RECIPE_BY_ID, payload: recipeByID });
};

export const getDiets = () => async dispatch => {
    const response = await fetch(host+'/diets');
    const diets = await response.json();
    await dispatch({ type: GET_DIETS, payload: diets });
};

export const funct_Filter = (value) => async dispatch => {
    await dispatch({ type: FILTER, payload: value });
};

export const postRecipe = (newRecipe) => async dispatch => {
    const response = await fetch(host+'/recipes',{
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(newRecipe)
    });
    const createRecipe = await response.json();
    await dispatch({ type: POST_RECIPE, payload: createRecipe });
};


