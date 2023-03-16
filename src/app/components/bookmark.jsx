import React from 'react'

const Bookmark = ({ bookmark, ...rest }) => {
  const bookmarkDark = <i className="bi bi-bookmark-fill"></i>
  const bookLight = <i className="bi bi-bookmark"></i>

  return (
    <button className="p-1" {...rest}>
      {bookmark ? bookmarkDark : bookLight}
    </button>
  )
}

export default Bookmark
