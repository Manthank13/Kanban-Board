import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import PriorityGroup from "./PriorityGroup"
import DatePicker from "./DatePicker"

function AddTask({ setTasks }) {
  const [title, setTitle]     = useState("")
  const [desc, setDesc]       = useState("")
  const [priority, setPriority] = useState("medium")
  const [due, setDue]         = useState("")
  const [open, setOpen]       = useState(false)

  function addTask() {
    if (!title.trim()) return
    setTasks(prev => ({
      ...prev,
      todo: [...prev.todo, {
        id: uuidv4(),
        title: title.trim(),
        desc, priority, due,
        image: "", link: "",
        completed: false
      }]
    }))
    setTitle(""); setDesc(""); setPriority("medium"); setDue(""); setOpen(false)
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) addTask()
    if (e.key === "Escape") setOpen(false)
  }

  return (
    <div className="addtask">
      <div className="addtask-row">
        <input
          placeholder="+ Add a task title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={handleKey}
          onFocus={() => setOpen(true)}
        />
        <button className="btn-add" onClick={addTask}>Add Task</button>
      </div>

      {open && (
        <div className="addtask-extra">
          <input
            placeholder="Description (optional)"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            onKeyDown={handleKey}
          />
          <div className="addtask-meta">
            <PriorityGroup value={priority} onChange={setPriority} />
            <DatePicker value={due} onChange={setDue} />
            <button className="cancel-btn" onClick={() => setOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddTask
