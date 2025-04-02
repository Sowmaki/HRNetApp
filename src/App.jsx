import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router';
import './App.scss';
import { CreateEmployeePage } from './pages/CreateEmployeePage/CreateEmployeePage';
import { EmployeeListPage } from './pages/EmployeeListPage/EmployeeListPage';
import { store } from './redux/store';

export function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<EmployeeListPage />} />
          <Route path="/add" element={<CreateEmployeePage />} />
        </Routes>
      </Router>
    </Provider>
  );
}