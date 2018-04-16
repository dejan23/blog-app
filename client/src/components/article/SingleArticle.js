import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {startSetArticle} from '../../actions/article';
import {startSetUser} from '../../actions/user';
import LoadingPage from '../LoadingPage';
import NotFoundPage from '../NotFoundPage';
import SingleArticlePage from './SingleArticlePage';
import ProfilePage from '../userProfile/ProfilePage';

export class SingleArticle extends React.Component {
  componentWillMount() {
     this.props.startSetArticle(this.props.match.params.id);
   }

  render() {
    if(this.props.loading) {
      return <LoadingPage />
    }

    return (
      <div>
          {!this.props.article ? (
            <NotFoundPage />
          ) : (
            <SingleArticlePage {...this.props} />
          )
        }
    </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  article: state.articles.article,
  loading: state.articles.articlesIsLoading
})

export default connect(mapStateToProps, {startSetArticle})(SingleArticle);
