import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const roles = [
    { code: 'ADMIN', label: 'Administrator' },
    { code: 'USER', label: 'User' },
    { code: 'MODERATOR', label: 'Moderator' } // Tambahkan role sesuai kebutuhan
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = { email, password, name, role };

    try {
      const response = await fetch('http://localhost:8080/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert('User registered successfully');
        navigate('/login'); // Redirect to login page
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div>
        <label className="block">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div>
        <label className="block">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div>
        <label className="block">Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border rounded p-2 w-full"
        >
          <option value="">Select a role</option>
          {roles.map((role) => (
            <option key={role.code} value={role.code}>
              {role.label}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
};

export default Register;
