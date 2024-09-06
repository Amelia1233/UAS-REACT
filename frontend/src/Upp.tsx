import React, { useEffect, useState } from "react";
import AnimalCard from "./components/AnimalCard";

export interface Animal {
  id: number;
  species: string;
  name: string;
  age: number;
  gender: string;
  weight: string;
}

export default function Upp() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [animal, setAnimal] = useState<Partial<Animal>>({
    species: "",
    name: "",
    age: 0,
    gender: "",
    weight: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [weightFilter, setWeightFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/animals")
      .then((response) => response.json())
      .then((data) => {
        const sortedAnimals = data.sort((a: Animal, b: Animal) => a.id - b.id);
        setAnimals(sortedAnimals);
      });
  }, []);

  function handleAdd() {
    const animalToSave = { ...animal };
    fetch("http://localhost:8080/api/animals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(animalToSave),
    })
      .then((response) => response.json())
      .then((newAnimal) => {
        const updatedAnimals = [...animals, newAnimal].sort((a, b) => a.id - b.id);
        setAnimals(updatedAnimals);
        setAnimal({
          species: "",
          name: "",
          age: 0,
          gender: "",
          weight: "",
        });
      });
  }

  function handleDelete(id: number) {
    fetch(`http://localhost:8080/api/animals/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        const updatedAnimals = animals.filter((animal) => animal.id !== id).sort((a, b) => a.id - b.id);
        setAnimals(updatedAnimals);
      }
    });
  }

  function handleEdit() {
    const animalToSave = { ...animal };
    fetch(`http://localhost:8080/api/animals/${animal.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(animalToSave),
    })
      .then((response) => response.json())
      .then((updatedAnimal) => {
        const updatedAnimals = animals
          .map((a) =>
            a.id === updatedAnimal.id ? updatedAnimal : a
          )
          .sort((a, b) => a.id - b.id);
        setAnimals(updatedAnimals);
        setAnimal({
          species: "",
          name: "",
          age: 0,
          gender: "",
          weight: "",
        });
        setIsEditing(false);
        console.log('Success:', updatedAnimal);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }

  function handleSortByNameAsc() {
    const sortedAnimals = [...animals].sort((a, b) => a.name.localeCompare(b.name));
    setAnimals(sortedAnimals);
  }

  function handleSortByNameDesc() {
    const sortedAnimals = [...animals].sort((a, b) => b.name.localeCompare(a.name));
    setAnimals(sortedAnimals);
  }

  function handleSortByIdAsc() {
    const sortedAnimals = [...animals].sort((a, b) => a.id - b.id);
    setAnimals(sortedAnimals);
  }

  function handleSortByIdDesc() {
    const sortedAnimals = [...animals].sort((a, b) => b.id - a.id);
    setAnimals(sortedAnimals);
  }

  const filteredAnimals = animals.filter(animal =>
    animal.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (weightFilter === "" || animal.weight.includes(weightFilter))
  );

  return (
    <div className="bg-white rounded-lg p-6 mx-auto max-w-screen-xl">
      <h1 className="text-2xl font-bold mb-5 text-center">Pet Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Hewan" : "Tambah Hewan"}</h2>
          <label htmlFor="species" className="block text-sm font-medium">Spesies</label>
          <input
            id="species"
            className="border p-2 rounded w-full"
            value={animal.species}
            onChange={(e) => setAnimal({ ...animal, species: e.target.value })}
          />
          <label htmlFor="name" className="block text-sm font-medium mt-2">Nama</label>
          <input
            id="name"
            className="border p-2 rounded w-full"
            value={animal.name}
            onChange={(e) => setAnimal({ ...animal, name: e.target.value })}
          />
          <label htmlFor="age" className="block text-sm font-medium mt-2">Usia</label>
          <input
            id="age"
            type="number"
            className="border p-2 rounded w-full"
            value={animal.age}
            onChange={(e) =>
              setAnimal({ ...animal, age: parseInt(e.target.value) })
            }
          />
          <label htmlFor="gender" className="block text-sm font-medium mt-2">Jenis Kelamin</label>
          <select
            id="gender"
            className="border p-2 rounded w-full"
            value={animal.gender}
            onChange={(e) => setAnimal({ ...animal, gender: e.target.value })}
          >
            <option value="" disabled>Pilih Jenis Kelamin</option>
            <option value="Betina">Betina</option>
            <option value="Jantan">Jantan</option>
          </select>
          <label htmlFor="weight" className="block text-sm font-medium mt-2">Berat</label>
          <input
            id="weight"
            className="border p-2 rounded w-full"
            value={animal.weight}
            onChange={(e) =>
              setAnimal({ ...animal, weight: e.target.value })
            }
          />
          <button
            className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-2 mt-4 w-full"
            onClick={isEditing ? handleEdit : handleAdd}
          >
            {isEditing ? "Update" : "Simpan"}
          </button>
        </div>
        <div className="border rounded-lg p-4">
          <input
            type="text"
            placeholder="Cari hewan berdasarkan nama"
            className="border p-2 mb-5 w-full max-w-xs mx-auto block rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="text"
            placeholder="Cari hewan berdasarkan berat"
            className="border p-2 mb-5 w-full max-w-xs mx-auto block rounded"
            value={weightFilter}
            onChange={(e) => setWeightFilter(e.target.value)}
          />
          <div className="flex justify-center mb-5 space-x-2">
            <button
              className="bg-purple-400 hover:bg-purple-500 text-white p-2 rounded-lg"
              onClick={handleSortByNameAsc}
            >
              Sort A-Z (Nama)
            </button>
            <button
              className="bg-purple-400 hover:bg-purple-500 text-white p-2 rounded-lg"
              onClick={handleSortByNameDesc}
            >
              Sort Z-A (Nama)
            </button>
            <button
              className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-lg"
              onClick={handleSortByIdAsc}
            >
              Sort Asc (ID)
            </button>
            <button
              className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-lg"
              onClick={handleSortByIdDesc}
            >
              Sort Desc (ID)
            </button>
          </div>
          <div className="grid grid-cols-1 gap-5">
            {filteredAnimals.map((animal) => (
              <AnimalCard
                key={animal.id}
                animal={animal}
                onDelete={handleDelete}
                onEdit={(a) => {
                  setAnimal(a);
                  setIsEditing(true);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
