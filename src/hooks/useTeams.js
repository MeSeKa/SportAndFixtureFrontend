import { useState, useEffect } from 'react';

const useTeams = () => {
  const [teams, setTeams] = useState([]);      // Takım listesi
  const [isLoading, setIsLoading] = useState(true); // Yüklenme durumu
  const [error, setError] = useState(null);     // Hata durumu

  const getTeams = async () => {
    setIsLoading(true); // Yüklenme durumunu true yap
    setError(null);     // Hata durumunu sıfırla

    try {
      const response = await fetch('https://localhost:7033/api/Teams', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Teams data:', data); // Gelen veriyi logla
        setTeams(data);                  // Takım verilerini set et
      } else {
        setError(`Failed to fetch teams: ${response.status}`);
      }
    } catch (error) {
      setError('Error fetching teams: ' + error.message);
    } finally {
      setIsLoading(false); // Yüklenme durumunu false yap
    }
  };

  useEffect(() => {
    getTeams(); // Hook ilk çalıştığında getTeams'i çağır
  }, []);

  return { teams, getTeams, isLoading, error };
};

export default useTeams;
