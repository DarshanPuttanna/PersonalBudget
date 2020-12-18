import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => (
  <div className="navBar">
    <ul>
      <Link to="/user/dashboard">
        <li>Dashboard</li>
      </Link>
      <Link to="/user/budgets">
        <li>Budgets</li>
      </Link>
      <Link to="/user/expenses">
        <li>Expenses</li>
      </Link>
      <Link to="/user/add/budget">
        <li>Add Budget</li>
      </Link>
      <Link to="/user/add/expense">
        <li>Add Expense</li>
      </Link>
    </ul>
  </div>
);

export default NavigationBar;
