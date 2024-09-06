import { useParams } from 'react-router-dom';

const AnimalCard: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();

  // Implementasi logika untuk menampilkan dan mengelola informasi hewan berdasarkan doctorId

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Informasi Hewan untuk Dokter ID: {doctorId}</h1>
      {/* Formulir dan logika untuk menambah/memperbarui informasi hewan */}
    </div>
  );
};

export default AnimalCard;
