import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';
import EditExpense from './components/EditExpense';
import CategoryList from './components/CategoryList';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={ExpenseList} />
          <Route path="/add-expense" component={AddExpense} />
          <Route path="/edit-expense/:id" component={EditExpense} />
          <Route path="/categories" component={CategoryList} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
