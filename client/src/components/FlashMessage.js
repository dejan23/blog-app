import React from 'react';
import { connect } from 'react-redux';
import FlashMessage from './FlashMessage'
import * as actions from '../actions/flashMessages';


class FlashMessages extends React.Component {

  componentWillUnmount() {
    if(this.props.message) {
      this.props.clearFlashMessage()
    }
  }

  componentDidMount() {
    if(this.props.message) {
      setTimeout(() => {
        this.props.clearFlashMessage()
      }, 20000)
    }
  }

   closeMessage() {
    this.props.clearFlashMessage();
  }

  renderMessage() {
    if(this.props.type === 'success') {
      return (
        <div className="success">
          <button onClick={this.closeMessage.bind(this)} className="close"><span>&times;</span></button>
          {this.props.message}
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
    type: state.flashMessages.type
  }
}

export default connect(mapStateToProps, actions)(FlashMessages);
