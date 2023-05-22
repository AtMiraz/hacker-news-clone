import {
  handleFetchStories,
  handleGetFavoriteStories,
  handleTimeSinceDate,
} from '../src/utils/utils'
import { describe, test, expect, afterAll, vi } from 'vitest'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        hits: [
          {
            title: 'some title',
            author: 'an author',
            created_at: '2020-05-15T20:57:04.000Z',
            url: 'some url',
            story_id: 1235123,
          },
        ],
      }),
  })
)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.localStorage = {
  getItem: (key: string) => {
    return '[{"storyId":35990320,"title":"something","author":"author","createdAt":"2023-05-18T18:24:48.000Z","url":null,"favorite":true}]'
  },
  setItem: () => {
    return
  },
}

describe('utils lib test', () => {
  afterAll(() => {
    vi.restoreAllMocks()
  })
  test('should fetch stories from API and converts them to the correct format', async () => {
    const stories = await handleFetchStories('angular', '0')
    expect(stories.length).toBe(1)
    expect(stories[0].title).toBe('some title')
    expect(stories[0].author).toBe('an author')
    expect(stories[0].createdAt).toBe('2020-05-15T20:57:04.000Z')
    expect(stories[0].url).toBe('some url')
    expect(stories[0].storyId).toBe(1235123)
    expect(stories[0].favorite).toBe(false)
  })

  test('should be able to get all of the favorites from localStorage', () => {
    const stories = handleGetFavoriteStories()
    expect(stories.length).toBe(1)
    expect(stories[0].title).toBe('something')
    expect(stories[0].author).toBe('author')
    expect(stories[0].createdAt).toBe('2023-05-18T18:24:48.000Z')
    expect(stories[0].url).toBe(null)
    expect(stories[0].storyId).toBe(35990320)
    expect(stories[0].favorite).toBe(true)
  })
})
