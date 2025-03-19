import { useState, useEffect, useCallback } from 'react';
import { Team } from '@/app/lib/types';

interface UseFetchTeamsResult {
  data: Team[] | null;
  loading: boolean;
  error: string | null;
  fetchData: (sortBy?: string) => Promise<void>;
  setExternalSortBy: (newSortBy: string | undefined) => void;
}

const useFetchTeams = (
  initialData: Team[],
  initialSortBy: string | undefined
): UseFetchTeamsResult => {
  const [data, setData] = useState<Team[] | null>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | undefined>(initialSortBy);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiKey || !apiUrl) {
      setError('API key or API URL is not defined.');
      setLoading(false);
      return;
    }

    let url = `${apiUrl}/team_list/NFL`;
    if (sortBy && sortBy !== 'Unsorted') {
      url += `?sort_by=${sortBy}`;
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        if (response.status === 404) {
          errorMessage = 'NFL team list not found.';
        } else if (response.status === 401) {
          errorMessage = 'Unauthorized. Check your API key.';
        } else if (response.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        }
        setError(errorMessage);
        setLoading(false);
        return;
      }

      const responseData: Team[] = await response.json();
      setData(responseData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [sortBy]);

  // Update data when initialData, initialSortBy changes
  useEffect(() => {
    setData(initialData);
    setSortBy(initialSortBy);
  }, [initialData, initialSortBy]);

  const setExternalSortBy = (newSortBy: string | undefined) => {
    setSortBy(newSortBy);
  };

  return { data, loading, error, fetchData, setExternalSortBy };
};

export default useFetchTeams;
