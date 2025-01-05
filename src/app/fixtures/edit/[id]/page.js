"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useTeams from "@/hooks/useTeams";

export default function EditFixture({ params: paramsPromise }) {
  const router = useRouter();
  const [fixture, setFixture] = useState({
    id: "",
    homeTeamId: "",
    awayTeamId: "",
    matchDate: "",
    homeTeamScore: "",
    awayTeamScore: "",
  });
  const { teams, getTeams } = useTeams();
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);

  useEffect(() => {
    async function unwrapParams() {
      try {
        const params = await paramsPromise;
        setId(params.id); // Params çözülünce id set ediliyor
      } catch (error) {
        console.error("Error unwrapping params:", error);
      }
    }
    unwrapParams();
  }, [paramsPromise]);

  useEffect(() => {
    if (id) {
      fetchFixture(id);
      getTeams();
    }
  }, [id]);

  const fetchFixture = async (id) => {
    try {
      const response = await fetch(`https://localhost:7033/api/Fixtures/${id}`);
      if (!response.ok) throw new Error("Failed to fetch fixture");
      const data = await response.json();
      setFixture({
        id: data.id,
        homeTeamId: data.homeTeamId,
        awayTeamId: data.awayTeamId,
        matchDate: data.matchDate,
        homeTeamScore: data.homeTeamScore ?? "",
        awayTeamScore: data.awayTeamScore ?? "",
      });
    } catch (error) {
      console.error("Error fetching fixture:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFixture((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://localhost:7033/api/Fixtures/${fixture.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fixture),
      });

      if (response.ok) {
        alert("Fixture updated successfully!");
        router.push("/fixtures");
      } else {
        alert("Failed to update fixture.");
      }
    } catch (error) {
      console.error("Error updating fixture:", error);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Fixture</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Home Team</label>
          <select
            name="homeTeamId"
            value={fixture.homeTeamId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select Home Team
            </option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.teamName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Away Team</label>
          <select
            name="awayTeamId"
            value={fixture.awayTeamId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select Away Team
            </option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.teamName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Match Date</label>
          <input
            type="date"
            name="matchDate"
            value={fixture.matchDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Home Team Score</label>
          <input
            type="number"
            name="homeTeamScore"
            value={fixture.homeTeamScore}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Away Team Score</label>
          <input
            type="number"
            name="awayTeamScore"
            value={fixture.awayTeamScore}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
            onClick={() => router.push("/fixtures")}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
