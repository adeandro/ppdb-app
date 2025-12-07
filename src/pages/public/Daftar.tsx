import { useState } from "react";
import type { Pendaftar } from "../../types/Pendaftar";

const initialForm: Pendaftar = {
  nama: "",
  nisn: "",
  asalSekolah: "",
  jurusan: "",
};

export default function Daftar() {
  const [form, setForm] = useState<Pendaftar>(initialForm);
  const [submitted, setSummitted] = useState<Pendaftar[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSummitted([...submitted, form]);
    setForm(initialForm);
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

      {/* Preview hasil submit */}
      {submitted.length > 0 && (
        <div className="mt-6">
          <h2 className="font-bold mb-2">Data Masuk (Dummy)</h2>
          {submitted.map((s, i) => (
            <div key={i} className="border p-2 mb-2">
              {s.nama} – {s.jurusan}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
