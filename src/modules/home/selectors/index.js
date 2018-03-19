import { createSelector } from 'reselect'
import moment from 'moment'
import _ from 'lodash'

//get the sort obj
export const getSortValues = (state) => {
 return state &&
  state.sort &&
  {
    sortOrder: state.sort.sortOrder,
    sortType: state.sort.sortType
  }
}

//get all articles
export const getAllArticles = (state) => {
  return (state && state.news && state.news.articles) || []
}
//get articlesChunk
export const getArticlesChunk = (state,tmp=0) => {
  return (
  state &&
  state.config &&
  state.config.articlesChunk) || 0
}

//get the number of the Articles on the state
export const getNumberOfArticles = createSelector(
  getAllArticles,
  articles => articles.length
)

//sort the articles based on date or title (asc/desc)
export const sortArticles = createSelector (
  getAllArticles,
  getSortValues,
  (articles, {sortOrder,sortType}) => {
    //if state has articles
    if(articles.length > 0){
      //sort asc
      if(sortOrder === 'asc'){
        return _.sortBy(articles, function(o) 
        {
          if(sortType === 'date'){
            return new moment(o.publishedAt)
          }else if(sortType === 'title'){
            return o.title
          }
        })
      //sort desc
      }else if(sortOrder === 'desc'){
        return _.sortBy(articles, function(o) 
          {
            if(sortType === 'date'){
              return new moment(o.publishedAt)
            }else if(sortType === 'title'){
              return o.title
            }
          })
          .reverse()
      }
    } else {
      return []
    }
  }
)

//getArticles by Number
export const getArticlesByNumber = createSelector(
  [sortArticles, getArticlesChunk],
  (articles, number) => { 
    return articles.slice(0, number === undefined ? 3 : number) 
  }
)

export const getIsFetching = (state) => 
(state && 
state.news && 
state.news.isFetching) || false