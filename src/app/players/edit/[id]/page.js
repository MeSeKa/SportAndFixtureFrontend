"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useTeams from '@/hooks/useTeams';

export default function EditPlayer({ params: paramsPromise }) {
  const router = useRouter();
  const [player, setPlayer] = useState({ id: '', fullName: '', position: '', teamId: '' });
  const { teams, getTeams } = useTeams();
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);

  useEffect(() => {
    async function unwrapParams() {
      const params = await paramsPromise;
      setId(params.id);
    }
    unwrapParams();
  }, [paramsPromise]);

  useEffect(() => {
    if (id) {
      fetchPlayer();
      getTeams();
    }
  }, [id]);

  const fetchPlayer = async () => {
    try {
      const response = await fetch(`https://localhost:7033/api/Players/${id}`);
      const data = await response.json();
      setPlayer({
        id: data.id, // Gelen veriden id'yi de set ediyoruz
        fullName: data.fullName,
        position: data.position,
        teamId: data.teamId,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching player:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://localhost:7033/api/Players/${player.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(player), // Güncellenmiş player bilgilerini gönderiyoruz
      });

      if (response.ok) {
        alert('Player updated successfully!');
        router.push('/players');
      } else {
        alert('Failed to update player.');
      }
    } catch (error) {
      console.error('Error updating player:', error);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Player</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={player.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
          <input
            type="text"
            name="position"
            value={player.position}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
          <select
            name="teamId"
            value={player.teamId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select a team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.teamName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => router.push('/players')}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
