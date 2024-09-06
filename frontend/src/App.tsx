import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './assets/pages/Home';
import Header from './assets/components/Header';
import Login from './assets/pages/Login';
import Register from './assets/pages/Register';
import Footer from './assets/components/Footer';
import { Admin } from './assets/pages/Admin';


function App() {
  return (
    <Router>
      <Header />
      <main className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
