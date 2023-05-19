import React from 'react'
import StoryCard from '../src/components/StoryCard/StoryCard'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { expect, test, describe, vi } from 'vitest'
import { Story } from '../src/types/Story'

describe('StoryCard tests', () => {
  const story: Story = {
    title: 'some title',
    author: 'an author',
    createdAt: '2020-05-15T20:57:04.000Z',
    favorite: false,
    url: 'some url',
  }

  test('Should render the component provided the right data', () => {
    const component = render(
      <StoryCard
        story={story}
        onClick={() => {
          return
        }}
      />
    )
    expect(component).toMatchSnapshot()
    expect(component).to.exist
  })

  test('Should trigger a function when user clicks on the heart', async () => {
    const onClick = vi.fn()
    render(<StoryCard story={story} onClick={onClick} />)

    const heart = await screen.findByTestId('heart-button')
    await userEvent.click(heart)

    expect(onClick).toHaveBeenCalledOnce
  })

  test('should display the correct information on the card', async () => {
    render(
      <StoryCard
        story={story}
        onClick={() => {
          return
        }}
      />
    )

    const title = await screen.findByTestId('story-title')
    const info = await screen.findByTestId('story-info')

    expect(title.textContent).toContain('some title')
    expect(info.textContent).toContain('about 3 years ago by an author')
  })
})
