import { useEffect, useState } from "react";
import type { Pendaftar } from "../../types/Pendaftar";
import {
  deletePendaftar,
  getPendaftar,
  updatePendaftar,
} from "../../services/pendaftar.service";

const initialForm: Pendaftar = {
  nama: "",
  nisn: "",
  asalSekolah: "",
  jurusan: "",
};

export default function Pendaftar() {
  const [data, setData] = useState<Pendaftar[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [form, setForm] = useState<Pendaftar>(initialForm);
  const [updateId, setUpdateId] = useState<string>("");

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updatePendaftar(updateId, form);

      const newData = getPendaftar();
      setData(await newData);
      setUpdateId("");
    } catch (error) {
      alert("Gagal mengupdate pendaftar");
      console.log(error);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    try {
      const confirm = window.confirm("Yakin ingin menghapus pendaftar ini?");
      if (!confirm) return;
      await deletePendaftar(id!);
      const newData = getPendaftar();
      setData(await newData);
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
      <div className="flex gap-2">
        <table className="w-full border flex-2">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border border-gray-900 px-3 py-2 text-left">No</th>
              <th className="border border-gray-900 px-3 py-2 text-left">
                Nama
              </th>
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
                    <button
                      className="py-2 px-5 bg-gray-800 text-white  hover:bg-gray-700 w-full"
                      onClick={() => {
                        setUpdateId(item.id!);
                        setForm(item);
                      }}
                    >
                      edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {updateId && (
          <table className="w-full border flex-1">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="border border-gray-900 px-3 py-2 text-left">
                  NISN : {form.nisn}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border border-gray-900 px-3 py-2 text-left">
                  <form onSubmit={(e) => handleUpdate(e)} className="space-y-4">
                    <input
                      name="nama"
                      value={form.nama}
                      onChange={handleChange}
                      placeholder="Nama Lengkap"
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
                      <button
                        className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3"
                        type="submit"
                      >
                        Update
                      </button>
                      <button
                        className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3"
                        onClick={() => {
                          setUpdateId("");
                          setForm(initialForm);
                        }}
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
