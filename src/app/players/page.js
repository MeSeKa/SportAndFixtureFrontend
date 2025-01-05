"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeams } from '@/redux/teamsSlice';

// Renk paleti (Tailwind sınıfları ile)
const colorPalette = [
  'bg-blue-200',
  'bg-green-200',
  'bg-yellow-200',
  'bg-red-200',
  'bg-purple-200',
  'bg-pink-200',
  'bg-indigo-200',
  'bg-teal-200',
  'bg-orange-200',
  'bg-gray-200',
];

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [query, setQuery] = useState('');
  const teams = useSelector((state) => state.teams.items);
  const status = useSelector((state) => state.teams.status);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('https://localhost:7033/api/Players', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          setPlayers(data);
        } else {
          console.error('Failed to fetch players');
        }
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
    if (status === 'idle') {
      dispatch(fetchTeams()); // Takımları API'den çek
    }
  }, [status, dispatch]);

  const getTeamName = (teamId) => {
    const team = teams.find((t) => t.id === teamId);
    return team ? team.teamName : 'Unknown';
  };

  // Pozisyonlara renk atamak için useMemo kullanıyoruz
  const positionColors = useMemo(() => {
    const assignedColors = {};
    let colorIndex = 0;

    players.forEach((player) => {
      if (!assignedColors[player.position]) {
        assignedColors[player.position] =
          colorPalette[colorIndex % colorPalette.length];
        colorIndex++;
      }
    });

    return assignedColors;
  }, [players]);

  const filteredPlayers = players.filter((player) =>
    player.fullName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Players</h1>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Link href="/players/add">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all">
            Add New Player
          </button>
        </Link>
      </div>

      <table className="table-auto border-collapse border border-gray-300 w-full mb-4">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Full Name</th>
            <th className="border border-gray-300 px-4 py-2">Position</th>
            <th className="border border-gray-300 px-4 py-2">Team</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map((player) => (
            <tr key={player.id}>
              <td className="border border-gray-300 px-4 py-2">{player.fullName}</td>
              <td className="border border-gray-300 px-4 py-2">
                <span
                  className={`px-1 ${positionColors[player.position]} rounded`}
                  style={{ width: `${player.position.length}ch` }}
                >
                  {player.position}
                </span>
              </td>
              <td className="border border-gray-300 px-4 py-2">{getTeamName(player.teamId)}</td>
              <td className="border border-gray-300 px-4 py-2">
                <Link href={`/players/edit/${player.id}`}>
                  <button className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-all">
                    Edit
                  </button>
                </Link>
                <Link href={`/players/delete/${player.id}`}>
                  <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-all">
                    Delete
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredPlayers.length === 0 && (
        <p className="text-center text-gray-600">No players found.</p>
      )}

      {/* Pozisyonların renkleriyle sıralı gösterimi */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Position Legend</h2>
        <div className="grid grid-cols-10 gap-4">
          {Object.keys(positionColors).map((position) => (
            <div
              key={position}
              className={`px-4 py-2 ${positionColors[position]} rounded-lg`}
            >
              {position}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Players;
