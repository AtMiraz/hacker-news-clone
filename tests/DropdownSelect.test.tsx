import React from 'react'
import DropdownSelect from '../src/components/DropdownSelect/DropdownSelect'
import { fireEvent, render, screen } from '@testing-library/react'
import { expect, test, describe } from 'vitest'
import { dropdownItem } from '../src/types/DropdownItem'

describe('DropdownSelect tests', () => {
  test('should render the component', async () => {
    const component = render(
      <DropdownSelect items={[]} onUpdate={() => ({})} />
    )

    await screen.findByTestId('dropdown-select')
    expect(component).toMatchSnapshot()
    expect(component).to.exist
  })

  test('should display a selected item as default', async () => {
    const items = [
      { name: 'first entry', value: 'angular', image: '', selected: false },
      { name: 'second entry', value: 'reactjs', image: '', selected: true },
    ] as dropdownItem[]
    render(<DropdownSelect items={items} onUpdate={() => ({})} />)

    const option = await screen.findByTestId('selected-option')

    expect(option.textContent).toContain('second entry')
  })

  test('should display the items dropdown only when clicked', async () => {
    const items = [
      { name: 'first entry', value: 'angular', image: '', selected: false },
      { name: 'second entry', value: 'reactjs', image: '', selected: true },
      { name: 'second entry', value: 'vuejs', image: '', selected: false },
    ] as dropdownItem[]
    render(<DropdownSelect items={items} onUpdate={() => ({})} />)

    const isOpen = await screen.findByTestId('select-options-items')
    expect(isOpen.className).not.toContain('select__options-open')

    await fireEvent.click(await screen.findByTestId('option-selected'))

    expect(isOpen.className).toContain('select__options-open')

    const options = await screen.findAllByTestId('select-options-item')
    expect(options.length).toBe(3)
  })
})
