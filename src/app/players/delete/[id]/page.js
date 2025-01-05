"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useTeams from '@/hooks/useTeams';

export default function DeletePlayer({ params: paramsPromise }) {
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
        id: data.id,
        fullName: data.fullName,
        position: data.position,
        teamId: data.teamId,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching player:', error);
    }
  };

  const getTeamName = (teamId) => {
    const team = teams.find((t) => t.id === teamId);
    return team ? team.teamName : 'Unknown';
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://localhost:7033/api/Players/${player.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Player deleted successfully!');
        router.push('/players');
      } else {
        alert('Failed to delete player.');
      }
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Delete Player</h1>
      <p className="text-center mb-6 text-gray-700">
        Are you sure you want to delete <strong>{player.fullName}</strong>?
      </p>

      <div className="space-y-4">
        <div>
          <span className="block font-medium text-gray-700">Position:</span>
          <span className="text-gray-800">{player.position}</span>
        </div>
        <div>
          <span className="block font-medium text-gray-700">Team:</span>
          <span className="text-gray-800">{getTeamName(player.teamId)}</span>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={handleDelete}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
        >
          Yes, Delete
        </button>
        <button
          onClick={() => router.push('/players')}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
