import React from 'react'

const MeetingsCard = ({ value }) => {
  return (
    <div className="card mb-3">
      <div className="card mb-3">
        <div className="card-body d-flex flex-column justify-content-center text-center">
          <h5 className="card-title">
            <span>Completed meetings</span>
          </h5>

          <h1 className="display-1">{value}</h1>
        </div>
      </div>
    </div>
  )
}

export default MeetingsCard
