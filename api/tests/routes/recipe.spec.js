/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, Diets, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  title: 'Milanea a la napolitana',
  summary: 'Milanea a la napolitana',
  healthScore: 0,
  servings: 1,
  readyInMinutes: 1,
  image: "URL",
  instructions : "inst"
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('Respuesta del servidor (200)', () =>
      agent.get('/recipes').expect(200)
    );
  });
  describe('GET /recipes/:id', () => {
    it('Respuesta del servidor (200)', () =>
      agent.get('/recipes/1').expect(200)
    );
  });
  describe('GET /recipes/:id', () => {
    it('Respuesta del servidor (404)', () =>
      agent.get('/recipes/12fdgh').expect(404)
    );
  });
  describe('POST /recipes', () => {
    it('Respuesta del servidor (201)', () =>
      agent.post('/recipes').send(recipe).expect(201)
    );
  });
});
