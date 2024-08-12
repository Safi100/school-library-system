import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Cookies from 'js-cookie';
import axios from 'axios';

axios.defaults.withCredentials = true;


// pages
const RegisterPage = lazy(() => import('./pages/auth/Register'))
const LoginPage = lazy(() => import('./pages/auth/Login'));
const VerifyEmailPage = lazy(() => import('./pages/auth/VerifyEmail'))
const HomePage = lazy(() => import('./pages/home/Home'));
const NotFound = lazy(() => import('./pages/notFound/NotFound'));
const UserProfile = lazy(() => import('./pages/userProfile/UserProfile'));
const CategoryPage = lazy(() => import('./pages/category/Category'));
const StudentPage = lazy(() => import('./pages/student/Student'));
const NewStudentPage = lazy(() => import('./pages/student/NewStudent'));
const NewBookPage = lazy(() => import('./pages/book/NewBook'));
const BooksPage = lazy(() => import('./pages/book/Books'));
const LendBookPage = lazy(() => import('./pages/borrow/LendBook'));
const BorrowedBooks = lazy(() => import('./pages/borrow/BorrowedBooks'));
const PayFeesPage = lazy(() => import('./pages/fees_sub/PayFees'));

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const excludedPaths = ['/login', '/register', '/chat', '/forgot-password', '/reset-password', '/verify-email', '/verify-email'];
  const [showNavbar, setShowNavbar] = useState(true);
  
  useEffect(() => {
    // Hide Navbar on Login and Register routes
    const shouldShowNavbar = !excludedPaths.some((path) => location.pathname.includes(path));
    setShowNavbar(shouldShowNavbar);
  }, [location]);


  useEffect(() => {
    const userCookie = Cookies.get('c_user');
    if (!userCookie) {
      navigate('/login');
    }
  }, [navigate]);

  return (
      <Suspense>
        {showNavbar && <NavigationBar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/students" element={<StudentPage />} />
          <Route path="/add-student" element={<NewStudentPage />} />
          <Route path="/add-book" element={<NewBookPage />} />
          <Route path="/lend-book" element={<LendBookPage />} />
          <Route path="/borrowed-books" element={<BorrowedBooks />} />
          <Route path="/books/:category" element={<BooksPage />} />
          <Route path="/pay-fees" element={<PayFeesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
  );
}

export default App;