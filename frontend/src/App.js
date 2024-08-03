import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

// pages
const RegisterPage = lazy(() => import('./pages/auth/Register'))
const LoginPage = lazy(() => import('./pages/auth/Login'));
const VerifyEmailPage = lazy(() => import('./pages/auth/VerifyEmail'))
const HomePage = lazy(() => import('./pages/home/Home'));

function App() {
  return (
    <Router>
      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;