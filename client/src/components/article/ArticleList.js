import React from 'react';
import { connect } from 'react-redux';
import ArticleListItem from './ArticleListItem'

const ArticleList = (props) => (
  <div className="list-body">
    {props.articles.length === 0 ? (
      <div style={{marginTop: '20px', textAlign: 'center'}}>
        No articles
      </div>
    ) : (
      <div className="list">
        <div className="list__lists-title list__lists-title"><h2>List of <span>articles</span></h2></div>
      {props.articles.map((article) => {
        return <ArticleListItem key={article._id} {...article} />
      })}
    </div>
    )
  }
  </div>
)

const mapStateToProps = (state) =>{
  return {
    articles: state.articles
  };
}



export default connect(mapStateToProps)(ArticleList);
