import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Axios from 'axios';
import './auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value.toLowerCase());
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setError('');
    setLoading(true);

    Axios.post('http://localhost:8000/api/auth/login', { email, password })
      .then(res => {
        console.log(res.data);
        navigate('/');
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        setError(error.response.data);
      });
  };

  return (
    <div className='auth_bg'>
      <Form className='bg-white p-4' noValidate validated={validated} onSubmit={handleSubmit}>
        <h1 className='fs-5 mb-4'>Welcome back!</h1>
        <Form.Group className='mb-4'>
          <input
            value={email}
            onChange={handleEmailChange}
            className='form-control'
            type='email'
            placeholder='Email'
            required
          />
          <Form.Control.Feedback type='invalid'>Enter a valid email.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-4'>
          <input
            value={password}
            onChange={handlePasswordChange}
            className='form-control'
            type='password'
            placeholder='Password'
            minLength={6}
            required
          />
          <Form.Control.Feedback type='invalid'>Enter a six length password.</Form.Control.Feedback>
        </Form.Group>
        {error && <p className='text-danger'>{error}</p>}
        <button className={`btn btn-success mb-3 ${loading && 'disabled'}`} type='submit'>
          {loading ? <span><Spinner animation='border' size='sm'></Spinner> loading...</span> : 'Login'}
        </button>
        <p className='mb-0'>Don't have an account? <a href='/register'>Register now</a></p>
      </Form>
    </div>
  );
};

export default Login;