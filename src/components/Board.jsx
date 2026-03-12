import Column from "./Column"

function Board({ tasks, search, priorityFilter, deleteTask, toggleComplete, openModal }) {

  function filterTasks(list) {
    return list.filter(task => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        (task.desc && task.desc.toLowerCase().includes(search.toLowerCase()))

      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter

      return matchesSearch && matchesPriority
    })
  }

  return (
    <div className="board">

      <Column
        title="Todo"
        id="todo"
        tasks={filterTasks(tasks.todo)}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
        openModal={openModal}
      />

      <Column
        title="In Progress"
        id="inProgress"
        tasks={filterTasks(tasks.inProgress)}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
        openModal={openModal}
      />

      <Column
        title="Done"
        id="done"
        tasks={filterTasks(tasks.done)}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
        openModal={openModal}
      />

    </div>
  )
}

export default Board
