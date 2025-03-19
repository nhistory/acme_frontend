'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Team } from '@/app/lib/types';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useFetchTeams from '@/app/hooks/use-fetch-teams';

interface TeamCardsProps {
  initialData: Team[];
}

const TeamCards: React.FC<TeamCardsProps> = ({ initialData }) => {
  const [filterValue, setFilterValue] = useState('');
  const [sortBy, setSortBy] = useState<string | undefined>('None');

  const {
    data: allData,
    loading,
    error,
    fetchData,
    setExternalSortBy
  } = useFetchTeams(initialData, sortBy);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Update the external sort by state when the internal sort by state changes
  useEffect(() => {
    setExternalSortBy(sortBy);
  }, [sortBy, setExternalSortBy]);

  const filteredData = useMemo(() => {
    // If there is no data, return an empty array
    if (!allData) return [];

    let filtered = allData;

    if (filterValue) {
      const lowerCaseFilter = filterValue.toLowerCase();
      filtered = filtered.filter(
        (team) =>
          team.name.toLowerCase().includes(lowerCaseFilter) ||
          team.display_name.toLowerCase().includes(lowerCaseFilter) ||
          team.nickname.toLowerCase().includes(lowerCaseFilter)
      );
    }
    return filtered;
  }, [allData, filterValue]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {/* Search and Sort Controls */}
      <div className="flex flex-col md:flex-row items-center mb-4 space-y-2 md:space-y-0 md:space-x-2">
        <div className="w-full md:w-[30%]">
          <Input
            id="teamSearch"
            name="teamSearch"
            className="text-sm"
            placeholder="Search teams"
            value={filterValue}
            onChange={(event) => setFilterValue(event.target.value)}
          />
        </div>
        <Select onValueChange={setSortBy} value={sortBy || ''}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="None">None</SelectItem>
            <SelectItem value="Name">Name</SelectItem>
            <SelectItem value="Conference">Conference</SelectItem>
            <SelectItem value="Division">Division</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Team Cards */}
      <div className="space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map((team) => (
            <Card key={team.name}>
              <CardHeader>
                <CardTitle>{team.display_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Name: {team.name}</p>
                <p>Nickname: {team.nickname}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No teams found.</p>
        )}
      </div>
    </>
  );
};

export default TeamCards;
