import { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import HeaderSearch from "../components/HeaderSearch";
import Footer from "../components/Footer";

export interface Doctor {
    id: number;
    name: string;
    specialty: string;
    location: string;  // Lokasi praktek
    address: string;
    contactInfo: string;
    picture: string;
    description: string;
    available: boolean;
}

export default function Search() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 8;
    const indexOfLastItem: number = currentPage * itemsPerPage;
    const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
    const currentDoctors: Doctor[] = doctors.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

    useEffect(() => {
        fetch("http://localhost:8080/api/doctors")
            .then((response) => response.json())
            .then((data) => setDoctors(data));
    }, []);

    return (
        <>
            <HeaderSearch />
            <div className="flex flex-row">
                <div className="w-1/4 h-auto flex flex-col">
                    <div className="text-center font-bold text-xl pt-8">Filter Dokter Hewan</div>
                    
                    {/* Filter Spesialisasi */}
                    <div className="text-sm font-medium pl-8 pt-4">Spesialisasi</div>
                    <div className="p-4">
                        <form className="flex flex-col gap-3">
                            <label className="flex flex-row items-center text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Bedah
                            </label>
                            <label className="flex flex-row items-center text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Dermatologi
                            </label>
                            <label className="flex flex-row items-center text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Gigi
                            </label>
                            <label className="flex flex-row items-center text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Pediatri
                            </label>
                            <button className="bg-blue-600 text-white rounded h-8 text-sm mt-4">Perbarui</button>
                        </form>
                    </div>
                    
                    {/* Filter Lokasi */}
                    <div className="text-sm font-medium pl-8 pt-4">Lokasi Praktek</div>
                    <div className="p-4">
                        <form className="flex flex-col gap-3">
                            <label className="flex flex-row items-center text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Jakarta
                            </label>
                            <label className="flex flex-row items-center text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Bandung
                            </label>
                            <label className="flex flex-row items-center text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Surabaya
                            </label>
                            <label className="flex flex-row items-center text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Yogyakarta
                            </label>
                            <button className="bg-blue-600 text-white rounded h-8 text-sm mt-4">Perbarui</button>
                        </form>
                    </div>
                    
                    {/* Filter Ketersediaan */}
                    <div className="text-sm font-medium pl-8 pt-4">Ketersediaan</div>
                    <div className="p-4">
                        <form className="flex flex-col gap-3">
                            <label className="flex flex-row items-center text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Tersedia Hari Ini
                            </label>
                            <label className="flex flex-row items-center text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Jam Kerja Fleksibel
                            </label>
                            <button className="bg-blue-600 text-white rounded h-8 text-sm mt-4">Perbarui</button>
                        </form>
                    </div>
                </div>
                
                <div className="w-3/4 h-auto p-4 text-xs">
                    {currentDoctors.map((doc) => (
                        <DoctorCard doctor={doc} key={doc.id} onEdit={function (): void {
                            throw new Error("Function not implemented.");
                        } } onDelete={function (): void {
                            throw new Error("Function not implemented.");
                        } } />
                    ))}
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 mx-1 bg-gray-300 text-black rounded hover:bg-gray-400 w-24"
                        >
                            Previous
                        </button>
                        {Array.from({ length: Math.ceil(doctors.length / itemsPerPage) }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginate(i + 1)}
                                className={`p-2 mx-1 ${currentPage === i + 1 ? 'bg-blue-600 text-white w-8' : 'bg-gray-300 text-black w-8'} rounded hover:bg-gray-400`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === Math.ceil(doctors.length / itemsPerPage)}
                            className="p-2 mx-1 bg-gray-300 text-black rounded hover:bg-gray-400 w-24"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
