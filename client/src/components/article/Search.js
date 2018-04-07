import React from 'react';
import { Field, reduxForm, isSubmitting } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startSearch } from '../../actions/article'
import {history} from '../../routers/AppRouter';

const renderInput = field =>
  <div>
    <input className="text-input text-input--search-bar"  {...field.input} placeholder={field.label} type={field.type}/>
    {field.meta.touched &&
     field.meta.error &&
     <div className="error">{field.meta.error}</div>}
  </div>

class Search extends React.Component {
  submitForm = async (values) => {
    this.props.startSearch(values.search)
    history.push(`/search?title=${values.search}`)
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (

      <form onSubmit={handleSubmit(this.submitForm.bind(this))}>
        <div className="search">
          <div className="search__box">
            <h1>Welcome</h1>
            <div className="search__results-box" >
            <Field
              name="search"
              label="what are you searching for..."
              component={renderInput}
              type="text"
            />
            <button disabled={pristine || submitting} className="button button--white button--search">Search</button></div>
            <p className="secret"><Link  className="secret" to='/secret'>go see a secret...</Link></p>
            <Link to="/users" className="button button--white">List of all users</Link>
          </div>
        </div>
      </form>
    );
  }
}

Search = connect(null, { startSearch })(Search);

export default reduxForm({
  form: 'search-form'
})(Search)











//
//
// import React from 'react';
// import { Link } from 'react-router-dom';
//
// const Search = () => (
//   <div className="search">
//     <div className="search__box">
//       <h1>Welcome</h1>
//       <input className="text-input text-input--search-bar" type="text" placeholder="what are you searching for..." />
//       <button className="button button--white button--search">Search</button>
//       <p className="secret"><Link  className="secret" to='/secret'>go see a secret...</Link></p>
//       <Link to="/users" className="button button--white">List of all users</Link>
//     </div>
//   </div>
//
// )
//
// export default Search;
