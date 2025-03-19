'use client';

import React, { useState } from 'react';
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

const TeamTable = ({ data }: { data: Team[] }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filterValue, setFilterValue] = useState('');

  const table = useReactTable({
    data,
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
      <div className="w-[30%] mr-auto mb-2">
        <Input
          id="teamSearch"
          name="teamSearch"
          placeholder="Search teams"
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
        />
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
