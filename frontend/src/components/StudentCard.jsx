import React from 'react'
import Warning from '../assets/warning.png'

const StudentCard = ({student}) => {
  return (
    <div className="card student_card col-6">
        <div className="card-header fs-3">{student.name}</div>
        <div className="card-body">
          <p className='mb-0'>{student.email}</p>
          <p className='mb-0'>{student.phone_number}</p>
          <p className='mt-2'>{
          student.subscription_fees.length > 0 ? 
          <>
          <span className='d-flex align-items-center gap-2'>
            Last paid ${student.subscription_fees[student.subscription_fees.length - 1]?.amount} on {new Date(student.subscription_fees[student.subscription_fees.length - 1]?.payment_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            {student.warning ? <img style={{width: '20px'}} src={Warning} alt="warning-icon" /> : null }
          </span>
          {student.delay_days > 0 ? <p className='text-danger'>The student was late in paying for {student.delay_days} day(s).</p> : null}
          <p>Subscription renewed {student.subscription_fees.length} time(s).</p>
          </>
          : 
          <span className='text-danger'>The student has not paid any subscription yet.</span>
          }
          </p>
        </div>
        <div className="card-footer">
            Added on {new Date(student.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
        </div>
    </div>
  )
}

export default StudentCard