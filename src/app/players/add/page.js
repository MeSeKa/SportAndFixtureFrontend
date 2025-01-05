"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useTeams from '@/hooks/useTeams';

const AddPlayer = () => {
  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState('');
  const [teamId, setTeamId] = useState(''); // Seçilen takımın ID'sini tutan state
  const [loading, setLoading] = useState(false);
  const { teams, getTeams } = useTeams(); // useTeams hook'u ile takımları alıyoruz
  const router = useRouter();

  useEffect(() => {
    getTeams(); // Sayfa yüklendiğinde takımları çekiyoruz
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName) {
      alert('Please enter a name!');
      return;
    }

    if (!position) {
      alert('Please enter position!');
      return;
    }

    if (!teamId) {
      alert('Please select a team!');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://localhost:7033/api/Players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, position, teamId }), // teamId'yi de gönderiyoruz
      });

      if (response.ok) {
        alert('Player added successfully!');
        router.push('/players'); // Başarıyla eklenince Teams sayfasına yönlendir
      } else {
        alert('Failed to add Player. Please try again.');
      }
    } catch (error) {
      console.error('Error adding Player:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Player</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter player name"
            disabled={loading}
          />

          <label className="block text-sm font-medium text-gray-700">Position</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter position"
            disabled={loading}
          />

          <label className="block text-sm font-medium text-gray-700">Team</label>
          <select
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          >
            <option value="">Select a team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.teamName}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className={`${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            } text-white px-4 py-2 rounded transition-all`}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Player'}
        </button>
      </form>
    </div>
  );
};

export default AddPlayer;
