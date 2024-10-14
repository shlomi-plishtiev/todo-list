export function TaskFilters({
    assigneeFilter, onAssigneeFilterChange, priorityFilter, onPriorityFilterChange, uniqueAssignees, uniquePriorities, sortByAssignee, sortAssigneeAsc, sortByPriority, sortPriorityAsc
}) {
    return (
        <div className="filter-options">
            <div className="filter">
                <h2>Filter:</h2>
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

            <div className="sort">
                <h2>Sort:</h2>
                <div className="sort-buttons">
                    <button onClick={sortByAssignee}>
                        Sort by Assignee {sortAssigneeAsc ? "↑" : "↓"}
                    </button>
                    <button onClick={sortByPriority}>
                        Sort by Priority {sortPriorityAsc ? "↑" : "↓"}
                    </button>
                </div>
            </div>
        </div>
    )
}
