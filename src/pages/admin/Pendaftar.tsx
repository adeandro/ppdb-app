import { useEffect, useState } from "react";
import type { Pendaftar } from "../../types/Pendaftar";
import {
  deletePendaftar,
  getPendaftar,
} from "../../services/pendaftar.service";

export default function Pendaftar() {
  const [data, setData] = useState<Pendaftar[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    getPendaftar().then((res) => setData(res));
  }, [data]);

  const filteredData = data.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.asalSekolah.toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    return sort === "asc"
      ? a.nama.localeCompare(b.nama, undefined, { sensitivity: "base" })
      : b.nama.localeCompare(a.nama, undefined, { sensitivity: "base" });
  });

  const handleDelete = async (id: string | undefined) => {
    try {
      const confirm = window.confirm("Yakin ingin menghapus pendaftar ini?");
      if (!confirm) return;
      deletePendaftar(id!);
    } catch (error) {
      console.log(error);
      alert("Gagal menghapus pendaftar");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Data Pendaftar</h1>

      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Cari nama atau asal sekolah..."
          className="border p-2  w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="border px-3 py-2  hover:bg-gray-800 hover:text-white"
          onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
        >
          Sort {sort === "asc" ? "Z-A" : "A-Z"}
        </button>

        {sortedData.length === 0 && data.length > 0 && (
          <div className="mb-4 text-red-600 font-semibold">
            Tidak ada pendaftar yang sesuai dengan pencarian.
          </div>
        )}
      </div>

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
            <th></th>
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
          {sortedData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border px-3 py-2">{index + 1}</td>
              <td className="border px-3 py-2">{item.nama}</td>
              <td className="border px-3 py-2">{item.asalSekolah}</td>
              <td className="border px-3 py-2">{item.jurusan}</td>
              <td className="border px-3 py-2">
                <div className=" flex gap-2 ">
                  <button
                    className="py-2 px-5 bg-gray-800 text-white  hover:bg-gray-700 w-full"
                    onClick={() => handleDelete(item.id)}
                  >
                    hapus
                  </button>
                  <button className="py-2 px-5 bg-gray-800 text-white  hover:bg-gray-700 w-full">
                    edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
