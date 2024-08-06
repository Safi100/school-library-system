import {useState, useEffect} from 'react'
import Axios from 'axios'
import './student.css'

const Student = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get('http://localhost:8000/api/student')
     .then(res => {
        setStudents(res.data);
        setLoading(false);
    })
    .catch(error => {
        setLoading(false);
        console.log(error);
     })
  }, [])

  return (
    <div className='wrapper py-4'>
        {students.length < 1 ? <h2 className='text-danger'>No students yet...</h2> :
        <div className='d-flex flex-column gap-4'>
            {students.map(student => (
            <div className="card text-white bg-dark student_card">
                <div className="card-header fs-3">{student.name}</div>
                <div className="card-body">
                    <h5 className="card-title">{student.email}</h5>
                    <h5 className="card-title">{student.gender}</h5>
                    <h5 className="card-title">{student.phone_number}</h5>
                </div>
                <div className="card-footer text-white">
                    Added on {new Date(student.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
            </div>
            ))}
        </div>
        }
    </div>
  )
}

export default Student