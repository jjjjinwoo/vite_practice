import React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { makeData } from './MakeData';

import './Table.css'

function TableExample() {
  const rerender = React.useReducer(() => ({}), {})[1];

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'No',
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        accessorKey: '상호명',
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        accessorKey: '고객결제금액',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        footer: props => props.column.id,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        footer: props => props.column.id,
      },
      {
        accessorKey: '수정',
        footer: props => props.column.id,
      },
    ],
    []
  );

  const [data, setData] = React.useState(() => makeData(100000));
  // const refreshData = () => setData(() => makeData(100000));

  return (
    <>
      <MyTable data={data} columns={columns} />
      <hr />
      {/* <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div> */}
    </>
  );
}

function MyTable({ data, columns }) {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  const totalPages = table.getPageCount(); // 총 페이지 수

  // 현재 페이지 주변으로 표시할 페이지 번호
  const range = 10; // 현재 페이지 앞뒤로 표시할 페이지 수
  const startPage = Math.max(0, pagination.pageIndex);
  const endPage = Math.min(totalPages - 1, pagination.pageIndex + range);

  // 페이지 번호 배열
  const pageNumbers = [];
  for (let i = startPage; i < endPage; i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <div className="p-2">
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan}>
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : '',
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === 'asc' ? ' 🔼' : ' 🔽'
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        {/* 이전 버튼 */}
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        {/* 페이지 번호 버튼 */}
        {pageNumbers.map(page => (
          <button
            key={page}
            className={`border rounded p-1 ${table.getState().pagination.pageIndex === page - 1 ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => table.setPageIndex(page - 1)} // 페이지 번호 설정
          >
            {page}
          </button>
        ))}
        {/* 다음 버튼 */}
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
      </div>
      {/* <div>
        Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
        {table.getRowCount().toLocaleString()} Rows
      </div>
      <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
    </div>
  );
}

export default TableExample;
