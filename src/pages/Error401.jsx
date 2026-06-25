import React from 'react';
import { Link } from 'react-router-dom';

export default function Error401() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-600">401</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">Tidak Terotorisasi</h2>
        <p className="text-gray-500 mt-2">Anda perlu login untuk mengakses halaman ini.</p>
        <Link to="/login" className="mt-6 inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
          Login
        </Link>
      </div>
    </div>
  );
}