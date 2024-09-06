import React from 'react'
import { Link } from 'react-router-dom'
import HeaderSearch from './HeaderSearch'

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">PetCare</h1>
      <HeaderSearch />
      <nav>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/login" className="hover:underline">Login</Link></li>
          <li><Link to="/register" className="hover:underline">Register</Link></li>
          <li><Link to="/admin" className="hover:underline">Admin</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
