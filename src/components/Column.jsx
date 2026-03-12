import { Droppable } from "@hello-pangea/dnd"
import TaskCard from "./TaskCard"

function Column({ title, tasks, id, deleteTask, toggleComplete, openModal }) {
  const completed = tasks.filter(t => t.completed).length
  const progress  = tasks.length ? Math.round((completed / tasks.length) * 100) : 0

  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          className={`column ${snapshot.isDraggingOver ? "drag-over" : ""}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="column-strip" />

          <div className="column-body">
            <div className="column-header">
              <div className="col-title-wrap">
                <div className="col-dot" />
                <h2>{title}</h2>
                <span className="task-count">{tasks.length}</span>
              </div>
              <span className="progress-label">{progress}%</span>
            </div>

            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>

            <div className="task-list">
              {tasks.map((task, i) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={i}
                  deleteTask={deleteTask}
                  toggleComplete={toggleComplete}
                  openModal={openModal}
                />
              ))}
              {provided.placeholder}
            </div>

            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="empty-col">Drop tasks here</div>
            )}
          </div>
        </div>
      )}
    </Droppable>
  )
}

export default Column
