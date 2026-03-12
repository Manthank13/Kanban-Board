const OPTIONS = [
  { value: "high",   label: "High",   icon: "▲", cls: "pg-high" },
  { value: "medium", label: "Med",    icon: "●", cls: "pg-med"  },
  { value: "low",    label: "Low",    icon: "▼", cls: "pg-low"  },
]

function PriorityGroup({ value, onChange }) {
  return (
    <div className="priority-group">
      {OPTIONS.map(opt => (
        <button
          key={opt.value}
          type="button"
          className={value === opt.value ? opt.cls : ""}
          onClick={() => onChange(opt.value)}
        >
          <span>{opt.icon}</span>
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export default PriorityGroup
