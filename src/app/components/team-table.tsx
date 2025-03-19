'use client';

import React, { useEffect, useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  ArrowUpDown,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Team } from '@/app/lib/types';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface TeamTableProps {
  initialData: Team[];
}

// Define the columns for the table
const columns: ColumnDef<Team>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      // Make header sortable
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-[150px] pl-3">{row.getValue('name')}</div>
    ),
    // Add filter function
    filterFn: (row, id, filterValue) => {
      return (row.getValue(id) as string)
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    }
  },
  {
    accessorKey: 'display_name',
    header: ({ column }) => {
      // Make header sortable
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Display Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-[30%] pl-4">{row.getValue('display_name')}</div>
    )
  },
  {
    accessorKey: 'nickname',
    header: ({ column }) => {
      // Make header sortable
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nickname
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-[30%] pl-4">{row.getValue('nickname')}</div>
    )
  }
];

const TeamTable: React.FC<TeamTableProps> = ({ initialData }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filterValue, setFilterValue] = useState('');
  const [sortBy, setSortBy] = useState<string>('');
  const [tableData, setTableData] = useState<Team[]>(initialData);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiKey) {
        console.error('API key is not defined in environment variables.');
        return;
      }
      if (!apiUrl) {
        console.error('API URL is not defined in environment variables.');
        return;
      }

      let url = `${apiUrl}/team_list/NFL`;
      if (sortBy && sortBy !== 'None') {
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
          console.error(errorMessage);
          return;
        }

        const data: Team[] = await response.json();
        setTableData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (sortBy) {
      fetchData();
    } else {
      setTableData(initialData);
    }
  }, [sortBy, initialData]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filterValue
    },
    onGlobalFilterChange: setFilterValue
  });

  return (
    <>
      {/* Table */}
      <div className="flex items-center justify-between w-full mb-2">
        <Input
          id="teamSearch"
          name="teamSearch"
          className="w-[30%]"
          placeholder="Search teams"
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
        />
        <Select onValueChange={setSortBy} value={sortBy || ''}>
          <SelectTrigger className="w-[180px]">
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
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-[#F9F9F9] h-14">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No teams found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Page navigation and information */}
      <div className="flex items-center justify-between space-x-2 p-2">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-outfit text-primary-text">Rows per page</p>
          <select
            className="flex items-center font-medium text-sm h-10 rounded-md border border-[#D3D7E3]"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-sm font-outfit text-primary-text mr-4">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronFirst />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronLast />
          </Button>
        </div>
      </div>
    </>
  );
};

export default TeamTable;
