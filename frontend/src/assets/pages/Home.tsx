import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  contactInfo: string;
  pic: string;
}

export default function Home() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchName, setSearchName] = useState('');
  const [searchSpecialty, setSearchSpecialty] = useState('');
  const [sortedDoctors, setSortedDoctors] = useState<Doctor[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/doctors')
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data);
        setSortedDoctors(data); // Initialize with fetched data
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    let filteredDoctors = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchName.toLowerCase()) &&
      doctor.specialty.toLowerCase().includes(searchSpecialty.toLowerCase())
    );
    setSortedDoctors(filteredDoctors);
  }, [searchName, searchSpecialty, doctors]);

  const handleSort = (criteria: 'name' | 'specialty') => {
    const sorted = [...sortedDoctors].sort((a, b) => a[criteria].localeCompare(b[criteria]));
    setSortedDoctors(sorted);
  };

  const handleDoctorClick = (doctorId: number) => {
    // Redirect to OwnerCard first
    navigate(`/owner/${doctorId}`);
  };

  return (
    <main className="flex flex-col items-center bg-gray-50 min-h-screen">
      {/* Main Banner */}
      <div className="relative w-full">
        <img src="/src/assets/image/five.jpeg" alt="Main Banner" className="w-full h-60 md:h-80 object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-gradient-to-t from-black via-transparent to-transparent p-4">
          <p className="font-bold text-2xl md:text-4xl mb-2">Temukan Dokter Hewan Terbaik</p>
          <p className="text-sm md:text-lg max-w-lg">
            Wujudkan kesehatan hewan peliharaanmu dengan konsultasi dari dokter hewan terbaik
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg mt-8 p-4">
        <form className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            className="flex-1 h-12 border rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Spesialisasi"
            value={searchSpecialty}
            onChange={(e) => setSearchSpecialty(e.target.value)}
          />
          <input
            type="text"
            className="flex-1 h-12 border rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Nama Dokter"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Link to="search" className="flex items-center justify-center bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition">
            <Search />
          </Link>
        </form>
      </div>

      {/* Doctors Section */}
      <section className="w-full max-w-4xl mt-8">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-4 mb-4">
            <img src="/src/assets/room/clock.webp" className="w-12" alt="Clock Icon" />
            <h2 className="font-bold text-xl md:text-2xl">Jaga Kesehatan Hewan Peliharaan</h2>
          </div>
          <p className="text-center text-sm md:text-base mb-8">
            Dapatkan layanan kesehatan terbaik untuk hewan peliharaanmu dengan harga spesial di seluruh Indonesia!
          </p>
        </div>

        {/* Sorting Controls */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => handleSort('name')}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
          >
            Sort by Name
          </button>
          <button
            onClick={() => handleSort('specialty')}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
          >
            Sort by Specialty
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => handleDoctorClick(doctor.id)}
            >
              <img src={doctor.pic} alt={doctor.name} className="w-full h-32 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="flex flex-col items-center mt-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <img src="/src/assets/room/clock.webp" className="w-12" alt="Clock Icon" />
            <h2 className="font-bold text-xl md:text-2xl">Menikmati Kesehatan Terbaik untuk Hewan</h2>
          </div>
          <p className="text-center text-sm md:text-base max-w-lg">
            Temukan dokter hewan terbaik untuk kesehatan peliharaanmu dan nikmati layanan berkualitas dengan kenyamanan yang tiada tara.
          </p>
        </div>

        {/* Promo Section */}
        <div className="w-full max-w-4xl mb-8">
          <img src="/src/assets/room/promo.webp" alt="Promo" className="w-full object-cover" />
        </div>
      </section>
    </main>
  );
}
