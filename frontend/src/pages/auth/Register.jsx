import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Axios from 'axios';
import './auth.css';


const Register = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    const emailValue = event.target.value.toLowerCase().trimStart();
    setFormData({...formData,  email: emailValue });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
        ...formData,
        [name]: value.trimStart()
    });
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
    setSuccessMessage('');
    Axios.post('http://localhost:8000/api/auth/register', formData)
      .then(res => {
        console.log(res.data);
        setLoading(false);
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setValidated(false);
        setSuccessMessage(res.data.message);
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
        <h1 className='fs-5 mb-4'>Register</h1>
        <Form.Group className='mb-4'>
          <input
            value={formData.name}
            onChange={handleInputChange}
            className='form-control'
            type='name'
            name='name'
            placeholder='Full Name'
            required
          />
          <Form.Control.Feedback type='invalid'>Enter a valid name.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-4'>
          <input
            value={formData.email}
            onChange={handleEmailChange}
            className='form-control'
            type='email'
            name='email'
            placeholder='Email'
            required
          />
          <Form.Control.Feedback type='invalid'>Enter a valid email.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-4'>
          <input
            value={formData.password}
            onChange={handleInputChange}
            className='form-control'
            type='password'
            name='password'
            placeholder='Password'
            minLength={6}
            required
          />
          <Form.Control.Feedback type='invalid'>Enter a six length password.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-4'>
          <input
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className='form-control'
            type='password'
            name='confirmPassword'
            placeholder='Confirm password'
            minLength={6}
            required
          />
          <Form.Control.Feedback type='invalid'>Enter a six length password.</Form.Control.Feedback>
        </Form.Group>
        {error && <p className='text-danger'>{error}</p>}
        {successMessage && <p className='text-success'>{successMessage}</p>}
        <button className={`btn btn-success mb-3 ${loading && 'disabled'}`} type='submit'>
          {loading ? <span><Spinner animation='border' size='sm'></Spinner> loading...</span> : 'Register'}
        </button>
        <p className='mb-0'>Already have an account? <a href='/login'>Login</a></p>
      </Form>
    </div>
  )
}

export default Register