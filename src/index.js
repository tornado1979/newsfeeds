import React from 'react'
import { render } from 'react-dom';
import Root from './components/root'

import store from './store'

import registerServiceWorker from './registerServiceWorker';

render(
  <Root store={store} />,
  document.getElementById('root')
)

registerServiceWorker();
