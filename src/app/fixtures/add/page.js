'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useTeams from '@/hooks/useTeams';

const AddNewFixture = () => {
    const { teams } = useTeams();
    const router = useRouter();

    const [homeTeamId, setHomeTeamId] = useState('');
    const [awayTeamId, setAwayTeamId] = useState('');
    const [fixtureDate, setFixtureDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSaveFixture = async (e) => {
        e.preventDefault();

        if (!homeTeamId || !awayTeamId || !fixtureDate) {
            setError('All fields are required.');
            return;
        }

        if (homeTeamId === awayTeamId) {
            setError('Home and Away teams cannot be the same.');
            return;
        }

        if (new Date(fixtureDate) < new Date()) {
            setError('Fixture date cannot be in the past.');
            return;
        }

        setError('');
        setLoading(true);

        const requestBody = {
            homeTeamId: parseInt(homeTeamId),
            awayTeamId: parseInt(awayTeamId),
            matchDate: fixtureDate,
            homeTeamScore: -1,
            awayTeamScore: -1,
            homeTeam: {}, // Boş obje
            awayTeam: {}, // Boş obje
        };


        console.log('Request Body:', requestBody);

        try {
            const response = await fetch('https://localhost:7033/api/Fixtures', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                alert('Fixture added successfully!');
                router.push('/fixtures');
            } else {
                const errorText = await response.text();
                console.error('Response Error:', errorText);
                setError('Failed to add fixture. Please try again.');
            }
        } catch (error) {
            console.error('Error adding fixture:', error);
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Add New Fixture</h1>
            <form onSubmit={handleSaveFixture} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Home Team</label>
                    <select
                        value={homeTeamId}
                        onChange={(e) => setHomeTeamId(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        disabled={loading}
                    >
                        <option value="">Select Home Team</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.teamName}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Away Team</label>
                    <select
                        value={awayTeamId}
                        onChange={(e) => setAwayTeamId(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        disabled={loading}
                    >
                        <option value="">Select Away Team</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.teamName}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Fixture Date</label>
                    <input
                        type="date"
                        value={fixtureDate}
                        onChange={(e) => setFixtureDate(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        disabled={loading}
                    />
                </div>

                {error && <p className="text-red-600 font-medium">{error}</p>}

                <button
                    type="submit"
                    className={`w-full px-4 py-2 text-white rounded-md transition-all ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save Fixture'}
                </button>
            </form>
        </div>
    );
};

export default AddNewFixture;
