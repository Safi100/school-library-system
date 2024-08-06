import {useEffect, useState} from 'react'
import Axios from 'axios'

const Home = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:8000/api/category')
     .then(res => setCategories(res.data))
     .catch(error => console.error(error))
  }, [])

  return (
    <div className='wrapper py-4'>
      <div className="row gap-4">
        {categories.map(category => (
          <a href={`/books/${category.name}`} key={category.id} className='card col col-3 mb-3'>
            <div className='card-body'>
              <h5 className='card-title'>{category.name}</h5>
              <p className='card-text'>{category.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Home