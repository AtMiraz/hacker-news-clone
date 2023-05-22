import React from 'react'
import StoryList from '../src/components/StoryList/StoryList'
import { render, screen } from '@testing-library/react'
import { expect, test, describe, vi, afterAll } from 'vitest'

vi.mock('../src/utils/utils', () => {
  return {
    handleFetchStories: (...args) => {
      return [
        {
          title: 'some title',
          author: 'an author',
          createdAt: '2020-05-15T20:57:02.000Z',
          favorite: false,
          url: 'some url',
          storyId: 120192921,
        },
        {
          title: 'some title',
          author: 'an author',
          createdAt: '2020-05-16T20:57:04.000Z',
          favorite: false,
          url: 'some url',
          storyId: 1235123,
        },
      ]
    },
    handleGetFavoriteStories: () => {
      return [
        {
          title: 'some title',
          author: 'an author',
          createdAt: '2020-05-16T20:57:04.000Z',
          favorite: false,
          url: 'some url',
          storyId: 1235123,
        },
      ]
    },
    handleTimeSinceDate: (string) => string,
  }
})

describe('StoryList test', () => {
  afterAll(() => {
    vi.restoreAllMocks()
  })

  test('should render the component', async () => {
    const component = render(<StoryList />)
    await screen.findByTestId('list-container')
    expect(component).toMatchSnapshot()
    expect(component).to.exist
  })

  test('should render the correct amount of children components', async () => {
    render(<StoryList />)
    await screen.findByTestId('list-container')
    const cards = await screen.findAllByTestId('story-card-component')
    expect(cards.length).toBe(2)
  })

  test('should mark a story as favorite by default when fetching if its on the localStorage', async () => {
    render(<StoryList />)
    await screen.findByTestId('list-container')

    const favorited = await screen.getByAltText('favorited')

    expect(favorited).to.exist
  })
})
