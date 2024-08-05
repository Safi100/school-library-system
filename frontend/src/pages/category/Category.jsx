import {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Axios from 'axios'
import './category.css'

const Category = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    // form
    const [validated, setValidated] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('')
    const [postLoading, setPostLoading] = useState(false)

    useEffect(() => {
        Axios.get('http://localhost:8000/api/category')
       .then(res => {
         setCategories(res.data)
         setLoading(false)

       })
       .catch(err => {
         console.log(err)
         setLoading(false)
       })
    }, [])

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
        setPostLoading(true);
        
        Axios.post('http://localhost:8000/api/category/add-category', { categoryName: newCategoryName })
        .then(res => {
            console.log(res.data);
            setCategories([...categories, res.data])
            setNewCategoryName('');
            setPostLoading(false);
            setValidated(false);

        })
        .catch(err => {
            console.log(err)
            setError(err.response.data)
            setPostLoading(false)
        })
    }

  return (
    <div className='wrapper py-4'>
        <div className='d-flex gap-5'>
            <div className='col col-6'>
                <Form className='card p-4 form_stick' noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className='mb-4'>
                        <Form.Label>New Category Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter new category name'
                            value={newCategoryName}
                            onChange={e => setNewCategoryName(e.target.value.trimStart())}
                            required
                        />
                        <Form.Control.Feedback type='invalid'>Please provide a valid category name.</Form.Control.Feedback>
                    </Form.Group>
                    {error && <p className='text-danger'>{error}</p>}
                    <button className={`btn btn-success mb-3 ${postLoading && 'disabled'}`} type='submit'>
                    {postLoading ? <span><Spinner animation='border' size='sm'></Spinner> loading...</span> : 'Add Category'}
                    </button>
                </Form>
            </div>
        {categories.length < 1 ? <h2 className='text-danger'>No categories yet...</h2> : <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Categories</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category._id}>
                            <td>{category.name}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>}
        </div>
    </div>
  )
}

export default Category