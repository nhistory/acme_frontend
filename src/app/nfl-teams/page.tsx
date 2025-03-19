import { Metadata } from 'next';
import { Suspense } from 'react';
import { Team } from '@/app/lib/types';
import TeamTable from '@/app/components/team-table';
import TeamCards from '@/app/components/team-cards';
import SchemaOrg from '@/app/components/schema-org';

export const metadata: Metadata = {
  title: 'NFL Teams',
  description: 'List of NFL teams'
};

// Cache data for 10 minutes (600 seconds).
export const revalidate = 600;

// Fetch data at build time (or on-demand revalidation).
async function fetchNflTeams(sortBy?: string): Promise<Team[]> {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Check if the API key is defined.  Important in server components!
  if (!apiKey) {
    throw new Error('API key is not defined in environment variables.');
  }
  if (!apiUrl) {
    throw new Error('API URL is not defined in environment variables.');
  }

  let url = `${apiUrl}/team_list/NFL`;

  // Add sort_by query parameter if provided
  if (sortBy) {
    url += `?sort_by=${sortBy}`;
  }

  const response = await fetch(url, {
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
    // Throwing an error will prevent the build from succeeding if data fetching fails.
    throw new Error(errorMessage);
  }

  const data: Team[] = await response.json();
  return data;
}

function Loading() {
  return <div>Loading NFL Teams...</div>;
}

export default async function Page() {
  try {
    const teams = await fetchNflTeams();

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: teams.map((team, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SportsOrganization',
          name: team.name,
          address: {
            '@type': 'PostalAddress'
          },
          sport: 'American Football'
        }
      }))
    };

    return (
      <Suspense fallback={<Loading />}>
        <div className="xl:w-[90%] mx-auto">
          <head>
            <SchemaOrg schema={schema} />
          </head>
          <h1 className="text-lg md:text-2xl font-bold mb-1">NFL Teams</h1>
          <p className="text-sm text-primary-text mb-4">
            View the complete list of NFL teams. Find your favorite teams by
            conference and division. Stay updated with the latest team
            information.
          </p>
          {/* Mobile view only */}
          <div className="md:hidden">
            <TeamCards initialData={teams} />
          </div>
          {/* Desktop view only */}
          <div className="hidden md:block">
            <TeamTable initialData={teams} />
          </div>
        </div>
      </Suspense>
    );
  } catch (error) {
    // Display an error message to the user.
    return (
      <div>
        <h1>Error Loading Teams</h1>
        <p>
          An error occurred while fetching the team data:{' '}
          {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      </div>
    );
  }
}
