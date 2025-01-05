"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addTeam } from '@/redux/teamsSlice';

const AddTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!teamName) {
      alert('Please enter a team name!');
      return;
    }

    if (!city) {
      alert('Please enter a city!');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://localhost:7033/api/Teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamName, city }),
      });

      if (response.ok) {
        const createdTeam = await response.json();
        dispatch(addTeam(createdTeam)); // Redux store'a yeni takımı ekle
        alert('Team added successfully!');
        router.push('/teams'); // Başarıyla eklenince Teams sayfasına yönlendir
      } else {
        alert('Failed to add team. Please try again.');
      }
    } catch (error) {
      console.error('Error adding team:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Team</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter team name"
            disabled={loading}
          />

          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter city"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className={`${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          } text-white px-4 py-2 rounded transition-all`}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Team'}
        </button>
      </form>
    </div>
  );
};

export default AddTeam;
