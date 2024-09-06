import React, { useEffect, useState } from "react";
import { Animal } from "../App";

export default function AnimalCard({
  animal,
  onDelete,
  onEdit,
}: {
  animal: Animal;
  onDelete: (id: number) => void;
  onEdit: (animal: Partial<Animal>) => void;
}) {
  console.log('AnimalCard props:', { animal, onDelete, onEdit });

  return (
    <div className="flex items-center justify-between border p-4 rounded-md">
      <div className="flex-1">
        <p className="text-lg font-semibold">
          {animal.id} - {animal.species}
        </p>
        <p className="text-sm text-gray-500">
          {animal.name} - {animal.age} tahun, {animal.gender}, {animal.weight} kg
        </p>
      </div>
      <div className="flex gap-4">
        <button
          className="bg-deep-pink hover:bg-pink-700 text-white rounded-lg px-4 py-2"
          onClick={() => {
            if (window.confirm("Apakah Anda yakin ingin menghapus hewan ini?")) {
              onDelete(animal.id);
            }
          }}
        >
          Hapus
        </button>
        <button
          className="bg-dark-violet hover:bg-purple-900 text-white rounded-lg px-4 py-2"
          onClick={() => onEdit(animal)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
