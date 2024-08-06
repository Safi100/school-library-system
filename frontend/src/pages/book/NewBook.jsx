import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Spinner from 'react-bootstrap/Spinner';
import Axios from 'axios';

const NewBook = () => {
  const [validated, setValidated] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publication_year: '',
    description: '',
    language: '',
    pages: '',
    categories: []
  });

  useEffect(() => {
    Axios.get('http://localhost:8000/api/category')
      .then(res => {
        setCategories(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value.trimStart()
    });
  };

  const handleCategoryChange = (selectedOptions) => {
    setFormData({
      ...formData,
      categories: selectedOptions ? selectedOptions.map(option => option.value) : []
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    setError('');
    setSuccessMessage('');
    setLoading(true);
    Axios.post('http://localhost:8000/api/book/add-book', formData)
      .then(res => {
        setSuccessMessage('Book added successfully');
        setLoading(false);
        setValidated(false);
        // Reset formData including categories
        setFormData({
          title: '',
          author: '',
          publication_year: '',
          description: '',
          language: '',
          pages: '',
          categories: []
        });
      })
      .catch(error => {
        setLoading(false);
        setError(error.response.data.message || 'An error occurred');
      });
  };

  return (
    <div className='wrapper py-4'>
      <Form className='row' noValidate validated={validated} onSubmit={handleSubmit}>
        <h1>Add New Book</h1>
        <Form.Group className='mb-4 col-6'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter book title'
            name='title'
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type='invalid'>Please provide a valid title.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-4 col-6'>
          <Form.Label>Author</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter book author'
            name='author'
            value={formData.author}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type='invalid'>Please provide a valid author.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-4 col-6'>
          <Form.Label>Publication Year</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter publication year'
            name='publication_year'
            value={formData.publication_year}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type='invalid'>Please provide a valid publication year.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-4 col-6'>
          <Form.Label>Language</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter book language'
            name='language'
            value={formData.language}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type='invalid'>Please provide a valid language.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-4 col-6'>
          <Form.Label>Pages</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter number of pages'
            name='pages'
            value={formData.pages}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type='invalid'>Please provide a valid number of pages.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-4 col-6'>
          <Form.Label>Categories</Form.Label>
          <Select
            isMulti
            name='categories'
            components={makeAnimated()}
            options={categories.map(category => ({ value: category._id, label: `${category.name}` }))}
            onChange={handleCategoryChange}
            value={categories.filter(category => formData.categories.includes(category._id)).map(category => ({ value: category._id, label: category.name }))}
            required
            className="basic-multi-select"
            classNamePrefix="select"
          />
          <Form.Control.Feedback type='invalid'>Please select at least one category.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-4 col-12'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            placeholder='Enter book description'
            name='description'
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <p className='mt-2'>words: {formData.description.length}</p>
          <Form.Control.Feedback type='invalid'>Please provide a valid description.</Form.Control.Feedback>
        </Form.Group>

        {error && <p className='text-danger'>{error}</p>}
        {successMessage && <p className='text-success'>{successMessage}</p>}
        <div>
            <button className={`btn btn-success mb-3 ${loading && 'disabled'}`} type='submit'>
            {loading ? <span><Spinner animation='border' size='sm'></Spinner> loading...</span> : 'Add Book'}
            </button>
        </div>
      </Form>
    </div>
  );
};

export default NewBook;