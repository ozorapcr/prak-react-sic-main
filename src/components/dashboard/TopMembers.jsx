import React from 'react';

export default function TopMembers() {
  const topMembers = [
    { rank: 1, name: 'Budi Santoso', tier: 'Platinum', points: 12500, icon: '👑' },
    { rank: 2, name: 'Siti Aminah', tier: 'Gold', points: 7500, icon: '🥇' },
    { rank: 3, name: 'Andi Saputra', tier: 'Silver', points: 3200, icon: '🥈' },
    { rank: 4, name: 'Rina Putri', tier: 'Silver', points: 1800, icon: '🥈' },
    { rank: 5, name: 'Fajar Nugroho', tier: 'Bronze', points: 450, icon: '🥉' },
  ];

  const rankColor = {
    1: 'bg-yellow-400 text-white',
    2: 'bg-gray-300 text-gray-700',
    3: 'bg-orange-400 text-white',
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🏆 Top Member</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-3">
          {topMembers.map((member) => (
            <div key={member.rank} className="flex items-center justify-between border-b pb-3 last:border-0">
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${rankColor[member.rank] || 'bg-gray-100'}`}>
                  {member.rank}
                </span>
                <span className="font-medium">{member.name}</span>
                <span className="text-sm">{member.icon} {member.tier}</span>
              </div>
              <span className="font-bold text-blue-600">{member.points.toLocaleString()} poin</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}