'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams } from '@/redux/teamsSlice';
import { setStatusMessage, clearStatusMessage } from '@/redux/statusSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const TeamsPage = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams.items);
  const status = useSelector((state) => state.teams.status);
  const error = useSelector((state) => state.teams.error);
  const statusMessage = useSelector((state) => state.status.message);
  const router = useRouter();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTeams()); // Takımları API'den çek
    }
  }, [status, dispatch]);

  const handleDelete = async (teamId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this team?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://localhost:7033/api/Teams/${teamId}`, {
        method: 'DELETE',
      });

      if (response.status === 400) {
        const data = await response.json();
        dispatch(setStatusMessage({ type: 'error', text: data.message }));
      } else if (response.ok) {
        dispatch(setStatusMessage({ type: 'success', text: 'Team deleted successfully.' }));
        dispatch(fetchTeams()); // Takımları yeniden yükle
      } else {
        dispatch(setStatusMessage({ type: 'error', text: 'An unexpected error occurred.' }));
      }
    } catch (error) {
      console.error('Error deleting team:', error);
      dispatch(setStatusMessage({ type: 'error', text: 'Failed to delete the team. Please try again later.' }));
    } finally {
      setTimeout(() => dispatch(clearStatusMessage()), 5000); // 5 saniye sonra mesajı temizle
    }
  };

  if (status === 'loading') {
    return <p>Loading teams...</p>;
  }

  if (status === 'failed') {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Teams</h1>

      <Link
        href="/teams/add"
        className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add New Team
      </Link>

      {statusMessage && (
        <div
          className={`mb-4 p-4 rounded ${
            statusMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border border-gray-300 text-left">Team Name</th>
            <th className="p-3 border border-gray-300 text-left">City</th>
            <th className="p-3 border border-gray-300 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id} className="odd:bg-white even:bg-gray-50">
              <td className="p-3 border border-gray-300">{team.teamName}</td>
              <td className="p-3 border border-gray-300">{team.city}</td>
              <td className="p-3 border border-gray-300 space-x-2">
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => router.push(`/teams/${team.id}`)}
                >
                  Details
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(team.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamsPage;
