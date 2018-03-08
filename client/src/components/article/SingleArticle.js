import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {startSetArticles} from '../../actions/article';
import {startSetUser} from '../../actions/user';
import LoadingPage from '../LoadingPage';
import SingleArticlePage from './SingleArticlePage';
import ProfilePage from '../userProfile/ProfilePage';

export class SingleArticle extends React.Component {
  componentWillMount() {
     this.props.startSetArticles();
   }



  render() {
    return (
      <div>
        <div className="content-container">
          {!this.props.article ? (
            <div style={{marginTop: '20px', textAlign: 'center'}}>
              404
            </div>
          ) : (
            <SingleArticlePage {...this.props} />
          )
        }
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  article: state.articles.find((article) => article._id === props.match.params.id )
})

export default connect(mapStateToProps, {startSetArticles, startSetUser})(SingleArticle);
