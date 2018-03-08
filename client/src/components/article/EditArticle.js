import React from 'react';
import { connect } from 'react-redux';
import ArticleForm from './ArticleForm';

export class EditArticle extends React.Component {


  onRemove = () => {
   this.props.addFlashMessage({
     message: 'Article deleted',
     type: 'info'
   })
   // this.props.startRemoveArticle( this.props.article._id );
   this.props.history.push('/');
 };

  render() {
    return (
      <div className="content-container">
          <h1>Edit article</h1>
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
  article: state.articles.find((article) => article._id === props.match.params.id)
})

const mapDispatchToProps = (dispatch, props) => ({
  startEditArticle: (_id, article) => dispatch(startEditArticle(_id, article)),
  startRemoveArticle: (_id) => dispatch(startRemoveArticle({_id})),
  addFlashMessage: (message) => dispatch(addFlashMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle)
