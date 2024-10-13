export function TaskList({ tasks, editTask, confirmDelete }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Assignee</th>
                    <th>Priority</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((taskObj, index) => (
                    <tr key={index}>
                        <td>{taskObj.task}</td>
                        <td>{taskObj.assignee}</td>
                        <td>{taskObj.priority}</td>
                        <td>
                        <button className="edit-btn" onClick={() => editTask(index)}>Edit</button>
                        </td>
                        <td>
                        <button className="delete-btn" onClick={() => confirmDelete(index)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
