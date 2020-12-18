import React, { useState, useEffect } from 'react';
import NavigationBar from '../NavigationBar/NavigationBar';
import { getBudgets, addExpense } from '../../actions/pbCore';
import { isAuthenticated } from '../../actions/auth';
import { Message } from 'semantic-ui-react';
import './styles.css';

const AddExpense = () => {
  const [budgets, setBudgets] = useState([]);
  const [expenseData, setExpenseData] = useState({
    name: '',
    expense: '',
    budget: '',
    datetime: '',
    error: '',
    success: false,
  });
  const { user, token } = isAuthenticated();
  const getBudgetsData = (userId, token) => {
    getBudgets(userId, token)
      .then((res) => {
        setBudgets(res);
      })
      .catch((err) => {
        setBudgets({
          error: err,
        });
      });
  };

  const { name, expense, budget, datetime, success, error } = expenseData;

  const handleChange = (name) => (event) => {
    setExpenseData({ ...expenseData, [name]: event.target.value });
  };

  const addExpenses = (event) => {
    event.preventDefault();
    event.target.reset();
    'event', event.target.name;
    'expenseData.name ', expenseData.name;
    const addExpenseValidation =
      expenseData.name !== '' &&
      expenseData.name !== null &&
      expenseData.expense !== '' &&
      expenseData.expense !== null &&
      expenseData.budget !== '' &&
      expenseData.budget !== null &&
      expenseData.datatime !== '' &&
      expenseData.datetime !== null;

    // !added ExpenseValidation
    addExpenseValidation &&
      addExpense(user._id, { name, expense, budget, datetime }, token).then(
        (res) => {
          setExpenseData({
            name: '',
            budget: '',
            expense: '',
            datetime: '',
            success: true,
          });
        }
      );
  };

  const SuccessMessage = () => (
    <Message positive>
      <Message.Header>Expense Added Successfully!</Message.Header>
    </Message>
  );
  const FailureMessage = () => (
    <Message negative>
      <Message.Header>Expense Not Added </Message.Header>
      <p>{error}</p>
    </Message>
  );

  useEffect(() => {
    getBudgetsData(user._id, token);
  }, []);

  const addExpenseLayout = () => (
    <div className="container">
      <section class="dashboard">
        <div class="side-nav">
          <NavigationBar />
        </div>
        <section class="budget-card">
          <div class="budget-content">
            <div class="budget-logo"></div>
            <div class="budget-heading">
              <h3>Add Expense</h3>
              <p>Add your Expense for the Month!</p>
            </div>
            <div class="budget-form">
              <div className="success-message">
                {success && SuccessMessage()}
              </div>
              <div className="error-message">{error && FailureMessage()}</div>
              <form class="form-content" noValidate onSubmit={addExpenses}>
                <div class="form-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange('name')}
                    value={expenseData.name}
                    class="form-control"
                    placeholder="Name"
                    required
                  />
                  <label for="name" class="form-label">
                    Name
                  </label>
                </div>
                <div class="form-group">
                  <input
                    type="number"
                    id="expense"
                    name="expense"
                    onChange={handleChange('expense')}
                    value={expenseData.expense}
                    class="form-control"
                    placeholder="Expense"
                    required
                  />
                  <label for="expense" class="form-label">
                    Expense
                  </label>
                </div>
                <div class="form-group">
                  <select
                    id="expense-budget"
                    class="form-control"
                    onChange={handleChange('budget')}
                    value={expenseData.budget}
                  >
                    <optgroup>
                      <option value="" disabled selected>
                        Select Budget
                      </option>
                      {budgets.map((budget, index) => (
                        <option key={index} value={budget._id}>
                          {budget.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
                <div class="form-group">
                  <input
                    type="datetime-local"
                    id="datetime"
                    name="datetime"
                    onChange={handleChange('datetime')}
                    value={expenseData.datetime}
                    className="form-control"
                    placeholder="Select Date"
                    required
                  />
                </div>
                <input
                  type="submit"
                  value="Add Expense"
                  class="submit-button"
                />
              </form>
            </div>
          </div>
        </section>
      </section>
    </div>
  );

  return <React.Fragment>{addExpenseLayout()}</React.Fragment>;
};

export default AddExpense;
