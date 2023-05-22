import './DropdownSelect.css'
import { useEffect, useRef, useState } from 'react'
import { handleClickOutside } from '../../utils/utils'
import { dropdownItem } from '../../types/DropdownItem'

type DropdownSelectProps = {
  items: dropdownItem[]
  onUpdate: (item: dropdownItem) => void
}

function DropdownSelect({ items, onUpdate }: DropdownSelectProps) {
  const [selectedItem, setSelectedItem] = useState<dropdownItem>()
  const [isOpen, setIsOpen] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)

  function handleItemClick(item: dropdownItem) {
    setSelectedItem(item)
    onUpdate(item)
    toggleDropdown()
  }

  function toggleDropdown() {
    setIsOpen(!isOpen)
  }

  function closeDropdown() {
    setIsOpen(false)
  }

  const outsideClickHandler = handleClickOutside(
    divRef as React.MutableRefObject<HTMLDivElement>,
    closeDropdown
  )

  useEffect(() => {
    const defaultItem = items.find((item) => item.selected) || items[0]
    setSelectedItem(defaultItem)
  }, [selectedItem])

  useEffect(() => {
    if (divRef.current) {
      document.addEventListener('mousedown', outsideClickHandler)
    }
    return () => {
      document.removeEventListener('mousedown', outsideClickHandler)
    }
  }, [])

  return (
    <div
      className="select__options-container"
      ref={divRef}
      data-testid="dropdown-select"
    >
      <div
        className="select__options-selected"
        data-testid="option-selected"
        onClick={toggleDropdown}
      >
        <img
          src={selectedItem?.image}
          className="select__options-image"
          alt={selectedItem?.image}
        />
        <span data-testid="selected-option" className="select__options-label">
          {selectedItem?.name}
        </span>
        <i className={`select__options-arrow ${isOpen ? 'close' : 'open'}`}></i>
      </div>
      <div
        data-testid="select-options-items"
        className={`select__options-items ${isOpen && 'select__options-open'}`}
      >
        {items.map((item) => (
          <div
            className={`select__options-item ${
              item.selected && 'select__options-item-selected'
            }`}
            data-testid="select-options-item"
            key={item.value}
            onClick={() => handleItemClick(item)}
          >
            <img
              className="select__options-image"
              src={item.image}
              alt={item.value}
            />
            <span className="select__options-label">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DropdownSelect
