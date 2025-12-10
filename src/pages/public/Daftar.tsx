import { useEffect, useState } from "react";
import type { Pendaftar } from "../../types/Pendaftar";

import { Link } from "react-router-dom";
import { createPendaftar } from "../../services/pendaftar.service";

const initialForm: Pendaftar = {
  nama: "",
  nisn: "",
  asalSekolah: "",
  jurusan: "",
};

export default function Daftar() {
  const [form, setForm] = useState<Pendaftar>(initialForm);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      createPendaftar(form);

      setForm(initialForm);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mendaftar.");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="mx-4 p-6 border">
        {success && (
          <div className="bg-green-100 text-green-800 p-4 mb-4 rounded animate-pulse">
            Pendaftaran berhasil!
          </div>
        )}
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

          <div className="flex justify-between">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3">
              Daftar
            </button>
            <Link
              to="/"
              className="ml-4 bg-gray-500 hover:bg-gray-400 text-white px-4 py-3"
            >
              Kembali
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
