import { useParams, useNavigate } from 'react-router-dom';

const OwnerCard: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();

  const handleAnimalClick = () => {
    // Redirect to AnimalCard with ownerId or doctorId
    navigate(`/animal/${doctorId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Informasi Pemilik untuk Dokter ID: {doctorId}</h1>
      {/* Formulir dan logika untuk menambah/memperbarui informasi pemilik */}

      {/* Button or link to go to AnimalCard */}
      <button
        onClick={handleAnimalClick}
        className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
      >
        Manage Animal
      </button>
    </div>
  );
};

export default OwnerCard;
