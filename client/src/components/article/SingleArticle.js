import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {startSetArticle} from '../../actions/article';
import {startSetUser} from '../../actions/user';
import LoadingPage from '../LoadingPage';
import SingleArticlePage from './SingleArticlePage';
import ProfilePage from '../userProfile/ProfilePage';

export class SingleArticle extends React.Component {
  componentWillMount() {
     this.props.startSetArticle(this.props.match.params.id);
   }

  render() {
    return (
      <div>
          {!this.props.article ? (
            <div style={{marginTop: '20px', textAlign: 'center'}}>
              404
            </div>
          ) : (
            <SingleArticlePage {...this.props} />
          )
        }
    </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  article: state.articles.article
})

export default connect(mapStateToProps, {startSetArticle})(SingleArticle);
