import React from 'react';
import ArticleList from './article/ArticleList';
import Search from './article/Search';
import FlashMessage from './FlashMessage';
import { connect } from 'react-redux';

import * as actions from '../actions/article';


class DashboardPage extends React.Component {
  componentWillMount() {
    this.props.startSetArticles()
  }
  render() {
    return (
      <div>
        <FlashMessage />
        <Search />
        <ArticleList />
      </div>
    )
  }
}

export default connect(null, actions)(DashboardPage)
