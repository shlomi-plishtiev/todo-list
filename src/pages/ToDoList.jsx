import { TaskForm } from "../cmps/TaskForm"
import { TaskList } from "../cmps/TaskList"
import { DeleteDialog } from "../cmps/DeleteDialog"
import { useState } from "react"

export function ToDoList() {
    const [tasks, setTasks] = useState([
        { task: "take the dog out", assignee: "shlomi", priority: "Medium" },
        { task: "prepare food", assignee: "yosef", priority: "High" },
        { task: "wash dishes", assignee: "ronen", priority: "Low" }
    ])

    const [editIndex, setEditIndex] = useState(null)
    const [open, setOpen] = useState(false)
    const [taskToDelete, setTaskToDelete] = useState(null)

    function addTask(task, assignee, priority) {
        setTasks([...tasks, { task, assignee, priority }])
    }

    function updateTask(task, assignee, priority) {
        const updatedTasks = [...tasks]
        updatedTasks[editIndex] = { task, assignee, priority }
        setTasks(updatedTasks)
        setEditIndex(null)
    }

    function confirmDelete(index) {
        setTaskToDelete(index)
        setOpen(true)
    }

    function deleteTask() {
        const updatedTasks = tasks.filter((_, i) => i !== taskToDelete)
        setTasks(updatedTasks)
        handleClose()
    }

    function handleClose() {
        setOpen(false)
        setTaskToDelete(null)
    }

    function editTask(index) {
        setEditIndex(index)
    }

    return (
        <div className="todo-list">
            <h1>Todo List</h1>

            <TaskForm
                addTask={addTask}
                updateTask={updateTask}
                editIndex={editIndex}
                taskData={editIndex !== null ? tasks[editIndex] : {}}
            />            
            <TaskList tasks={tasks} editTask={editTask} confirmDelete={confirmDelete} />
            <DeleteDialog open={open} handleClose={handleClose} deleteTask={deleteTask} />
        </div>
    )
}
