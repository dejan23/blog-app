import React from 'react';
import { connect } from 'react-redux';
import ArticleListItem from './ArticleListItem'
import {startSetArticles, startSearchAll} from '../../actions/article';
import {history} from '../../routers/AppRouter';
import queryString from 'query-string';

export class ArticleList extends React.Component {
  componentWillMount() {
    if(!this.props.location.search) {
      this.props.startSetArticles();
    }
   }

  componentDidMount() {
   if(!this.props.submitting) {
     const values = queryString.parse(this.props.location.search)
     Object.keys(values).length === 0 ? '' : this.props.startSetArticles(values.sort);
   }
  }

  handleClick(input) {
    this.props.startSetArticles(input);
    history.push({
      pathname: '/',
      search: `?sort=${input}`
   })
  }

  render() {
    const {props} = this;
    let sortedBy = null;
    const values = queryString.parse(this.props.location.search)
    if(values.sort === 'newest') { sortedBy = 'newest'}
    if(values.sort === 'oldest') { sortedBy = 'oldest'}
    if(values.sort === 'price-high') { sortedBy = 'highest price'}
    if(values.sort === 'price-low') { sortedBy = 'lowest price'}
    
    return (
      <div>
        <div className="list__lists-title"><h2>List of <span>articles</span></h2></div>
        <div className="dropdown__container">
          <div className="dropdown">
            <button className="dropbtn">Sort</button>
            <div className="dropdown-content">
              <button onClick={this.handleClick.bind(this, 'newest')} >Newest</button>
              <button onClick={this.handleClick.bind(this, 'oldest')} >Oldest</button>
              <button onClick={this.handleClick.bind(this, 'price-high')} >Highest Price</button>
              <button onClick={this.handleClick.bind(this, 'price-low')} >Lowest Price</button>
            </div>
          </div>
        </div>
      <div className="content-container content-container--list">
      <div className="list-header">
        <div className="show-for-mobile">List of articles</div>
        <div className="show-for-desktop">
          {
            !this.props.location.search ?
            <span>Articles</span> :
            <span>Articles sorted by <i>{sortedBy}</i></span>

          }
        </div>
        <div className="show-for-desktop">Posted</div>
      </div>
      <div className="list-body">
        {!props.articles ? (
          <div className="list-item list-item--message">
              <span>No articles</span>
            </div>
        ) : (
          props.articles.map((article) => {
            return <ArticleListItem key={article._id} {...article} />
          })
        )
      }
      </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    articles: state.articles.articles
  };
}

export default connect(mapStateToProps, {startSetArticles, startSearchAll})(ArticleList);
