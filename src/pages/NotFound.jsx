import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-500 mt-2">Maaf, halaman yang Anda cari tidak tersedia.</p>
        <Link to="/" className="mt-6 inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}