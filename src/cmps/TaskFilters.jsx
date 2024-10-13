import React from "react"

export function TaskFilters({ assigneeFilter, onAssigneeFilterChange, priorityFilter, onPriorityFilterChange, uniqueAssignees, uniquePriorities }) {
    return (
        <div className="filter-options">
            <h2>Filter: </h2>
            <select value={assigneeFilter} onChange={onAssigneeFilterChange}>
                <option value="">All Assignees</option>
                {uniqueAssignees.map((assignee, index) => (
                    <option key={index} value={assignee}>{assignee}</option>
                ))}
            </select>

            <select value={priorityFilter} onChange={onPriorityFilterChange}>
                <option value="">All Priorities</option>
                {uniquePriorities.map((priority, index) => (
                    <option key={index} value={priority}>{priority}</option>
                ))}
            </select>
        </div>
    )
}

