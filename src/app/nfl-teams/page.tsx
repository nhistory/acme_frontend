'use client';

import React, { useEffect, useState } from 'react';

interface Team {
  id: string;
  name: string;
  nickname: string;
  display_name: string;
}

const NflTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNflTeams = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;

        // Check if the API key is defined
        if (!apiKey) {
          throw new Error('API key is not defined in environment variables.');
        }

        const response = await fetch('http://127.0.0.1:8000/team_list/NFL', {
          method: 'GET',
          headers: {
            'X-API-KEY': apiKey,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          let errorMessage = `HTTP error! status: ${response.status}`;
          if (response.status === 404) {
            errorMessage = 'NFL team list not found.';
          } else if (response.status === 401) {
            errorMessage = 'Unauthorized.  Check your API key.';
          } else if (response.status >= 500) {
            errorMessage = 'Server error. Please try again later.';
          }
          throw new Error(errorMessage);
        }

        const data: Team[] = await response.json(); // Type the parsed data
        setTeams(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error('An unknown error occurred.'));
        }
        console.error('Error fetching NFL teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNflTeams();

    // Set an interval to refetch the NFL teams every 10 minutes
    const intervalId = setInterval(() => {
      setLoading(true);
      fetchNflTeams();
    }, 600000);

    // Cleanup function: Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div>Loading NFL Teams...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="font-bold text-2xl mb-6">NFL Teams</h1>
      {teams.length > 0 ? (
        <ul>
          {teams.map((team, index) => (
            <li key={index}>{team.name ? team.name : `Team ${index + 1}`} </li>
          ))}
        </ul>
      ) : (
        <div>No NFL teams found.</div>
      )}
    </div>
  );
};

export default NflTeams;
