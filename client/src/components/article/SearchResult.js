import React from 'react';
import { Field, reduxForm, isSubmitting } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { startSearch } from '../../actions/article'
import Search from '../article/Search';
import SearchList from './SearchList';
import {history} from '../../routers/AppRouter';

const renderInput = field =>
  <div>
    <input className="text-input text-input--search-bar"  {...field.input} placeholder={field.label} type={field.type}/>
    {field.meta.touched &&
     field.meta.error &&
     <div className="error">{field.meta.error}</div>}
  </div>

class SearchResult extends React.Component {
  componentDidMount() {
    if(!this.props.submitting) {
      const values = queryString.parse(this.props.location.search)
      Object.keys(values).length === 0 ? '' : this.props.startSearch(values.title);
    }
  }

  submitForm = async (values) => {
    this.props.startSearch(values.search)
    // history.push(`/search?title=${values.search}`)
    history.push({
      pathname: '/search',
      search: `?title=${values.search}`
    })
  }

  render() {
    const {props} = this;
    const { handleSubmit, pristine, submitting } = this.props;

    return (

      <div>
        <form onSubmit={handleSubmit(this.submitForm.bind(this))}>
          <div className="search__results">
            <div className="search__results-box">
              <Field
                name="search"
                label="what are you searching for..."
                component={renderInput}
                type="text"
              />
              <div><button className="button button--white button--search">Search</button></div>
            </div>
          </div>
        </form>


        <div>
        <div className="list__lists-title"><h2>Results of <span style={{color: '#2899ab'}}>search</span></h2></div>
        <div className="content-container content-container--list">
        <div className="list-header">
          <div className="show-for-mobile">List of articles</div>
          <div className="show-for-desktop">Article</div>
          <div className="show-for-desktop">Posted</div>
        </div>
        <div className="list-body">
          {
            props.searchResult ? (
              props.searchResult.map((article) => {
                  return <SearchList key={article._id} {...article} />
                })
              ) : (
                <div className="list-item list-item--message">
                  <span>{props.errorMessage || `No articles`}</span>
                </div>
            )
          }
        </div>
        </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchResult: state.articles.searchResult,
    errorMessage: state.articles.error
  }
}

SearchResult = connect(mapStateToProps, { startSearch })(SearchResult);

export default reduxForm({
  form: 'search-form'
})(SearchResult)
