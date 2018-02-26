import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import ReactModal from 'react-modal';

export class EditExpensePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };
  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  };
  handleOpenModal = () => {
   this.setState({ showModal: true });
 }
 handleCloseModal = () => {
    this.setState({ showModal: false });
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary" onClick={this.handleOpenModal}>Remove Expense</button>

          <ReactModal
            className="modal"
            isOpen={this.state.showModal}
            contentLabel="Confirm remove expense"
            ariaHideApp={false}
            onRequestClose={this.handleCloseModal}
            >
            <h3 className="modal__title">Confirm remove expense</h3>
            <p className="modal__body">Are you sure you want to remove expense?</p>
            <button className="button button--modal" onClick={this.onRemove}>Yes, remove it</button>
            <button className="button" onClick={this.handleCloseModal}>Cancel</button>
          </ReactModal>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
