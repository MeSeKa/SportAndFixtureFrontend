'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeams } from '@/redux/teamsSlice';
import Link from 'next/link'; // Next.js yönlendirme için Link bileşeni

export default function FixturesPage() {
  const [fixtures, setFixtures] = useState([]);
  const teams = useSelector((state) => state.teams.items);
  const status = useSelector((state) => state.teams.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTeams()); // Takımları API'den çek
    }
  }, [status, dispatch]);

  useEffect(() => {
    async function fetchFixtures() {
      try {
        const response = await fetch('https://localhost:7033/api/Fixtures');
        const data = await response.json();
        setFixtures(data.$values);
      } catch (error) {
        console.error('Error fetching fixtures:', error);
      }
    }
    fetchFixtures();
  }, []);

  const getTeamNameById = (teamId) => {
    const team = teams.find((t) => t.id === teamId);
    return team ? team.teamName : 'Unknown';
  };

  const getMatchStatus = (fixture) => {
    if (fixture.HomeTeamScore === -1 || fixture.AwayTeamScore === -1) {
      return { status: 'Not Played Yet', color: 'bg-gray-200' };
    }
    if (fixture.HomeTeamScore === fixture.AwayTeamScore) {
      return { status: 'Draw', color: 'bg-yellow-300' };
    }
    return { status: 'Finished', color: 'bg-gray-500' };
  };

  const getCellColors = (fixture) => {
    if (fixture.HomeTeamScore === -1 || fixture.AwayTeamScore === -1) {
      return { homeTeamBg: '', awayTeamBg: '' };
    }

    if (fixture.HomeTeamScore > fixture.AwayTeamScore) {
      return { homeTeamBg: 'bg-green-200', awayTeamBg: 'bg-red-200' };
    } else if (fixture.HomeTeamScore < fixture.AwayTeamScore) {
      return { homeTeamBg: 'bg-red-200', awayTeamBg: 'bg-green-200' };
    }
    return { homeTeamBg: 'bg-yellow-200', awayTeamBg: 'bg-yellow-200' }; // Beraberlik durumu
  };

  const handleDelete = async (fixtureId) => {
    const confirmed = confirm('Silmek istediğinize emin misiniz?');
    if (!confirmed) return;

    try {
      const response = await fetch(`https://localhost:7033/api/Fixtures/${fixtureId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setFixtures((prev) => prev.filter((fixture) => fixture.Id !== fixtureId));
        alert('Fixture başarıyla silindi.');
      } else {
        alert('Silme işlemi başarısız oldu.');
      }
    } catch (error) {
      console.error('Error deleting fixture:', error);
      alert('Bir hata oluştu.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fixtures</h1>

      {/* Add Fixture Button */}
      <Link
        href="/fixtures/add"
        className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add New Fixture
      </Link>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Home Team</th>
            <th className="border border-gray-300 p-2">Away Team</th>
            <th className="border border-gray-300 p-2">Home Score</th>
            <th className="border border-gray-300 p-2">Away Score</th>
            <th className="border border-gray-300 p-2">Match Date</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fixtures.map((fixture) => {
            const { homeTeamBg, awayTeamBg } = getCellColors(fixture);
            const { status, color } = getMatchStatus(fixture);

            return (
              <tr key={fixture.Id}>
                <td className={`border border-gray-300 p-2 font-bold ${homeTeamBg} rounded-lg`}>
                  {getTeamNameById(fixture.HomeTeamId)}
                </td>
                <td className={`border border-gray-300 p-2 font-bold ${awayTeamBg} rounded-lg`}>
                  {getTeamNameById(fixture.AwayTeamId)}
                </td>
                <td className="p-3 border border-gray-300">
                  {fixture.HomeTeamScore === -1 ? (
                    <span className="text-gray-500 italic">Not Played</span>
                  ) : (
                    fixture.HomeTeamScore
                  )}
                </td>
                <td className="p-3 border border-gray-300">
                  {fixture.AwayTeamScore === -1 ? (
                    <span className="text-gray-500 italic">Not Played</span>
                  ) : (
                    fixture.AwayTeamScore
                  )}
                </td>
                <td className="border border-gray-300 p-2">{fixture.MatchDate ?? '-'}</td>
                <td className={`border border-gray-300 p-2 font-bold ${color} rounded-lg`}>{status}</td>

                <td className="border border-gray-300 p-2 space-x-2">
                  <Link
                    href={`/fixtures/edit/${fixture.Id}`}
                    className="px-4 py-3 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(fixture.Id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
