import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import './book.css'

const Book = () => {
  const {category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);

  useEffect(() => {
    Axios.get(`http://localhost:8000/api/book/${category}`)
     .then(res => {
        setLoading(false);
        setBooks(res.data);
        console.log(res.data);
        
     })
     .catch(error => {
        setError(error.response.data);
        console.log(error);
     })
  }, [category])

  return (
    <div className='wrapper py-4'>
      {error ? <h2 className='text-danger'>{error}</h2> :
      <div className='row gap-4'>
        {books.length === 0 && <h2 className="text-danger">No books in this category yet...</h2>}
        {books.map(book => (
          <div key={book._id} className='card col col-4 mb-3 bg-dark text-white'>
            <div className='card-body'>
              <h5 className='card-title'>{book.title}</h5>
              <p className='card-text'>Author: {book.author}</p>
              <p className='card-text'>Publication year: {book.publication_year}</p>
              <p className='card-text'>{book.description}</p>
              <div>
                <p className='mb-2'>Categories:</p>
                <div className='categories_container'>
                  {book.categories.map(category => (
                    <span className='category' key={category._id}>{category.name} </span>
                  ))}
                </div>
              </div>
              {/* <a href={`/book/${book.id}`} className='stretched-link'>Read More</a> */}
            </div>
          </div>
        ))}
      </div>
      }
    </div>
  )
}

export default Book