import React from 'react';
import { connect } from 'react-redux';
import ArticleForm from './ArticleForm';
import { startEditArticle, startRemoveArticle, startSetArticles } from '../../actions/article'
import { addFlashMessage } from '../../actions/flashMessages'


export class EditArticle extends React.Component {
  onRemove = () => {
    this.props.startRemoveArticle( this.props.article._id );
 };

  render() {
    return (
      <div className="content-container">
          <ArticleForm
            {...this.props}
            article={this.props.article}
            onRemove={this.onRemove}
          />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  article: state.articles.article
})

const mapDispatchToProps = (dispatch, props) => ({
  startEditArticle: (_id, article) => dispatch(startEditArticle(_id, article)),
  startRemoveArticle: (_id) => dispatch(startRemoveArticle({_id})),
  addFlashMessage: (message) => dispatch(addFlashMessage(message)),
  startSetArticles: () => dispatch(startSetArticles())
})

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle)
