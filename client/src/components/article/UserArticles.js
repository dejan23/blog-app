import React from 'react';
import { connect } from 'react-redux';
import ArticleListItem from './ArticleListItem'
import {startSetUserArticles} from '../../actions/article';


export class UserArticles extends React.Component {
  componentWillMount() {
     this.props.startSetUserArticles(this.props.match.params.id);
   }

  render() {
    const {props} = this;

    return (
      <div>
      <div className="list__lists-title"><h2>List of <span>{this.props.match.params.id}</span> articles</h2></div>
      <div className="content-container content-container--list">
      <div className="list-header">
        <div className="show-for-mobile">List of articles</div>
        <div className="show-for-desktop">Article</div>
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

export default connect(mapStateToProps, {startSetUserArticles})(UserArticles);
