import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import  Axios from 'axios';
import './userProfile.css';

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [postError, setPostError] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        Axios.get(`http://localhost:8000/api/user/profile/`)
        .then(res => {
            setUser(res.data);
        })
        .catch(err => {
            setLoading(false);
            setError(err.response.data);
            console.log(err);
        })
    }, [])
    const sendVerifyEmail = () => {
        setPostError('');
        setSuccessMessage('');
        setLoading(true);
        Axios.post(`http://localhost:8000/api/auth/send-verification-email`)
       .then(res => {
        console.log(res.data);
        setLoading(false);
        setSuccessMessage(res.data.message);
       })
       .catch(err => {
        setLoading(false);
        console.log(err)
        setPostError(err.response.data);
    });
    }
    return (
        <div>
            <div className="wrapper py-4">
                {error ? <h2 className='text-danger'>{error}</h2> : 
                <>
                    <div className="card text-white bg-dark">
                        <div className="card-header fs-3">{user.name}</div>
                        <div className="card-body">
                            <h5 className="card-title">
                                {user.email}
                                <span onClick={sendVerifyEmail} className={`verify_btn ${user.isVerified ? 'verified' : 'unverified'}`}>{`${user.isVerified ? 'Verified' : 'Unverified'}`}</span>
                            </h5>
                        </div>
                        <div className="card-footer text-white">
                            Joined on {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                    </div>
                    {loading && <p className='my-4'>Loading...</p>  }
                    {successMessage && <p className='my-4 text-success'>{successMessage}</p>}
                    {postError && <p className='my-4 text-danger'>{postError}</p>}
                </>}
            </div>
        </div>
    );
}

export default UserProfile;