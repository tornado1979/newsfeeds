import axios from "axios";

//action costants
import { 
  CHANGE_SORT_ORDER,
  RECEIVE_NEWS,
  REQUEST_NEWS,
  SERVER_CONNECTION_ERROR,
  UPDATE_ARTICLES_CHUNK,
  BROWSER_RESIZE,
 } from '../actions'

//API url, we need the apiKey in order to work.
//for free @: https://newsapi.org/
const newsURL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=dc85551b8fa94f8c8edf35a1ecce1087`

const requestNews = () => {
  return {
    payload: {isFetching: true},
    type: REQUEST_NEWS,
  }
}

const receiveNews = (data) => {
  return {
    payload: {
      articles: data,
      isFetching: false,
    },
    type: RECEIVE_NEWS,
  }
}

const error = (err) => {
    return {
        payload: err,
        type: SERVER_CONNECTION_ERROR,
    }
}

export const fetchNews = () => (dispatch) => {
  dispatch(requestNews())
  return axios.get(newsURL)
    .then((response)=> {
        return response.data.articles
    })
    .then((news) => {
      return dispatch(receiveNews(news))
    })
    .catch((err) => {
      return dispatch(error(err))
    })
}

export const updateArticlesChunk = (articlesVisible) => (dispatch) => {
  return dispatch({
    payload: articlesVisible,
    type: UPDATE_ARTICLES_CHUNK,
  })
}

export const changeSorting = (sortType, sortOrder='desc') => (dispatch) => {
  return dispatch({
    payload: {
      sortOrder,
      sortType,
    },
    type: CHANGE_SORT_ORDER,
  })
}

export const browserResize = (browser) => (dispatch) => {
  return dispatch({
    payload: browser,
    type: BROWSER_RESIZE,
  })

}