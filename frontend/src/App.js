import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import axios from 'axios';

axios.defaults.withCredentials = true;


// pages
const RegisterPage = lazy(() => import('./pages/auth/Register'))
const LoginPage = lazy(() => import('./pages/auth/Login'));
const VerifyEmailPage = lazy(() => import('./pages/auth/VerifyEmail'))
const HomePage = lazy(() => import('./pages/home/Home'));
const NotFound = lazy(() => import('./pages/notFound/NotFound'));
const UserProfile = lazy(() => import('./pages/userProfile/UserProfile'));

function App() {
  return (
    <Router>
      <Suspense>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile/:userID" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;