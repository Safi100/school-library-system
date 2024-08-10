import { useEffect, useState } from 'react';
import Axios from 'axios';
import './borrow.css'
import BorrowRecordCard from '../../components/BorrowRecordCard';

const BorrowedBooks = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        Axios.get('http://localhost:8000/api/borrow/borrowed-books')
        .then(res => {
            setBorrowedBooks(res.data);
            setLoading(false);
            console.log(res.data);
        })
        .catch(error => {
          console.log(error);
          setError(error.response.data);
        });
    }, []);

  return (
    <div className='wrapper py-4 row justify-content-center gap-3'>
      {error ? <h2 className='text-danger'>{error}</h2> :
      <>
        {borrowedBooks.length === 0 && <h2 className="text-danger">No borrowed books yet...</h2>}
        {borrowedBooks.map(borrowed_book => (
          <BorrowRecordCard borrowed_book={borrowed_book} key={borrowed_book._id} />
        ))}
      </>
      }
    </div>
  )
}

export default BorrowedBooks