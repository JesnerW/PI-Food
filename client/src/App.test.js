import React from 'react';

import { Route, Link } from "react-router-dom";
import App from './App';
import PageDetalleRecipe from "./components/PageDetalleRecipe/PageDetalleRecipe.jsx";
import { shallow } from 'enzyme';

describe('<App />', () => {
  let app;
  beforeEach(() => {
      app = shallow(<App />);
      expect(app).toBeTruthy();
  });

  it('Debería tener una ruta con el texto que cambie hacia "/filter/posts"', () => {
      // El orden en el que se declaran las rutas es importante!
      expect(app.find(Route).at(0).prop('path')).toEqual('/');
  });

  it('Debería tener una ruta con el texto que cambie hacia "/"', () => {
      // El orden en el que se declaran las rutas es importante!
      expect(app.find(Route).at(1).prop('path')).toEqual('/home');
  });

  it('Debería tener una ruta con el texto que cambie hacia "/recipes/:idReceta"', () => {
      // El orden en el que se declaran las rutas es importante!
      expect(app.find(Route).at(2).prop('path')).toEqual('/recipes/:idReceta');
  });

  it('Debería renderizar <PageDetalleRecipe /> en la ruta "/recipes/:idReceta"', () => {
    // El orden en el que se declaran las rutas es importante!
    expect(app.find(PageDetalleRecipe));
  });

  it('Debería tener una ruta con el texto que cambie hacia "/create"', () => {
      // El orden en el que se declaran las rutas es importante!
      expect(app.find(Route).at(3).prop('path')).toEqual('/create');
  });
  it('Debería tener una ruta con el texto que cambie hacia ERROR PAGE 404', () => {
    // El orden en el que se declaran las rutas es importante!
    expect(app.find(Route).at(4).prop('path')).toEqual('*');
  });
  
  it('Debería tener una Link que lleve al path /home "HOME"', () => {
    expect(app.find(Link).at(0).prop('to')).toEqual('/home');
  });
  it('Debería tener una Link que lleve al INDEX "/" "INDEX"', () => {
    expect(app.find(Link).at(1).prop('to')).toEqual('/');
  });


  
});









// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
