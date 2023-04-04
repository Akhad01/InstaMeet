import React from 'react'

const SearchStatus = ({ length }) => {
  const renderPhrase = () => {
    const world =
      length >= 2 && length <= 4 ? 'человека тусанут' : 'человек тусанет'

    return length > 0 ? (
      <span className="badge bg-primary">
        {`${length} ${world} с тобой сегодня`}
      </span>
    ) : (
      <span className="badge bg-danger">Никто с тобой не тусанет</span>
    )
  }

  return <h2>{renderPhrase()}</h2>
}

export default SearchStatus
