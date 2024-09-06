// DoctorCard.tsx
import React from 'react';
import { Doctor } from '../pages/Search';

interface DoctorCardProps {
  doctor: Doctor;
  onEdit: () => void;
  onDelete: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onEdit, onDelete }) => {
  return (
    <div className="border p-4 mb-4 bg-white rounded shadow-lg">
      <h3 className="font-bold text-lg">{doctor.name}</h3>
      <p>Spesialisasi: {doctor.specialty}</p>
      <p>Kontak: {doctor.contactInfo}</p>
      <div className="flex space-x-4 mt-4">
        <button onClick={onEdit} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Edit
        </button>
        <button onClick={onDelete} className="bg-red-600 text-white p-2 rounded hover:bg-red-700">
          Delete
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
