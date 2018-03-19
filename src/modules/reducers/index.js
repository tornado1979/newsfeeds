import { 
  asyncNews as news,
  updateArticlesChunk,
  changeSortOder,
 } from '../home/reducers/news'

 import {
  browserResize,
 } from '../home/reducers/resize'

import { combineReducers } from 'redux'

const rootReducers = combineReducers({
  news,
  config: updateArticlesChunk,
  sort: changeSortOder,
  screen: browserResize,
})

export default rootReducers
