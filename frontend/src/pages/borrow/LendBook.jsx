import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Spinner from 'react-bootstrap/Spinner';
import Axios from 'axios';
import './borrow.css'

const LendBook = () => {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    student_id: null,
    book_id: null,
  });

  const handleStudentChange = (selectedOptions) => {
    setFormData({
      ...formData,
      student_id: selectedOptions ? selectedOptions.value : null
    });
  };

  const handleBookChange = (selectedOption) => {
    setFormData({
      ...formData,
      book_id: selectedOption ? selectedOption.value : null,
    });
  };

  useEffect(() => {
    Axios.get('http://localhost:8000/api/borrow/students_and_books')
    .then(res => {
        setStudents(res.data.students);
        setBooks(res.data.books);
        setLoading(false);
    })
    .catch(error => {
        setLoading(false);
        console.log(error);
    })
  }, [])
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);
    Axios.post(`http://localhost:8000/api/borrow/lend-book/${formData.book_id}/${formData.student_id}`)
    .then(res => {
      setSuccessMessage(res.data.message);
      setLoading(false);
      setFormData({
        student_id: null,
        book_id: null,
      });
      // Remove the lent book from the books list
      setBooks(prevBooks => prevBooks.filter(book => book._id !== res.data.bookID));
    })
    .catch(error => {
      setLoading(false);
      setError(error.response.data);
      console.log(error);
    });
  }

  return (
    <div className='wrapper py-4'>
        <Form className='row lend_form' onSubmit={handleSubmit}>
          <Form.Group className='mb-4'>
            <Form.Label>Students</Form.Label>
            <Select
                name='student_id'
                isClearable={true}
                components={makeAnimated()}
                options={students.map(student => ({ value: student._id, label: `${student.name}` }))}
                onChange={handleStudentChange}
                value={students.find(student => student._id === formData.student_id) ? { value: formData.student_id, label: students.find(student => student._id === formData.student_id).name } :  null}           
                className="basic-signle text-dark"
                classNamePrefix="select"
            />
          </Form.Group>
          <Form.Group className='mb-4'>
            <Form.Label>Books</Form.Label>
            <Select
              name='book_id'
              isClearable={true}
              components={makeAnimated()}
              options={books.map(book => ({ value: book._id, label: book.title }))}
              onChange={handleBookChange}
              value={books.find(book => book._id === formData.book_id) ? { value: formData.book_id, label: books.find(book => book._id === formData.book_id).title } :  null}           
              className="basic-single text-dark"
              classNamePrefix="select"
            />
          </Form.Group>
          {error && <p className='text-danger'>{error}</p>}
          {successMessage && <p className='text-success'>{successMessage}</p>}
          <div>
            <button className={`btn btn-primary mb-3 ${loading && 'disabled'}`} type='submit'>
            {loading ? <span><Spinner animation='border' size='sm'></Spinner> loading...</span> : 'Lend book'}
            </button>
          </div>
        </Form>
    </div>
  )
}

export default LendBook