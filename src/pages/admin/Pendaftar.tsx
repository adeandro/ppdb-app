import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import type { Pendaftar } from "../../types/Pendaftar";

export default function Pendaftar() {
  const [data, setData] = useState<Pendaftar[]>([]);

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

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Data Pendaftar</h1>

      <ul>
        {data.map((item, idx) => (
          <li key={idx} className="border p-2 mb-2">
            {item.nama} - {item.jurusan}
          </li>
        ))}
      </ul>
    </div>
  );
}
