'use strict'
// se requiere el models
const { Recipe, Diets } = require('../db.js');
const { Router } = require('express');
const fetch = require('node-fetch');
const { API_KEY } = process.env;
const router = Router();

router.get('/', async (req, res) => {
  let { name } = req.query;

  var recetas = Recipe.findAll({ include: Diets })
    .then(dato => JSON.parse(JSON.stringify(dato, null, 2)));
  var byName = fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=80&addRecipeInformation=true`)
    .then(x => x.json()).then(x => x.results)

  Promise.all([byName, recetas])
    .then(x => {
      x[1].forEach(receta => receta.diets = receta.diets.map(diet => diet.apodo));
      var dato = [...x[0], ...x[1]];
      var newValue = dato.map(x => x = {
        id: x.id,
        title: x.title,
        image: x.image,
        diets: x.diets?.map(x => x),
        healthScore: x.healthScore,
        aggregateLikes: dato.aggregateLikes,
      })
      res.json(newValue)
    })
    .catch({ error: "no hay recetas para mostrar" })
});

router.get('/:idReceta', (req, res) => {
  let { idReceta } = req.params;



  var apiExterna = fetch(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${API_KEY}`).then(x => x.json())
  var apiInterna = Recipe.findByPk(idReceta, { include: Diets }).then(x => JSON.parse(JSON.stringify(x, null, 2)))

  Promise.allSettled([apiExterna, apiInterna])
    .then(x => {
      if (x[0].status === "fulfilled") {
        let dato = x[0].value

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
        res.status(200).json(newValue)
      } else {
        let dato = x[1].value
        dato.diets = dato.diets.map(diet => diet.apodo)
        res.status(200).json(dato)
      }
    })
});
router.post('/', (req, res) => {

  Recipe.create(req.body)
    .then(x => x.addDiets(req.body.diets))
    .then(x => res.status(201).json({ ...x.dataValues, status: "Receta agregado correctamente." }))
    .catch();


})

module.exports = router