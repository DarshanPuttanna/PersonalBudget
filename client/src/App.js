import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import PrivateRoute from './actions/PrivateRoute';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import './App.css';
import { Login } from './components/login/Login';
import Home from './components/Homepage/Homepage';
import Dashboard from './components/dashboard/Dashboard';
import AddExpense from './components/AddExpense/AddExpense';
import Budgets from './components/budgets/Budgets';
import Expenses from './components/expenses/Expenses';
import { isAuthenticated, logout } from './actions/auth';
import { Register } from './components/register/Register';
import AddBudget from './components/AddBudget/AddBudget';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Menu />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
          <PrivateRoute path="/user/add/budget" exact component={AddBudget} />
          <PrivateRoute path="/user/add/expense" exact component={AddExpense} />
          <PrivateRoute path="/user/budgets" exact component={Budgets} />
          <PrivateRoute path="/user/expenses" exact component={Expenses} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
