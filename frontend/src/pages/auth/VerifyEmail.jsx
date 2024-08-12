import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import './auth.css'

const VerifyEmail = () => {
    const {id, token} = useParams()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        Axios.post(`http://localhost:8000/api/auth/verify-email/${id}/${token}`)
        .then(res => {
            setMessage(res.data.message)
            setLoading(false)
        })
        .catch(err => {
            setLoading(false)
            setError(err.response.data)
            console.log(err);
        })
    }, [])
    return (
        <div className='auth_bg'>
            <form className='bg-white p-3'>
                {loading && <p>Loading...</p>}
                {message && <p className='text-success'>{message}</p>}
                {error && <p className='text-danger'>{error}</p>}
                <p>Go back to <a href="/">Home page</a></p>
            </form>
        </div>
    );
}

export default VerifyEmail;