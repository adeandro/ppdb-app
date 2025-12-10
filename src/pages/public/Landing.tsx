import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl text-center font-bold mb-4 sm:text-6xl">
        Selamat datang di web PPDB
      </h1>
      <h1 className="text-2xl text-center font-bold mb-4 sm:text-4xl">
        Klik tombol di bawah untuk mendaftar
      </h1>
      <Link
        to="/daftar"
        className="mt-6 px-6 py-3 bg-gray-800 text-white  hover:bg-gray-700"
      >
        Daftar Sekarang
      </Link>
    </div>
  );
}
