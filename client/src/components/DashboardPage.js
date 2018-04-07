import React from 'react';
import ArticleList from './article/ArticleList';
import Search from './article/Search';
import FlashMessage from './FlashMessage';
import { connect } from 'react-redux';



class DashboardPage extends React.Component {
  render() {
    return (
      <div>
        <FlashMessage />
        <Search {...this.props} />
        <ArticleList {...this.props} />
      </div>
    )
  }
}

export default connect(null, null)(DashboardPage)
