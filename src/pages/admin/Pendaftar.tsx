import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import type { Pendaftar } from "../../types/Pendaftar";

export default function Pendaftar() {
  const [data, setData] = useState<Pendaftar[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "pendaftar"));
      const result: Pendaftar[] = snapshot.docs.map((doc) => ({
        ...(doc.data() as Pendaftar),
      }));
      setData(result);
    };

    fetchData();
  }, []);

  const filteredData = data.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.asalSekolah.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Data Pendaftar</h1>

      <input
        type="text"
        placeholder="Cari nama atau asal sekolah..."
        className="border p-2 mb-4 w-full md:w-64"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredData.length === 0 && data.length > 0 && (
        <div className="mb-4 text-red-600 font-semibold">
          Tidak ada pendaftar yang sesuai dengan pencarian.
        </div>
      )}

      <table className="min-w-full border">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="border border-gray-900 px-3 py-2 text-left">No</th>
            <th className="border border-gray-900 px-3 py-2 text-left">Nama</th>
            <th className="border border-gray-900 px-3 py-2 text-left">
              Asal Sekolah
            </th>
            <th className="border border-gray-900 px-3 py-2 text-left">
              Jurusan
            </th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={4} className="border px-3 py-2 text-center">
                <h2 className="text-4xl font-bold">Belum ada pendaftar</h2>
              </td>
            </tr>
          )}
          {filteredData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border px-3 py-2">{index + 1}</td>
              <td className="border px-3 py-2">{item.nama}</td>
              <td className="border px-3 py-2">{item.asalSekolah}</td>
              <td className="border px-3 py-2">{item.jurusan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
