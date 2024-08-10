import Warning from '../assets/warning.png';

const BorrowRecordCard = ({borrowed_book}) => {
  return (
    <div className='card col-4 p-0 mb-3'>
    <div className='card-header fs-4'>{borrowed_book.book.title}</div>
    <div className='card-body m-0'>
      <h5>Borrowed by:</h5>
      <p className='mb-0'>{borrowed_book.borrower.name}</p>
      <p className='mb-0'>{borrowed_book.borrower.email}</p>
      <p className='mb-0'>{borrowed_book.borrower.phone_number}</p>
    </div>
    <div className='card-footer'>
      <p className='card-text mb-0 d-flex gap-2 align-items-center'>
        <span>Borrowed on {new Date(borrowed_book.borrowDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
        <span className='d-flex'>{borrowed_book.warning ? <img style={{width: '20px'}} src={Warning} alt="warning-icon" /> : null}</span>
      </p>
      <p className='card-text'>
        Due date: {new Date(new Date(borrowed_book.borrowDate).getTime() + 7 * 24 * 60 * 60 * 1000)
        .toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
      </p>
    </div>
  </div>
  )
}

export default BorrowRecordCard