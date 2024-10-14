import React, { useMemo } from 'react'
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table'

// A filter function that returns true if a value exists in the column
const includesFilterFn = (row, columnId, value) =>
    row.getValue(columnId).toString().toLowerCase().includes(value.toLowerCase())

// Define the priority order and sorting function
const priorityOrder = { high: 3, medium: 2, low: 1 }
const prioritySortingFn = (rowA, rowB) =>
    (priorityOrder[rowB.getValue('priority').toLowerCase()] || 0) - (priorityOrder[rowA.getValue('priority').toLowerCase()] || 0)

//Defining the columns
export function TaskList({ tasks, editTask, confirmDelete }) {
    const columns = useMemo(() => [
        {
            accessorKey: 'task',
            header: 'Task',
            enableSorting: false,
        },
        {
            accessorKey: 'assignee',
            header: 'Assignee',
            filterFn: includesFilterFn,
        },
        {
            accessorKey: 'priority',
            header: 'Priority',
            filterFn: includesFilterFn,
            enableSorting: true,
            sortingFn: prioritySortingFn,
        },
        {
            id: 'edit',
            header: 'Edit',
            cell: ({ row }) => (
                <button className="edit-btn" onClick={() => editTask(row.index)}>Edit</button>
            ),
        },
        {
            id: 'delete',
            header: 'Delete',
            cell: ({ row }) => (
                <button className="delete-btn" onClick={() => confirmDelete(row.index)}>Delete</button>
            ),
        },
    ], [editTask, confirmDelete])

    const table = useReactTable({
        data: tasks,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    // Internal dropdown filter component
    const FilterDropdown = ({ column }) => {
        const uniqueValues = useMemo(() =>
            Array.from(new Set(table.getRowModel().rows.map(row => row.getValue(column.id))))
            , [column.id, table])

        return (
            <select className='select-row' onChange={e => column.setFilterValue(e.target.value)} value={column.getFilterValue() || ''}>
                <option value=""> all</option>
                {uniqueValues.map(value => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
        )
    }

    return (
        <div>
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {!header.isPlaceholder && (
                                        <div
                                            onClick={header.column.getToggleSortingHandler()}
                                            style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            <span className="sort-arrow">
                                                {header.column.getIsSorted() === 'asc' ? ' 🔼' : header.column.getIsSorted() === 'desc' ? ' 🔽' : null}
                                            </span>
                                        </div>
                                    )}
                                    {header.column.getCanFilter() && header.column.id !== 'task' && (
                                        <FilterDropdown column={header.column} />
                                    )}
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
        </div>
    )
}
