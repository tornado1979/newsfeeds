import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

import { 
    fetchNews,
    updateArticlesChunk,
    changeSorting,
 } from './actionCreators'

import { 
    getArticlesByNumber,
    getIsFetching,
    getNumberOfArticles,
 } from './selectors'

 //import sass
import './css/index.scss'
//import components
import CustomButton from '../../components/customButton'
import Loader from '../../components/loader'


class Home extends Component {
    constructor(props){
        super(props)
        this.loadMoreArticles = this.loadMoreArticles.bind(this)
    }
    //When component mount, it updates the state with the news and with the init
    // number of Articles (7)
    componentDidMount(){
      const initChunk = 7 //default articles chunks 
      this.props.fetchNews() // dispatch action to fetch news
      this.props.updateArticlesChunk(initChunk) // dispatch action to update the articlesChunks
    }

    componentWillReceiveProps(nextProps){
    }

    //Load more articles oo the blowser
    loadMoreArticles(currentArticlesDiplayed, ev){
        ev.preventDefault()

        const {
            fetchNews,
            updateArticlesChunk,
        } = this.props

        //dispatch actions to fetch 7 more articles
        fetchNews()
        updateArticlesChunk(currentArticlesDiplayed+7)
    }

    //Change the articles sort type & order
    changeArticlesSorting(event){
        event.preventDefault()

        //dispatch action to update the sort values on state
        const sortTypeOrder = event.target.value.split(',')
        this.props.changeSorting(sortTypeOrder[0],sortTypeOrder[1])
    }

    render() {

        const {
            articles,
            articlesNumber,
            isFetching,
        } = this.props
        
        const moment = require('moment');
        const showMore = articlesNumber > articles.length
        let vals

        if(articles && articles.length > 0){

            vals = articles.map( (article,idx) => {

            var articleDate = moment(article.publishedAt)
        
           //loop through the articles array and build the elements
           if(idx >= 0 && idx < 4) {
            let className = `my-content-${idx+1} top`

            //if max-width 999px, i hide the description from 3rd article
            const mediaQuery = window.matchMedia('(max-width:999px)');

            return (<div className={className} key={idx}>
                        <div className="card">
                            <img className="card-img-top" src={article.urlToImage} alt='news'/>
                            <div className="card-body">
                                <p className="card-title">{article.title}</p>
                                <p className="card-date">{articleDate.format('DD/MM/YYYY')} | <b>{article.source.name}</b></p>
                                
                                {idx !== 2 && <p className="card-text">{article.description}</p>}
                                {
                                    (idx === 2 &&
                                    mediaQuery.matches) &&
                                    <p className="card-text">{article.description}</p>
                                }
                            </div>
                        </div>
                </div>)
           }else{
            let position = (idx+1)%4 === 0 ? 4 : (idx+1)%4
            let className = `my-content-${position}`
            return (<div className={className} key={idx}>
                  <div className="card">
                    <img className="card-img-top" src={article.urlToImage} alt='news'/>
                    <div className="card-body">
                        <h5 className="card-title">{article.title}</h5>
                        <p className="card-date">{articleDate.format('DD/MM/YYYY')} | <b>{article.source.name}</b></p>
                        <p className="card-text">{article.description}</p>
                    </div>
                  </div>
                </div>
            )
            }
         })
        }
        
        const sortOrderDropDown =
            <select className="sortOrderBox" onChange={(event ) => this.changeArticlesSorting(event)}>
              <option value="date,asc">Date asc</option>
              <option value="date,desc">Date desc</option>
              <option value="title,asc">Title asc</option>
              <option value="title,desc">Title desc</option>
            </select>


        return(
          <div className="my-container">
            {isFetching && <div className="my-row">
              <div className="col">
                {/* progress bar */}
                <Loader progress={1} />
              </div>
            </div>}
            <div className="my-row">
             <div className="col">
              {sortOrderDropDown}
             </div>
            </div>
            <div className="my-row">
              {vals}
              {showMore && <CustomButton
                articles={articles.length}
                onClick={this.loadMoreArticles}
                />}
            </div>
           </div>

        )
    }
}

Home.propTypes = {
    articles: propTypes.array,
    articlesNumber: propTypes.number,
    changeSorting: propTypes.func,
    fetchNews: propTypes.func,
    updateArticlesChunk: propTypes.func,
}

const mapStateToProps = (state) => ({
    isFetching: getIsFetching(state),
    articles: getArticlesByNumber(state),
    articlesNumber: getNumberOfArticles(state),
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    changeSorting,
    fetchNews,
    updateArticlesChunk,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)