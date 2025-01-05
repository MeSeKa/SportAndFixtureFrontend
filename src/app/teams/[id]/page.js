'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const TeamDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`https://localhost:7033/api/Teams/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTeam(data);
        } else {
          setError('Failed to fetch team details');
        }
      } catch (error) {
        setError('An error occurred while fetching team details');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTeam();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading team details...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Team Details</h1>
      {team && (
        <div className="bg-white shadow-md rounded p-6">
          <p className="mb-2"><strong>Team Name:</strong> {team.teamName}</p>
          <p className="mb-2"><strong>City:</strong> {team.city}</p>

          <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="bg-green-100 text-green-600 p-4 rounded text-center">
              <p className="font-bold">Wins</p>
              <p>{team.wins}</p>
            </div>
            <div className="bg-red-100 text-red-600 p-4 rounded text-center">
              <p className="font-bold">Losses</p>
              <p>{team.losses}</p>
            </div>
            <div className="bg-yellow-100 text-yellow-600 p-4 rounded text-center">
              <p className="font-bold">Draws</p>
              <p>{team.draws}</p>
            </div>
            <div className="bg-gray-100 text-gray-600 p-4 rounded text-center">
              <p className="font-bold">Not Played</p>
              <p>{team.notPlayed}</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-6 mb-4">Players</h2>
          <ul className="list-disc pl-6">
            {team.players.map((player) => (
              <li key={player.playerId} className="mb-2">
                {player.name} - {player.position}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-4">Fixtures</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border border-gray-300 text-left">Opponent</th>
                <th className="p-3 border border-gray-300 text-left">Date</th>
                <th className="p-3 border border-gray-300 text-left">Home Score</th>
                <th className="p-3 border border-gray-300 text-left">Away Score</th>
                <th className="p-3 border border-gray-300 text-left">Result</th>
              </tr>
            </thead>
            <tbody>
              {team.fixtures.map((fixture) => (
                <tr key={fixture.fixtureId} className="odd:bg-white even:bg-gray-50">
                  <td className="p-3 border border-gray-300">{fixture.opponentTeamName}</td>
                  <td className="p-3 border border-gray-300">{fixture.date}</td>
                  <td className="p-3 border border-gray-300">
                    {fixture.homeTeamScore === -1 ? (
                      <span className="text-gray-500 italic">Not Played</span>
                    ) : (
                      fixture.homeTeamScore
                    )}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {fixture.awayTeamScore === -1 ? (
                      <span className="text-gray-500 italic">Not Played</span>
                    ) : (
                      fixture.awayTeamScore
                    )}
                  </td>
                  <td className={`p-3 border border-gray-300 font-bold ${fixture.result === 'Win' ? 'text-green-600' : fixture.result === 'Loss' ? 'text-red-600' : fixture.result === 'Draw' ? 'text-yellow-600' : 'text-gray-600'}`}>
                    {fixture.result}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => router.push('/teams')}
          >
            Back to Teams
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamDetails;
