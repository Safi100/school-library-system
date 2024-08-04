import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import  Axios from 'axios';
import './userProfile.css';

const UserProfile = () => {
    const { userID } = useParams();
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        Axios.get(`http://localhost:8000/api/user/profile/${userID}`)
        .then(res => {
            console.log(res.data);
            setLoading(false);
            setUser(res.data);
        })
        .catch(err => {
            setLoading(false);
            setError(err.response.data);
            console.log(err);
        })
    }, [userID])
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
                                <span className={`${user.isVerified ? 'verified' : 'unverified'}`}>{`${user.isVerified ? 'Verified' : 'Unverified'}`}</span>
                            </h5>
                        </div>
                        <div className="card-footer text-white">
                            Joined on {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                    </div>
                </>}
            </div>
        </div>
    );
}

export default UserProfile;