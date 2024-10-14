import { useReactTable, createColumnHelper, flexRender, getCoreRowModel, } from "@tanstack/react-table"

const columnHelper = createColumnHelper()

export function TaskList({ tasks, editTask, confirmDelete }) {
    const columns = [
        columnHelper.accessor("task", {
            header: "Task",
        }),
        columnHelper.accessor("assignee", {
            header: "Assignee",
        }),
        columnHelper.accessor("priority", {
            header: "Priority",
        }),
        columnHelper.display({
            id: "edit",
            cell: (info) => (
                <button className="edit-btn" onClick={() => editTask(info.row.index)}>
                    Edit
                </button>
            ),
        }),
        columnHelper.display({
            id: "delete",
            cell: (info) => (
                <button className="delete-btn" onClick={() => confirmDelete(info.row.index)}>
                    Delete
                </button>
            ),
        }),
    ]

    const table = useReactTable({
        data: tasks,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <table>
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
