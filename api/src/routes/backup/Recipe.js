'use strict'
// se requiere el models
const { Recipe, Diets } = require('../db.js');
const { Router } = require('express');
const fetch = require('node-fetch');
const { API_KEY } = process.env;
const router = Router();

router.get('/', async (req, res) => {
  let { name } = req.query;
  try {
    if (name) {
      let byName = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}`).then(x => x.json());
      return res.status(200).json(byName);
    } else {
      let byName = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=50&addRecipeInformation=true`).then(x => x.json());
      const recetas = await Recipe.findAll({ include: Diets });
      var dato = JSON.parse(JSON.stringify(recetas, null, 2))
      dato.forEach(receta => receta.diets = receta.diets.map(diet => diet.apodo))
      dato.push(...byName.results)

      var newValue = dato.map(x => x={
                              id: x.id, 
                              title: x.title,
                              image: x.image,
                              diets: x.diets?.map(x => x),
                              healthScore: x.healthScore,
                              aggregateLikes: x.aggregateLikes,
                            })
                            
      return res.status(200).json(newValue);
    }
  } catch (error) {
    res.status(404).json({ error: "El NOMBRE no concuerda con ninguna receta - " + error.message })
  }
});

router.get('/:idReceta', async (req, res) => {
  let { idReceta } = req.params;
  try {
    const dato = await fetch(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${API_KEY}`).then(x => x.json())

    var listIngred = [] // contiene Lista de todos los ingredientes sin repetir.
    var listEquip = [] // contiene Lista de todos los equipamientos sin repetir.

    var analyzedInst = dato.analyzedInstructions[0]?.steps.map(x => x);
    // verificamos que el objeto exista y sacamos todos los equipamientos e ingredientes
    var equipBruto = analyzedInst?.map(data => [...data?.equipment]);
    var ingredBruto = analyzedInst?.map(data => [...data?.ingredients]);
    // filtramos para eliminar algun paso que no necesite ningun equipo o ingrediente
    var equipNeto = equipBruto?.filter(data => data?.length > 0);
    var ingredNeto = ingredBruto?.filter(data => data?.length > 0);
    // filtramos valores repetidos de los ingredientes
    dato.analyzedInstructions && ingredNeto?.forEach(data => listIngred.push(...data))
    let hashIngred = {};
    listIngred = listIngred?.filter(o => hashIngred[o.id] ? false : hashIngred[o.id] = true);
    // filtramos valores repetidos del equipamiento;
    dato.analyzedInstructions && equipNeto?.forEach(data => listEquip.push(...data))
    let hashEquip = {};
    listEquip = listEquip?.filter(o => hashEquip[o.id] ? false : hashEquip[o.id] = true);

    var newValue = {
      id: dato.id,
      title: dato.title,
      image: dato.image,
      summary: dato.summary.replace(/(<([^>]+)>)/ig, ""),
      aggregateLikes: dato.aggregateLikes,
      diets: dato.diets?.map(x => x),
      dishTypes: dato.dishTypes?.map(x => x),
      cuisines: dato.cuisines?.map(x => x),
      healthScore: dato.healthScore,
      servings: dato.servings,
      readyInMinutes: dato.readyInMinutes,
      listIngred: listIngred,
      listEquip: listEquip,
      analyzedInstructions: analyzedInst?.map(x => x.step),
      instructions: dato.instructions,
      sourceUrl: dato.sourceUrl,
      sourceName: dato.sourceName
    }

    res.status(200).json(newValue);
  } catch (e) {
    try {
      const recetas = await Recipe.findByPk(idReceta);
      res.status(200).json(recetas);
    } catch (error) {
      res.status(404).json({ error: "El ID no concuerda con ninguna receta - " + error.message })
    }
  }

});
router.post('/', async (req, res) => {
  try {
    const recetas = await Recipe.create(req.body);
    await recetas.addDiets(req.body.diets)
    res.status(201).json({ ...recetas.dataValues, status: "Receta agregado correctamente." });
  } catch (error) {
    res.status(404).json({ error: "No se pudo guardar la nueva receta " + error.message })
  }
})

module.exports = router