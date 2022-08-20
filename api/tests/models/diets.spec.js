const { Diets, conn, } = require('../../src/db.js');

const diet = {
  nombre: '',
  apodo: '',
};
var string288 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque interdum magna a ante sagittis, quis consequat urna eleifend. Fusce rhoncus blandit neque, vitae convallis arcu semper vel. Nam tristique, augue at cursus iaculis, neque risus accumsan diam, at vehicula elit leo sed turpis."
var string255 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque interdum magna a ante sagittis, quis consequat urna eleifend. Fusce rhoncus blandit neque, vitae convallis arcu semper vel. Nam tristique, augue at cursus iaculis, neque risus accumsan diam,"
describe('Diets model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Diets.sync({ force: true }));
    describe('Nombre', () => {
      it('Devuelve error si el nombre esta vacio.', (done) => {
        Diets.create({...diet, nombre: null})
          .then(() => done(new Error('El nombre no puede estar vacio.')))
          .catch(() => done());
      });
      it('Devuelve error si el nombre es diferente a un valor alfanumerico.', (done) => {
        Diets.create({...diet, nombre: {}})
          .then(() => done(new Error('El nombre solo debe aceptar valores alfanumericos.')))
          .catch(() => done());
      });
      it('Devuelve error si el nombre tiene mas de 255 caracteres.', (done) => {
        Diets.create({...diet, nombre: string288})
          .then(() => done(new Error('El nombre no puede superar los 255 caracteres.')))
          .catch(() => done());
      });
      it('No devolver error si el nombre es valido.', (done) => {
        Diets.create({ ...diet, nombre: string255})
          .then(() => done())
          .catch(() => done(new Error('El nombre debe ser alfanumerico y no puede superar los 255 caracteres.')));
      });
    });
    describe('Apodo', () => {
      it('Devuelve error si el apodo esta vacio.', (done) => {
        Diets.create({...diet, apodo: null})
          .then(() => done(new Error('El apodo no puede estar vacio.')))
          .catch(() => done());
      });
      it('Devuelve error si el apodo es diferente a un valor alfanumerico.', (done) => {
        Diets.create({...diet, apodo: {}})
          .then(() => done(new Error('El apodo solo debe aceptar valores alfanumericos.')))
          .catch(() => done());
      });
      it('Devuelve error si el apodo tiene mas de 255 caracteres.', (done) => {
        Diets.create({...diet, apodo: string288})
          .then(() => done(new Error('El apodo no puede superar los 255 caracteres.')))
          .catch(() => done());
      });
      it('No devolver error si el apodo es valido.', (done) => {
        Diets.create({ ...diet, apodo: string255})
          .then(() => done())
          .catch(() => done(new Error('El apodo debe ser alfanumerico y no puede superar los 255 caracteres.')));
      });
    });

  });
});
