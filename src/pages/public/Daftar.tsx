import { useState } from "react";
import type { Pendaftar } from "../../types/Pendaftar";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

const initialForm: Pendaftar = {
  nama: "",
  nisn: "",
  asalSekolah: "",
  jurusan: "",
};

export default function Daftar() {
  const [form, setForm] = useState<Pendaftar>(initialForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "pendaftar"), {
        ...form,
        createdAt: new Date(),
      });

      setForm(initialForm);
      alert("Pendaftaran berhasil!");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mendaftar.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Form PPDB</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nama"
          value={form.nama}
          onChange={handleChange}
          placeholder="Nama Lengkap"
          className="w-full border p-2"
          required
        />

        <input
          name="nisn"
          value={form.nisn}
          onChange={handleChange}
          placeholder="NISN"
          className="w-full border p-2"
          required
        />

        <input
          name="asalSekolah"
          value={form.asalSekolah}
          onChange={handleChange}
          placeholder="Asal Sekolah"
          className="w-full border p-2"
          required
        />

        <select
          name="jurusan"
          value={form.jurusan}
          onChange={handleChange}
          className="w-full border p-2"
          required
        >
          <option value="">Pilih Jurusan</option>
          <option value="IPA">IPA</option>
          <option value="IPS">IPS</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2">Daftar</button>
      </form>
    </div>
  );
}
