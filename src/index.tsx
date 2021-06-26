import * as React from 'react';
import ReactDOM from "react-dom";
import Pages from './pages/pages';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../src/provider/storeContext';
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <BrowserRouter>
    <AppProvider>
      <Pages />
    </AppProvider>
  </BrowserRouter>,
  document.getElementById('root')
);