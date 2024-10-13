import { useState } from "react"
import { TaskForm } from "../cmps/TaskForm"
import { TaskList } from "../cmps/TaskList"
import { DeleteDialog } from "../cmps/DeleteDialog"
import { TaskFilters } from "../cmps/TaskFilters" 

export function ToDoList() {
    const [tasks, setTasks] = useState([
        { task: "take the dog out", assignee: "shlomi", priority: "Medium" },
        { task: "prepare food", assignee: "yosef", priority: "High" },
        { task: "wash dishes", assignee: "ronen", priority: "Low" }
    ])
    const [editIndex, setEditIndex] = useState(null)

    // State to manage delete confirmation dialog
    const [open, setOpen] = useState(false)
    const [taskToDelete, setTaskToDelete] = useState(null)

    // Filter states
    const [assigneeFilter, setAssigneeFilter] = useState("")
    const [priorityFilter, setPriorityFilter] = useState("")

    // Unique Assignees and Priorities
    const uniqueAssignees = [...new Set(tasks.map(task => task.assignee))]
    const uniquePriorities = [...new Set(tasks.map(task => task.priority))]

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

    // Filtered tasks based on filters
    const filteredTasks = tasks.filter(task => {
        const matchesAssignee = assigneeFilter ? task.assignee === assigneeFilter : true
        const matchesPriority = priorityFilter ? task.priority === priorityFilter : true
        return matchesAssignee && matchesPriority
    })

    return (
        <div className="todo-list">
            <h1>Todo List</h1>
            <TaskForm
                addTask={addTask}
                updateTask={updateTask}
                editIndex={editIndex}
                taskData={editIndex !== null ? tasks[editIndex] : {}}
            />
            <TaskFilters
                assigneeFilter={assigneeFilter}
                onAssigneeFilterChange={(e) => setAssigneeFilter(e.target.value)}
                priorityFilter={priorityFilter}
                onPriorityFilterChange={(e) => setPriorityFilter(e.target.value)}
                uniqueAssignees={uniqueAssignees}
                uniquePriorities={uniquePriorities}
            />
            <TaskList tasks={filteredTasks} editTask={editTask} confirmDelete={confirmDelete} />
            <DeleteDialog open={open} handleClose={handleClose} deleteTask={deleteTask} />
        </div>
    )
}
