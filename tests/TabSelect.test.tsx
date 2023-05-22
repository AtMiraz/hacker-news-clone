import React from 'react'
import TabSelect from '../src/components/TabSelect/TabSelect'
import { render, screen, fireEvent } from '@testing-library/react'
import { expect, test, describe, vi } from 'vitest'

describe('TabSelect tests', () => {
  test('should render the component', async () => {
    const component = render(
      <TabSelect
        items={[{ value: 'all', label: 'something' }]}
        onUpdate={(string) => ({})}
      />
    )

    await screen.findByTestId('tab-select')
    expect(component).toMatchSnapshot()
    expect(component).to.exist
  })

  test('should render as many tabs as there is items', async () => {
    const props = [
      {
        label: 'something',
        value: 'something',
      },
      {
        label: 'something 2',
        value: 'something2',
      },
      {
        label: 'something 3',
        value: 'something3',
      },
    ]

    render(<TabSelect items={props} onUpdate={(string) => ({})} />)

    await screen.findByTestId('tab-select')
    const items = await screen.findAllByTestId('tab-select-item')
    expect(items.length).toBe(3)
  })

  test('should notify the parent component of which tab was clicked', async () => {
    const props = [
      {
        label: 'something',
        value: 'entry1',
      },
      {
        label: 'something 2',
        value: 'entry2',
      },
    ]

    const cb = vi.fn((arg) => arg)

    render(<TabSelect items={props} onUpdate={cb} />)

    await screen.findByTestId('tab-select')
    await fireEvent.click(await screen.findByText('something 2'))

    expect(cb).toHaveBeenCalledWith('entry2')
  })
})
