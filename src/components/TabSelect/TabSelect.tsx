import './TabSelect.css'
import { useState } from 'react'

function TabSelect({
  items,
  onUpdate,
}: {
  items: Array<{ label: string; value: string }>
  onUpdate: (item: string) => void
}) {
  const [selected, setSelected] = useState(items[0].value)

  function handleSelect(item: { label: string; value: string }) {
    setSelected(item.value)
    onUpdate(item.value)
  }

  return (
    <div className="tab__select-container" data-testid="tab-select">
      {items.map((item) => (
        <div
          className={`tab__select-item ${
            selected === item.value && 'selected'
          }`}
          key={item.value}
          onClick={() => handleSelect(item)}
        >
          <label className="tab__select-label" data-testid="tab-select-item">
            {item.label}
          </label>
        </div>
      ))}
    </div>
  )
}

export default TabSelect
