import { Hit } from '../types/ApiResponse'
import { Story } from '../types/Story'
import { News } from '../types/StoryList'
import { formatDistance } from 'date-fns'

function transformHits(hits: Hit[]): Story[] {
  return hits.map((hit) => {
    return {
      storyId: hit.story_id,
      title: hit.story_title || hit.title,
      author: hit.author,
      createdAt: hit.created_at,
      url: hit.story_url || hit.url,
      favorite: false,
    }
  })
}

export async function handleFetchStories(framework: News, page = 0) {
  const url = `https://hn.algolia.com/api/v1/search_by_date?query=${framework}&page=${page}`
  const response = await fetch(url)
  const data = await response.json()
  return transformHits(data.hits)
}

export function handleGetFavoriteStories(): Story[] {
  const favorites = localStorage.getItem('hacker__news__clone__favorites')
  if (favorites != null) {
    return JSON.parse(favorites) as Story[]
  }
  return []
}

export function handleSetCategory(category: News): void {
  localStorage.setItem('hacker__news__clone__category', category)
}

export function handleGetCategory() {
  return localStorage.getItem('hacker__news__clone__category')
}

export function handleAddRemoveFavorite(story: Story) {
  let favorites = handleGetFavoriteStories()

  if (!story.favorite) {
    favorites = favorites.filter(
      (favorite: Story) => favorite.createdAt != story.createdAt
    )
  } else {
    favorites = favorites.concat(story)
  }

  localStorage.setItem(
    'hacker__news__clone__favorites',
    JSON.stringify(favorites)
  )
}

export function handleClickOutside(
  ref: React.MutableRefObject<HTMLElement>,
  callback: () => void
) {
  const myRef = ref
  function mouseEvent(event: MouseEvent) {
    if (myRef.current && !myRef.current.contains(event.target as Node)) {
      callback()
    }
  }

  return mouseEvent
}

export function handleTimeSinceDate(dateString: string): string {
  const date = new Date(dateString)
  return formatDistance(new Date(), date, { addSuffix: false })
}
