const { Recipe, conn, } = require('../../src/db.js');

const recipe = {
  title: '',
  summary: '',
  healthScore: 0,
  servings: 1,
  readyInMinutes: 1,
  image: '',
  instructions : ''
};
var string288 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque interdum magna a ante sagittis, quis consequat urna eleifend. Fusce rhoncus blandit neque, vitae convallis arcu semper vel. Nam tristique, augue at cursus iaculis, neque risus accumsan diam, at vehicula elit leo sed turpis."
var string255 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque interdum magna a ante sagittis, quis consequat urna eleifend. Fusce rhoncus blandit neque, vitae convallis arcu semper vel. Nam tristique, augue at cursus iaculis, neque risus accumsan diam,"
describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('Title', () => {
      it('Devuelve error si el titulo esta vacio.', (done) => {
        Recipe.create({...recipe, title: null})
          .then(() => done(new Error('El titulo no puede vacio.')))
          .catch(() => done());
      });
      it('Devuelve error si el titulo es diferente a un valor alfanumerico.', (done) => {
        Recipe.create({...recipe, title: {}})
          .then(() => done(new Error('El titulo solo debe aceptar valores alfanumericos.')))
          .catch(() => done());
      });
      it('Devuelve error si el titulo tiene mas de 255 caracteres.', (done) => {
        Recipe.create({...recipe, title: string288})
          .then(() => done(new Error('El titulo no puede superar los 255 caracteres.')))
          .catch(() => done());
      });
      it('No devolver error si el titulo es valido.', (done) => {
        Recipe.create({ ...recipe, title: string255})
          .then(() => done())
          .catch(() => done(new Error('El titulo debe ser alfanumerico y no puede superar los 255 caracteres.')));
      });
    });
    describe('Summary', () => {
      it('Devuelve error si el resumen esta vacio', (done) => {
        Recipe.create({...recipe, summary: null})
          .then(() => done(new Error('El resumen no puede estar vacio.')))
          .catch(() => done());
      });
      it('Devuelve error si el resumen es diferente a un valor alfanumerico.', (done) => {
        Recipe.create({...recipe, title: {}})
          .then(() => done(new Error('El resumen solo debe aceptar valores alfanumericos.')))
          .catch(() => done());
      });
      it('No devolver error si el resumen es valido.', (done) => {
        Recipe.create({ ...recipe, summary: "Sumary"})
          .then(() => done())
          .catch(() => done(new Error('El resumen solo debe aceptar valores alfanumericos.')));
      });
    });
    describe('HealthScore', () => {
      it('Devuelve error si el HealthScore esta vacio.', (done) => {
        Recipe.create({...recipe, healthScore: null})
          .then(() => done(new Error('El HealthScore no puede estar vacio.')))
          .catch(() => done());
      });
      it('Devuelve error si el HealthScore no es un valor numerico.', (done) => {
        Recipe.create({...recipe, healthScore: {}})
          .then(() => done(new Error('El HealthScore solo debe aceptar valores numericos.')))
          .catch(() => done());
      });
      it('Devuelve error si el HealthScore es menor a 0.', (done) => {
        Recipe.create({...recipe, healthScore: -1})
          .then(() => done(new Error('El HealthScore no puede ser menor a 0.')))
          .catch(() => done());
      });
      it('Devuelve error si el HealthScore es mayor a 100.', (done) => {
        Recipe.create({...recipe, healthScore: 101})
          .then(() => done(new Error('El HealthScore no puede ser mayor a 100.')))
          .catch(() => done());
      });
      it('No devolver error si el HealthScore es valido.', (done) => {
        Recipe.create({ ...recipe, healthScore: 15})
          .then(() => done())
          .catch(() => done(new Error('El HealthScore debe ser numerico y no debe ser menor a 0 ni mayor a 100.')));
      });
    });
    describe('Servings', () => {
      it('Devuelve error si el Servings esta vacio.', (done) => {
        Recipe.create({...recipe, servings: null})
          .then(() => done(new Error('El Servings no puede estar vacio')))
          .catch(() => done());
      });
      it('Devuelve error si el Servings no es un valor numerico.', (done) => {
        Recipe.create({...recipe, servings: {}})
          .then(() => done(new Error('El Servings solo debe aceptar valores numericos.')))
          .catch(() => done());
      });
      it('Devuelve error si el Servings es menor a 1.', (done) => {
        Recipe.create({...recipe, servings: 0})
          .then(() => done(new Error('El Servings no puede ser menor a 1.')))
          .catch(() => done());
      });
      it('Devuelve error si el Servings es mayor a 100.', (done) => {
        Recipe.create({...recipe, servings: 101})
          .then(() => done(new Error('El Servings no puede ser mayor a 100.')))
          .catch(() => done());
      });
      it('No devolver error si el Servings es valido.', (done) => {
        Recipe.create({ ...recipe, servings: 15})
          .then(() => done())
          .catch(() => done(new Error('El Servings debe ser numerico y no debe ser menor a 1 ni mayor a 100.')));
      });
    });
    describe('ReadyInMinutes', () => {
      it('Devuelve error si el ReadyInMinutes esta vacio.', (done) => {
        Recipe.create({...recipe, readyInMinutes: null})
          .then(() => done(new Error('El ReadyInMinutes no puede estar vacio.')))
          .catch(() => done());
      });
      it('Devuelve error si el ReadyInMinutes no es un valor numerico.', (done) => {
        Recipe.create({...recipe, readyInMinutes: {}})
          .then(() => done(new Error('El ReadyInMinutes solo debe aceptar valores numericos.')))
          .catch(() => done());
      });
      it('Devuelve error si el ReadyInMinutes es menor a 1.', (done) => {
        Recipe.create({...recipe, readyInMinutes: 0})
          .then(() => done(new Error('El ReadyInMinutes no puede ser menor a 1.')))
          .catch(() => done());
      });
      it('Devuelve error si el ReadyInMinutes es mayor a 1440 minutos (24 horas).', (done) => {
        Recipe.create({...recipe, readyInMinutes: 1441})
          .then(() => done(new Error('El ReadyInMinutes no puede ser mayor a 1440.')))
          .catch(() => done());
      });
      it('No devolver error si el ReadyInMinutes es valido.', (done) => {
        Recipe.create({ ...recipe, readyInMinutes: 50})
          .then(() => done())
          .catch(() => done(new Error('El ReadyInMinutes debe ser numerico y no debe ser menor a 1 ni mayor a 1440.')));
      });
    });
    describe('Image', () => {
      it('Devuelve error si el URL de la Imagen esta vacio.', (done) => {
        Recipe.create({...recipe, image: null})
          .then(() => done(new Error('La URL de la Imagen no puede vacio.')))
          .catch(() => done());
      });
      it('Devuelve error si el URL de la Imagen no es un valor alfanumerico.', (done) => {
        Recipe.create({...recipe, image: {}})
          .then(() => done(new Error('La URL de la Imagen solo debe aceptar valores alfanumericos.')))
          .catch(() => done());
      });
      it('No devolver error si el URL de la Imagen es valido.', (done) => {
        Recipe.create({ ...recipe, image: "https://i.blogs.es/87930e/comidas-ricas/840_560.jpg"})
          .then(() => done())
          .catch(() => done(new Error('La URL de la Imagen debe ser alfanumerico.')));
      });
    }); 
    describe('Instructions', () => {
      it('Devuelve error si el Instructions esta vacio.', (done) => {
        Recipe.create({...recipe, instructions: null})
          .then(() => done(new Error('El Instructions no puede estar vacio.')))
          .catch(() => done());
      });
      it('Devuelve error si el Instructions no es un valor alfanumerico.', (done) => {
        Recipe.create({...recipe, instructions: {}})
          .then(() => done(new Error('El Instructions solo debe aceptar valores alfanumericos.')))
          .catch(() => done());
      });
      it('No devolver error si el Instructions es valido.', (done) => {
        Recipe.create({ ...recipe, instructions: "instructions test"})
          .then(() => done())
          .catch(() => done(new Error('El Instructions debe ser alfanumerico.')));
      });
    }); 
  });
});
