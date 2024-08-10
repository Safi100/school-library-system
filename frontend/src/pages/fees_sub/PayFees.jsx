import {useEffect, useState} from 'react'
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Select from 'react-select';
import Axios from 'axios';
import './fees.css'

const PayFees = () => {
    const [validated, setValidated] = useState(false);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [formData, setFormData] = useState({
        student_id: '',
        amount: '',
    })

    const handleStudentChange = (selectedOptions) => {
        setFormData({
          ...formData,
          student_id: selectedOptions ? selectedOptions.value : null
        });
    };

    useEffect(() => {
        Axios.get('http://localhost:8000/api/student/name')
        .then(res => {
            setStudents(res.data);
        })
        .catch(error => console.log(error));
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
        setLoading(true);
        setSuccessMessage('');
        Axios.post(`http://localhost:8000/api/subscription_fees/pay/${formData.student_id}`, {amount: formData.amount})
        .then(res => {
            setSuccessMessage(res.data);
            setLoading(false);
            setFormData({
                student_id: '',
                amount: '',
            });
            setValidated(false);

        })
        .catch(error => {
            setLoading(false);
            setError(error.response.data);
            console.log(error);
        });
    }

    return (
        <div className='wrapper py-4'>
            <Form className='pay_fees_form row' noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className='mb-4'>
                    <Form.Label>Students</Form.Label>
                    <Select
                        name='student_id'
                        isClearable={true}
                        options={students.map(student => ({ value: student._id, label: `${student.name}` }))}
                        onChange={handleStudentChange}
                        value={students.find(student => student._id === formData.student_id) ? { value: formData.student_id, label: students.find(student => student._id === formData.student_id).name } :  null}           
                        className="basic-signle text-dark"
                        classNamePrefix="select"
                    />
                </Form.Group>
                <Form.Group className='mb-4'>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter amount'
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Please enter a valid amount.</Form.Control.Feedback>
                </Form.Group>
                {error && <p className='text-danger'>{error}</p>}
                {successMessage && <p className='text-success'>{successMessage}</p>}
                <div>
                    <button className={`btn btn-primary mb-3 ${loading && 'disabled'}`} type='submit'>
                    {loading ? <span><Spinner animation='border' size='sm'></Spinner> loading...</span> : 'Pay fees'}
                    </button>
                </div>
            </Form>
        </div>
    )
}

export default PayFees