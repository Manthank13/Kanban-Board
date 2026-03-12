import { useState, useEffect } from "react"
import { DragDropContext } from "@hello-pangea/dnd"
import Board from "./components/Board"
import AddTask from "./components/AddTask"
import TaskModal from "./components/TaskModal"

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("kanbanTasks")
      return saved ? JSON.parse(saved) : { todo: [], inProgress: [], done: [] }
    } catch { return { todo: [], inProgress: [], done: [] } }
  })

  const [search, setSearch]           = useState("")
  const [priorityFilter, setFilter]   = useState("all")
  const [darkMode, setDarkMode]       = useState(true)
  const [activeModal, setActiveModal] = useState(null)

  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks))
  }, [tasks])

  const totalTasks = Object.values(tasks).flat().length
  const doneTasks  = tasks.done.length

  function deleteTask(task) {
    setTasks(prev => {
      const u = { ...prev }
      for (let c in u) u[c] = u[c].filter(t => t.id !== task.id)
      return u
    })
  }

  function toggleComplete(task) {
    setTasks(prev => {
      const u = { ...prev }
      for (let c in u) u[c] = u[c].map(t => t.id === task.id ? { ...t, completed: !t.completed } : t)
      return u
    })
  }

  function updateTask(updated) {
    setTasks(prev => {
      const u = { ...prev }
      for (let c in u) u[c] = u[c].map(t => t.id === updated.id ? updated : t)
      return u
    })
  }

  function handleDragEnd(result) {
    if (!result.destination) return
    const { source: src, destination: dst } = result
    const srcItems = [...tasks[src.droppableId]]
    const dstItems = src.droppableId === dst.droppableId ? srcItems : [...tasks[dst.droppableId]]
    const [moved]  = srcItems.splice(src.index, 1)
    dstItems.splice(dst.index, 0, moved)
    setTasks({ ...tasks, [src.droppableId]: srcItems, [dst.droppableId]: dstItems })
  }

  const PILLS = [
    { id: "all",    label: "All",    cls: "" },
    { id: "high",   label: "High",   cls: "fp-high" },
    { id: "medium", label: "Med",    cls: "fp-med"  },
    { id: "low",    label: "Low",    cls: "fp-low"  },
  ]

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={`app ${darkMode ? "dark" : "light"}`}>

        <div className="app-bg" />

        <div className="app-inner">
          <div className="topbar">
            <div className="topbar-left">
              <h1>Kanban</h1>
              <span className="topbar-sub">{doneTasks}/{totalTasks} done</span>
            </div>

            <div className="controls">
              <div className="search-wrap">
                <span className="search-icon">⌕</span>
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              <div className="filter-pill">
                {PILLS.map(p => (
                  <button
                    key={p.id}
                    className={
                      priorityFilter === p.id
                        ? (p.cls || "fp-active")
                        : ""
                    }
                    onClick={() => setFilter(p.id)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <button
                className="theme-toggle"
                onClick={() => setDarkMode(d => !d)}
                title="Toggle theme"
              >
                {darkMode ? "🌙" : "☀️"}
              </button>
            </div>
          </div>

          <AddTask setTasks={setTasks} />

          <Board
            tasks={tasks}
            search={search}
            priorityFilter={priorityFilter}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
            openModal={setActiveModal}
          />

          {activeModal && (
            <TaskModal
              task={activeModal}
              closeModal={() => setActiveModal(null)}
              updateTask={updateTask}
            />
          )}
        </div>
      </div>
    </DragDropContext>
  )
}

export default App
