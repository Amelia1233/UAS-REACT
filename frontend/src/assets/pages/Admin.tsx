import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorCard from '../components/DoctorCard';
import { Doctor } from './Search';

export const Admin: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [newDoctor, setNewDoctor] = useState<Partial<Doctor>>({
    name: '',
    specialty: '',
    contactInfo: '',
  });
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [sortCriteria, setSortCriteria] = useState<string>('name');
  const navigate = useNavigate();

  // Fetch doctors from the backend
  useEffect(() => {
    fetch('http://localhost:8080/api/doctors')
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Handle adding a new doctor
  const handleAddDoctor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/doctors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDoctor),
    })
      .then((response) => response.json())
      .then((data) => {
        setDoctors([...doctors, data]);
        setNewDoctor({
          name: '',
          specialty: '',
          contactInfo: '',
        });
        navigate('/'); // Navigate back to home
      })
      .catch((error) => console.error('Error adding doctor:', error));
  };

  // Handle updating an existing doctor
  const handleUpdateDoctor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingDoctor) {
      fetch(`http://localhost:8080/api/doctors/${editingDoctor.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingDoctor),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedDoctors = doctors.map((doc) => doc.id === data.id ? data : doc
          );
          setDoctors(updatedDoctors);
          setEditingDoctor(null);
          navigate('/'); // Navigate back to home
        })
        .catch((error) => console.error('Error updating doctor:', error));
    }
  };

  // Handle deleting a doctor
  const handleDeleteDoctor = (id: number) => {
    fetch(`http://localhost:8080/api/doctors/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedDoctors = doctors.filter((doctor) => doctor.id !== id);
        setDoctors(updatedDoctors);
      })
      .catch((error) => console.error('Error deleting doctor:', error));
  };

  // Sorting function
  const sortedDoctors = [...doctors].sort((a, b) => {
    if (sortCriteria === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (sortCriteria === 'specialty') {
      return a.specialty.localeCompare(b.specialty);
    }
    return 0;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Formulir Menambah Dokter */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Tambah Dokter</h2>
        <form onSubmit={handleAddDoctor} className="space-y-4">
          <input
            type="text"
            placeholder="Nama Dokter"
            value={newDoctor.name || ''}
            onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
            className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input
            type="text"
            placeholder="Spesialisasi"
            value={newDoctor.specialty || ''}
            onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
            className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input
            type="text"
            placeholder="Kontak"
            value={newDoctor.contactInfo || ''}
            onChange={(e) => setNewDoctor({ ...newDoctor, contactInfo: e.target.value })}
            className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="submit" className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
            Tambah Dokter
          </button>
        </form>
      </div>

      {/* Formulir Memperbarui Dokter */}
      {editingDoctor && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Update Dokter</h2>
          <form onSubmit={handleUpdateDoctor} className="space-y-4">
            <input
              type="text"
              placeholder="Nama Dokter"
              value={editingDoctor.name || ''}
              onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
              className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input
              type="text"
              placeholder="Spesialisasi"
              value={editingDoctor.specialty || ''}
              onChange={(e) => setEditingDoctor({ ...editingDoctor, specialty: e.target.value })}
              className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input
              type="text"
              placeholder="Kontak"
              value={editingDoctor.contactInfo || ''}
              onChange={(e) => setEditingDoctor({ ...editingDoctor, contactInfo: e.target.value })}
              className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
              Update Dokter
            </button>
          </form>
        </div>
      )}

      {/* Sorting Dropdown */}
      <div className="mb-8">
        <label htmlFor="sortCriteria" className="block text-lg font-semibold mb-2">Sort By:</label>
        <select
          id="sortCriteria"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="name">Nama Dokter</option>
          <option value="specialty">Spesialisasi</option>
        </select>
      </div>

      {/* Daftar Dokter */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onEdit={() => setEditingDoctor(doctor)}
            onDelete={() => handleDeleteDoctor(doctor.id)} />
        ))}
      </div>
    </div>
  );
};
