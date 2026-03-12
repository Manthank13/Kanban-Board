import { useState, useRef, useEffect } from "react"

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
]

function DatePicker({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const selected = value ? new Date(value + "T12:00:00") : null

  const today = new Date()
  const [viewYear, setViewYear]   = useState(selected ? selected.getFullYear()  : today.getFullYear())
  const [viewMonth, setViewMonth] = useState(selected ? selected.getMonth()     : today.getMonth())

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    if (open) document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  function selectDay(day) {
    const d = new Date(viewYear, viewMonth, day)
    const str = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`
    onChange(str)
    setOpen(false)
  }

  function clearDate(e) {
    e.stopPropagation()
    onChange("")
  }

  function setToday() {
    const d = today
    const str = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`
    onChange(str)
    setOpen(false)
  }

  function buildGrid() {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay()
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    const daysInPrev  = new Date(viewYear, viewMonth, 0).getDate()
    const cells = []

    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push({ day: daysInPrev - i, type: "prev" })
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, type: "cur" })
    }
    const trailing = 42 - cells.length
    for (let d = 1; d <= trailing; d++) {
      cells.push({ day: d, type: "next" })
    }
    return cells
  }

  const cells = buildGrid()

  const displayLabel = selected
    ? selected.toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" })
    : "Pick a date"

  return (
    <div className="datepicker-wrap" ref={ref}>
      <button
        type="button"
        className={`datepicker-trigger ${selected ? "has-date" : ""}`}
        onClick={() => setOpen(o => !o)}
      >
        <span>📅</span>
        <span>{displayLabel}</span>
        {selected && (
          <span className="dt-clear" onClick={clearDate} title="Clear">✕</span>
        )}
      </button>

      {open && (
        <div className="datepicker-popup">

          <div className="dp-header">
            <span className="dp-month">{MONTHS[viewMonth]} {viewYear}</span>
            <div className="dp-nav">
              <button onClick={prevMonth}>‹</button>
              <button onClick={nextMonth}>›</button>
            </div>
          </div>

          <div className="dp-grid">
            {DAYS.map(d => (
              <div key={d} className="dp-day-name">{d}</div>
            ))}
            {cells.map((cell, i) => {
              const isToday =
                cell.type === "cur" &&
                cell.day === today.getDate() &&
                viewMonth === today.getMonth() &&
                viewYear === today.getFullYear()

              const isSelected =
                cell.type === "cur" && selected &&
                cell.day === selected.getDate() &&
                viewMonth === selected.getMonth() &&
                viewYear === selected.getFullYear()

              return (
                <button
                  key={i}
                  type="button"
                  className={[
                    "dp-day",
                    cell.type !== "cur" ? "dp-other-month" : "",
                    isToday    ? "dp-today"    : "",
                    isSelected ? "dp-selected" : "",
                  ].join(" ").trim()}
                  onClick={() => selectDay(cell.day)}
                  onDoubleClick={() => {
                    if (cell.type === "prev") prevMonth()
                    if (cell.type === "next") nextMonth()
                  }}
                >
                  {cell.day}
                </button>
              )
            })}
          </div>

          <div className="dp-footer">
            <button className="dp-clear" onClick={() => { onChange(""); setOpen(false); }}>
              Clear
            </button>
            <button onClick={setToday}>Today</button>
          </div>

        </div>
      )}
    </div>
  )
}

export default DatePicker
