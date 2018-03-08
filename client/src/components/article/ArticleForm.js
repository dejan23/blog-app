import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startAddArticle } from '../../actions/article';
import { addFlashMessage } from '../../actions/flashMessages';

// -------------- validation ----------

const requiredTitle = value => (value ? undefined : 'Please enter a title')
const requiredPrice = value => (value ? undefined : 'Please enter a price')
const price = value => (value ? value.match(/^\d{1,}(\.\d{0,2})?$/) : 'Please enter a price')
const requiredDescription = value => (value ? undefined : 'Please enter a description')

// -------------- end validation --------


const renderInput = field =>
  <div>
    <input className="input" {...field.input} type={field.type}/>
    {field.meta.touched &&
     field.meta.error &&
     <div className="error">{field.meta.error}</div>}
  </div>

const renderTextArea = field =>
  <div>
    <textarea className="text-area" {...field.input} type={field.type}/>
    {field.meta.touched &&
     field.meta.error &&
     <div className="error">{field.meta.error}</div>}
  </div>

const currency = ['eur', 'usd', 'rsd']
const renderCurrencySelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="">Select your currency...</option>
      {currency.map(val => <option value={val} key={val}>{val}</option>)}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
)

class ArticleForm extends React.Component {

  componentDidMount() {
     this.handleInitialize();
   }


  handleInitialize() {
    const { initialValues } = this.props
    this.props.initialize(initialValues);
  }

  submitForm = values => {
    this.props.match.params.id ?

    this.props.addFlashMessage({
      message: 'Article successfully updated',
      type: 'success'
    }) &&
    this.props.startEditArticle(values) :

    this.props.addFlashMessage({
      message: 'Article successfully added',
      type: 'success'
    }) &&
    this.props.startAddArticle(values)
  }

  render() {
    const { handleSubmit } = this.props;

    return (
        <form className="box-layout" onSubmit={handleSubmit(this.submitForm.bind(this))}>
          <div className="box-layout__box">
          <div className="box-layout__form-group">
            <label>Title of the article:</label>
            <Field
              validate={requiredTitle}
              name="title"
              component={renderInput}
              type="text"
            />
          </div>


          <label>Price:</label>
          <div className="box-layout__form-group-special">
            <div className="flex-grid">
              <div className="col">
                <Field
                  validate={requiredPrice}
                  name="price"
                  component={renderInput}
                  type="number"
                />
              </div>
              <div className="item">
                <Field name="currency" component={renderCurrencySelector} />
              </div>
            </div>
          </div>

          <div className="box-layout__form-group">
            <label>Description:</label>
            <Field
              validate={requiredDescription}
              name="description"
              component={renderTextArea}
              type="text"
            />
          </div>

          {this.props.match.params.id ?
            <div>
              <button className="button button--register" type="submit">Save</button>
              <button className="button button--register" type="button" onClick={this.props.onRemove}>Remove it</button>
            </div> :
            <button className="button button--register" type="submit">Post a new article</button>
          }
          </div>
        </form>
    )
  }
}




const mapStateToProps = (state, props) => {
  if (props.match.params.id) {
    return {
      initialValues: state.articles.find((article) => article._id === props.match.params.id )
    }
  }
  return { initialValues: null }
}

ArticleForm = connect(mapStateToProps, { addFlashMessage, startAddArticle })(ArticleForm);

export default reduxForm({
  form: 'articleForm'
})(ArticleForm);
