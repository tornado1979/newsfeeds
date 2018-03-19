import { BROWSER_RESIZE } from '../actions'

export const browserResize = (state=[],action) => {
  switch(action.type){
    case BROWSER_RESIZE:
      return {
        ...action.payload,
      }
    default:
      return state
  }
}