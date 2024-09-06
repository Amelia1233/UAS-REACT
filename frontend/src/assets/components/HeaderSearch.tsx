import React from 'react'

const HeaderSearch: React.FC = () => {
  return (
    <div className="flex-grow max-w-md mx-4">
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-3 py-2 rounded border border-gray-300"
      />
    </div>
  )
}

export default HeaderSearch
