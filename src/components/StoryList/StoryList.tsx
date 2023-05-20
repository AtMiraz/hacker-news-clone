import './StoryList.css'
import { useEffect, useRef, useState } from 'react'
import { Story } from '../../types/Story'
import {
  handleFetchStories,
  handleGetFavoriteStories,
  handleAddRemoveFavorite,
} from '../../utils/utils'
import { StoryListProps } from '../../types/StoryList'
import StoryCard from '../StoryCard/StoryCard'

function StoryList({ mode = 'all', newsType = 'vuejs' }: StoryListProps) {
  const [stories, setStories] = useState<Story[]>([])
  const isFetching = useRef(false)

  function handleFavorite(story: Story) {
    const newStories = stories.map((newStory) => {
      if (story.createdAt === newStory.createdAt) {
        newStory.favorite = !newStory.favorite
        handleAddRemoveFavorite(story)
        return newStory
      }
      return newStory
    })
    setStories(newStories)
  }

  async function handlePopulateStories() {
    if (mode === 'favorites') {
      return handleGetFavoriteStories()
    }
    return handleFetchStories(newsType, '0')
  }

  useEffect(() => {
    if (!isFetching.current) {
      isFetching.current = true
      handlePopulateStories()
        .then((data) => {
          setStories(data)
          isFetching.current = false
        })
        .catch((e) => {
          console.warn(e)
        })
    }
  }, [mode, newsType])

  return (
    <div
      className="hacker__news__app-list-container"
      data-testid="list-container"
    >
      {stories.length > 0
        ? stories.map((story) => (
            <StoryCard
              story={story}
              onClick={handleFavorite}
              key={story.createdAt}
            />
          ))
        : mode === 'favorites'
        ? 'No favorite stories yet'
        : 'Loading... '}
    </div>
  )
}

export default StoryList
