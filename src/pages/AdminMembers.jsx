import React, { useState } from 'react';

export default function AdminMembers() {
  const [members] = useState([
    { id: 1, name: 'Budi Santoso', email: 'budi@mail.com', tier: 'Platinum', points: 12500, phone: '08123456789' },
    { id: 2, name: 'Siti Aminah', email: 'siti@mail.com', tier: 'Gold', points: 7500, phone: '08123456788' },
    { id: 3, name: 'Andi Saputra', email: 'andi@mail.com', tier: 'Silver', points: 3200, phone: '08123456787' },
    { id: 4, name: 'Rina Putri', email: 'rina@mail.com', tier: 'Silver', points: 1800, phone: '08123456786' },
    { id: 5, name: 'Fajar Nugroho', email: 'fajar@mail.com', tier: 'Bronze', points: 450, phone: '08123456785' },
  ]);

  const tierColor = {
    'Platinum': 'bg-purple-100 text-purple-800',
    'Gold': 'bg-yellow-100 text-yellow-800',
    'Silver': 'bg-gray-200 text-gray-800',
    'Bronze': 'bg-orange-100 text-orange-800'
  };

  const tierIcon = {
    'Platinum': '👑',
    'Gold': '🥇',
    'Silver': '🥈',
    'Bronze': '🥉'
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">👥 Manajemen Member</h1>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="🔍 Cari member..." 
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
            + Tambah
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-500 text-sm">Total Member</p>
          <p className="text-2xl font-bold">{members.length}</p>
        </div>
        <div className="bg-purple-100 rounded-lg shadow-md p-4">
          <p className="text-purple-700 text-sm">👑 Platinum</p>
          <p className="text-2xl font-bold">{members.filter(m => m.tier === 'Platinum').length}</p>
        </div>
        <div className="bg-yellow-100 rounded-lg shadow-md p-4">
          <p className="text-yellow-700 text-sm">🥇 Gold</p>
          <p className="text-2xl font-bold">{members.filter(m => m.tier === 'Gold').length}</p>
        </div>
        <div className="bg-gray-100 rounded-lg shadow-md p-4">
          <p className="text-gray-700 text-sm">🥈 Silver</p>
          <p className="text-2xl font-bold">{members.filter(m => m.tier === 'Silver').length}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No HP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Poin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium">{member.name}</td>
                  <td className="px-6 py-4 text-sm">{member.email}</td>
                  <td className="px-6 py-4 text-sm">{member.phone}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${tierColor[member.tier]}`}>
                      {tierIcon[member.tier]} {member.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">{member.points.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">✏️</button>
                    <button className="text-red-600 hover:text-red-800">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}