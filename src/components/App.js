import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './auth/core/PrivateRoute';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Home from './pages/Home';
import "./App.css"
const App = () => {
  return (
    <Router>
      <Routes>
      <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
