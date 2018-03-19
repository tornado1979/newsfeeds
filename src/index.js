import React from 'react'
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Root from './components/root'

import store from './store'


import registerServiceWorker from './registerServiceWorker';

render(
  <Root store={store} />,
  document.getElementById('root')
)
/*ReactDOM.render(
  <Provider store={store}>
  <Router>
    <Route path="/" component={Home}/>
    <Route path="/about" component={About}/>
  </Router>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();*/


