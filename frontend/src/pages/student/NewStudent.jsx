import {useEffect, useState} from 'react'
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Axios from 'axios';


const NewStudent = () => {
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone_number: '',
      gender: ''
    });

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
        Axios.post('http://localhost:8000/api/student', formData)
          .then(res => {
            console.log(res.data);
            setLoading(false);
            setFormData({
                name: '',
                email: '',
                phone_number: '',
                gender: ''
            });
            setValidated(false);
            setSuccessMessage(res.data);
          })
          .catch(error => {
            console.log(error);
            setLoading(false);
            setError(error.response.data);
          });
      };

    

  return (
    <div className='wrapper py-4'>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h1>Add New Student</h1>
            <Form.Group className='mb-4'>
                <Form.Label>Student Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleInputChange} required />
                <Form.Control.Feedback type="invalid">Please enter a valid name.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-4'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleEmailChange} required />
                <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-4'>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" name="phone_number" placeholder="Enter phone number" value={formData.phone_number} onChange={handleInputChange} required />
                <Form.Control.Feedback type="invalid">Please enter a valid phone number.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-4'>
                <Form.Label>Gender</Form.Label>
                <Form.Control as="select" name="gender" value={formData.gender} onChange={handleInputChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">Please select a gender.</Form.Control.Feedback>
            </Form.Group>
            {error && <p className='text-danger'>{error}</p>}
            {successMessage && <p className='text-success'>{successMessage}</p>}
            <button className={`btn btn-success mb-3 ${loading && 'disabled'}`} type='submit'>
            {loading ? <span><Spinner animation='border' size='sm'></Spinner> loading...</span> : 'Register'}
            </button>
        </Form>
    </div>
  )
}

export default NewStudent