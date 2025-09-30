'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/berita");
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-pink-200 to-pink-50">
      <Navbar />
      <main className="flex-1 flex flex-col items-center py-12 px-4">
      {/* Welcome Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 py-24">
        <h1 className="text-5xl md:text-7xl font-extrabold text-pink-600 mb-6 font-orbitron">
          Selamat Datang di MyTECHPORTAL
        </h1>
        <p className="text-xl md:text-2xl text-pink-500 max-w-2xl mx-auto mb-10">
          Portal berita dan informasi terkini SMK Negeri 8 Jember. Temukan kabar terbaru, inspirasi, dan perkembangan jurusan favorit Anda di sini.
        </p>
          <Link
            href="/berita"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold text-lg shadow hover:scale-105 transition"
          >
            Lihat Berita
          </Link>
          <a
            href="/admin/login"
            className="px-8 py-3 rounded-full bg-white text-pink-600 font-bold text-lg shadow hover:bg-pink-100 transition"
          >
            Login Admin
          </a>
      </section>
      </main>
      <Footer />
    </div>
  );
}