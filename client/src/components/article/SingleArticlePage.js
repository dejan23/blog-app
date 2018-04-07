import React from 'react';
import {} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import { Link } from 'react-router-dom';





class SingleArticlePage extends React.Component {
  renderAuthor () {
    if(this.props.article.author) {
      return (
        <div>
          <p>posted by <strong><Link style={{textDecoration: 'none', color: '#ea5252'}} to={`/users/${this.props.article.author.username}`}>{this.props.article.author.username}</Link></strong></p>
        </div>
      )
    } else if(!this.props.article.author) {
      return (
        <p>posted by <strong><i>deleted user</i></strong></p>
      )
    }
  }
  render() {
    const { author, title, description, price, picture, createdAt } = this.props.article;
    return (
      <div className="section">
        <div className="article__header">
          <div className="article__name">
            <h1>{title}</h1>
            <p>posted at {moment(createdAt).format('MMMM Do, YYYY')}</p>
          </div>
        </div>
        <div className="article__content">
              <div className="photo-container">
                <img src={picture || 'https://blog.stylingandroid.com/wp-content/themes/lontano-pro/images/no-image-slide.png'} />
              </div>
              <div className="article__info">
                <p>{description}</p>
                <p className="list-item__price">Price: {numeral(price).format('$0,0')}</p>
                {this.renderAuthor()}
              </div>
              <div className="article__button">
                <Link className="button" to={`/article/${this.props.match.params.id}/edit`}>
                  Edit
                </Link>
              </div>
        </div>
      </div>
    )
  }
};

export default SingleArticlePage;
