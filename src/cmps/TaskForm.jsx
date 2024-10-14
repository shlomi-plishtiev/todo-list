import React, { useState, useEffect } from "react"

export function TaskForm({ addTask, updateTask, editIndex, taskData }) {
    const [newTask, setNewTask] = useState("")
    const [assignee, setAssignee] = useState("")
    const [priority, setPriority] = useState("Medium")
    const [isFormVisible, setIsFormVisible] = useState(false)

    useEffect(() => {
        if (editIndex !== null) {
            setNewTask(taskData.task)
            setAssignee(taskData.assignee)
            setPriority(taskData.priority)
            setIsFormVisible(true) 
        } else {
            resetForm() 
            setIsFormVisible(false)
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
        if (!newTask || !assignee) {
            alert("Please fill in all fields.")
            return
        }
        if (editIndex !== null) {
            updateTask(newTask, assignee, priority)
        } else {
            addTask(newTask, assignee, priority)
        }
        resetForm()
        setIsFormVisible(false) 
    }

    function resetForm() {
        setNewTask("")
        setAssignee("")
        setPriority("Medium")
    }

    return (
        <div className="form-container">
            <button onClick={() => setIsFormVisible(!isFormVisible)}>
                {isFormVisible ? "Hide Form" : "Add Task"}
            </button>
            {isFormVisible && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            className="task-input"
                            type="text"
                            placeholder="Task description..."
                            value={newTask}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <input
                            className="assignee-input"
                            type="text"
                            placeholder="Assignee..."
                            value={assignee}
                            onChange={handleAssigneeChange}
                        />
                    </div>
                    <div>
                        <select
                            className="priority-select"
                            value={priority}
                            onChange={handlePriorityChange}
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <button type="submit" className="submit-button">
                        {editIndex !== null ? "Update Task" : "Add Task"}
                    </button>
                </form>
            )}
        </div>
    )
}
