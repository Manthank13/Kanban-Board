import { Draggable } from "@hello-pangea/dnd"
import { createPortal } from "react-dom"

const P_ICON  = { high: "▲", medium: "●", low: "▼" }
const P_LABEL = { high: "High", medium: "Medium", low: "Low" }

function CardContent({ task, snapshot, provided, deleteTask, toggleComplete, openModal }) {
  const isOverdue = task.due && !task.completed &&
    new Date(task.due + "T23:59:59") < new Date()

  function formatDate(str) {
    if (!str) return ""
    const d = new Date(str + "T12:00:00")
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
  }

  const card = (
    <div
      className={`task ${task.completed ? "completed" : ""} ${snapshot.isDragging ? "is-dragging" : ""}`}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="task-main">
        <div className="task-header">
          <input
            type="checkbox"
            checked={task.completed || false}
            onChange={() => toggleComplete(task)}
            onClick={e => e.stopPropagation()}
          />
          <span className="task-title">{task.title}</span>
        </div>

        {task.desc && <p className="task-desc">{task.desc}</p>}

        {(task.priority || task.due) && (
          <div className="task-meta">
            {task.priority && (
              <span className={`p-badge ${task.priority}`}>
                {P_ICON[task.priority]} {P_LABEL[task.priority]}
              </span>
            )}
            {task.due && (
              <span className={`due-badge ${isOverdue ? "overdue" : ""}`}>
                {isOverdue ? "⚠️" : "📅"} {formatDate(task.due)}
              </span>
            )}
          </div>
        )}

        {task.image && <img src={task.image} className="task-image" alt="" />}
      </div>

      <div className="task-buttons">
        <button onClick={e => { e.stopPropagation(); openModal(task) }} title="Edit">✏️</button>
        <button onClick={e => { e.stopPropagation(); deleteTask(task) }} title="Delete">🗑</button>
      </div>
    </div>
  )

  // portal while dragging so the card isn't clipped by column overflow
  if (snapshot.isDragging) {
    return createPortal(card, document.body)
  }

  return card
}

function TaskCard({ task, index, deleteTask, toggleComplete, openModal }) {
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <CardContent
          task={task}
          snapshot={snapshot}
          provided={provided}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
          openModal={openModal}
        />
      )}
    </Draggable>
  )
}

export default TaskCard
