import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import '@babel/polyfill';

import Routes from './Routes';
import { store } from './store';

const rootElement = document.getElementById('root');
const renderMethod = rootElement.hasChildNodes() ? ReactDOM.hydrate : ReactDOM.render;

renderMethod(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  rootElement
);
