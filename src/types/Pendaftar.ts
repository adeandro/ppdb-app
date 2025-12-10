export type Pendaftar = {
  id?: string;
  nama: string;
  nisn: string;
  asalSekolah: string;
  jurusan: string;
  status?: "pending" | "accepted" | "rejected";
  createdAt?: Date;
};
