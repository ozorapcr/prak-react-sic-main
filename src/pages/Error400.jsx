import React from 'react';
import { Link } from 'react-router-dom';

export default function Error400() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-600">400</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">Bad Request</h2>
        <p className="text-gray-500 mt-2">Permintaan Anda tidak dapat diproses.</p>
        <Link to="/" className="mt-6 inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}