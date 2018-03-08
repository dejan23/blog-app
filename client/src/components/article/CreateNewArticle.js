import React from 'react';
import ArticleForm from './ArticleForm';

const CreateNewArticle = (props) => (
  <div className="content-container">
    <h1 style={{marginTop: '20px', textAlign: 'center'}}>Add new article</h1>
    <ArticleForm {...props} />
  </div>
)

export default CreateNewArticle;
