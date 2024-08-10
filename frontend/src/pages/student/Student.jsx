import {useState, useEffect} from 'react'
import Axios from 'axios'
import StudentCard from '../../components/StudentCard'
import './student.css'

const Student = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get('http://localhost:8000/api/student')
     .then(res => {
        setStudents(res.data);
        setLoading(false);
        console.log(res.data);
        
    })
    .catch(error => {
        setLoading(false);
        console.log(error);
     })
  }, [])

  return (
    <div className='wrapper py-4'>
        {students.length < 1 ? <h2 className='text-danger'>No students yet...</h2> :
        <div className='row gap-4'>
            {students.map(student => (
                <StudentCard student={student} key={student._id} />
            ))}
        </div>
        }
    </div>
  )
}

export default Student