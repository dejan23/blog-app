import React from 'react';
import { connect } from 'react-redux';
import FlashMessage from './FlashMessage'
import * as actions from '../actions/article';


class FlashMessages extends React.Component {

  componentWillUnmount() {
      this.props.clearFlashMessage()
  }

  componentDidMount() {
    if(this.props.success) {
      setTimeout(() => {
        this.props.clearFlashMessage()
      }, 20000)
    }
  }

   closeMessage() {
    this.props.clearFlashMessage();
  }

  renderMessage() {
    if(this.props.success) {
      return (
        <div className="success">
          <button onClick={this.closeMessage.bind(this)} className="close"><span>&times;</span></button>
          {this.props.success}
        </div>
      )
    } else if (this.props.type === 'info') {
      return (
        <div className="info">
          <button onClick={this.closeMessage.bind(this)} className="close"><span>&times;</span></button>
          {this.props.message}
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderMessage()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.flashMessages.message,
    type: state.flashMessages.type,
    success: state.articles.success
  }
}

export default connect(mapStateToProps, actions)(FlashMessages);
