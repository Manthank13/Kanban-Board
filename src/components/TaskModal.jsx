import { useState } from "react"
import PriorityGroup from "./PriorityGroup"
import DatePicker from "./DatePicker"

function TaskModal({ task, closeModal, updateTask }) {
  const [title, setTitle]       = useState(task.title    || "")
  const [desc, setDesc]         = useState(task.desc     || "")
  const [image, setImage]       = useState(task.image    || "")
  const [link, setLink]         = useState(task.link     || "")
  const [priority, setPriority] = useState(task.priority || "medium")
  const [due, setDue]           = useState(task.due      || "")

  function save() {
    if (!title.trim()) return
    updateTask({ ...task, title: title.trim(), desc, image, link, priority, due })
    closeModal()
  }

  return (
    <div className="modal-bg" onClick={e => e.target === e.currentTarget && closeModal()}>
      <div className="modal" onKeyDown={e => e.key === "Escape" && closeModal()}>

        <div className="modal-header">
          <h2>Edit Task</h2>
          <button className="modal-close" onClick={closeModal}>×</button>
        </div>

        <div className="modal-field">
          <label>Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)}
            placeholder="Task title" autoFocus
            onKeyDown={e => e.key === "Enter" && save()} />
        </div>

        <div className="modal-field">
          <label>Description</label>
          <textarea value={desc} onChange={e => setDesc(e.target.value)}
            placeholder="Add details..." rows={3} />
        </div>

        <div className="modal-field">
          <label>Priority</label>
          <PriorityGroup value={priority} onChange={setPriority} />
        </div>

        <div className="modal-field">
          <label>Due Date</label>
          <DatePicker value={due} onChange={setDue} />
        </div>

        <div className="modal-field">
          <label>Image URL</label>
          <input value={image} onChange={e => setImage(e.target.value)} placeholder="https://..." />
        </div>

        <div className="modal-field">
          <label>Link</label>
          <input value={link} onChange={e => setLink(e.target.value)} placeholder="https://..." />
        </div>

        <div className="modal-buttons">
          <button className="btn-save" onClick={save}>Save Changes</button>
          <button className="btn-cancel" onClick={closeModal}>Cancel</button>
        </div>

      </div>
    </div>
  )
}

export default TaskModal
