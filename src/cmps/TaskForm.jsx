import { useState, useEffect } from "react"

export function TaskForm({ addTask, updateTask, editIndex, taskData }) {
    const [newTask, setNewTask] = useState("")
    const [assignee, setAssignee] = useState("")
    const [priority, setPriority] = useState("Medium")

    useEffect(() => {
        if (editIndex !== null) {
            setNewTask(taskData.task)
            setAssignee(taskData.assignee)
            setPriority(taskData.priority)
        }
    }, [editIndex, taskData])

    function handleInputChange(event) {
        setNewTask(event.target.value)
    }

    function handleAssigneeChange(event) {
        setAssignee(event.target.value)
    }

    function handlePriorityChange(event) {
        setPriority(event.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (editIndex !== null) {
            updateTask(newTask, assignee, priority)
        } else {
            addTask(newTask, assignee, priority)
        }
        resetForm()
    }

    function resetForm() {
        setNewTask("")
        setAssignee("")
        setPriority("Medium")
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task description..."
                value={newTask}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder="Assignee..."
                value={assignee}
                onChange={handleAssigneeChange}
            />
            <select value={priority} onChange={handlePriorityChange}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <button type="submit">{editIndex !== null ? "Update Task" : "Add Task"}</button>
        </form>
    )
}
