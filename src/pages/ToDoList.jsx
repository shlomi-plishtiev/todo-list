import React, { useState } from "react"
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
    const [open, setOpen] = useState(false)
    const [taskToDelete, setTaskToDelete] = useState(null)
    const [assigneeFilter, setAssigneeFilter] = useState("")
    const [priorityFilter, setPriorityFilter] = useState("")

    // State for sorting
    const [sortAssigneeAsc, setSortAssigneeAsc] = useState(true)
    const [sortPriorityAsc, setSortPriorityAsc] = useState(true)

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

    // Sorting Functions
    function sortByAssignee() {
        const sortedTasks = [...tasks].sort((a, b) => {
            if (a.assignee < b.assignee) return sortAssigneeAsc ? -1 : 1
            if (a.assignee > b.assignee) return sortAssigneeAsc ? 1 : -1
            return 0
        })
        setTasks(sortedTasks)
        setSortAssigneeAsc(!sortAssigneeAsc)
    }

    function sortByPriority() {
        const sortedTasks = [...tasks].sort((a, b) => {
            const priorityOrder = { "High": 3, "Medium": 2, "Low": 1 }
            return sortPriorityAsc ? priorityOrder[a.priority] - priorityOrder[b.priority] : priorityOrder[b.priority] - priorityOrder[a.priority]
        })
        setTasks(sortedTasks)
        setSortPriorityAsc(!sortPriorityAsc)
    }

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
                uniqueAssignees={uniqueAssignees}
                uniquePriorities={uniquePriorities}
                assigneeFilter={assigneeFilter}
                onAssigneeFilterChange={(e) => setAssigneeFilter(e.target.value)}
                priorityFilter={priorityFilter}
                onPriorityFilterChange={(e) => setPriorityFilter(e.target.value)}
                sortByAssignee={sortByAssignee}
                sortAssigneeAsc={sortAssigneeAsc}
                sortByPriority={sortByPriority}
                sortPriorityAsc={sortPriorityAsc}
            />

            <TaskList tasks={filteredTasks} editTask={editTask} confirmDelete={confirmDelete} />
            <DeleteDialog open={open} handleClose={handleClose} deleteTask={deleteTask} />
        </div>
    )
}
