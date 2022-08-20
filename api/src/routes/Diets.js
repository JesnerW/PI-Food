'use strict'
// se requiere el models
const { Diets } = require('../db.js');
const { Router } = require('express');
//dietas para precargar
const dietas = [
    {
        nombre: "Gluten Free",
        apodo: "gluten free"
    },
    {
        nombre: "Dairy Free",
        apodo: "dairy free"
    },  
    {
        nombre: "Ketogenic",
        apodo: "ketogenic"
    },
    {
        nombre: "Vegetarian",
        apodo: "lacto ovo vegetarian"
    },
    {
        nombre: "Lacto Vegetarian",
        apodo: "lacto ovo vegetarian"
    },
    {
        nombre: "Ovo Vegetarian",
        apodo: "lacto ovo vegetarian"
    },
    {
        nombre: "Vegan",
        apodo: "vegan"
    },
    {
        nombre: "Pescetarian",
        apodo: "pescatarian"
    },
    {
        nombre: "Paleo",
        apodo: "paleolithic"
    },
    {
        nombre: "Primal",
        apodo: "primal"
    },
    {
        nombre: "Low FODMAP",
        apodo: "fodmap friendly"
    },
    {
        nombre: "Whole30",
        apodo: "whole 30"
    }
  ]
  
const router = Router();
router.get('/', async (req, res) => {
  try {
    let datos = await Diets.findAll()
    await datos.length === 0 ? datos = await Diets.bulkCreate(dietas) : datos = await Diets.findAll();
    res.status(200).json(datos);
  } catch (error) {
    res.status(404).json({error: 'Hubo un error en las Dietas - ' + error.message})
  }
})
router.post('/', async (req, res) => {
  let { nombre } = req.body;
  if (nombre){
    try {
      const diets = await Diets.create(req.body);
      return res.status(200).json(diets);
    } catch (error) {
      return res.status(404).json({error: 'No se pudo agregar la Dieta - ' + error.message})
    }
  }else{
    return res.status(404).json({error: 'Falta el nombre para agregar la Dieta'})
  }
})

module.exports = router;