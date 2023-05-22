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
    let newStories = stories.map((newStory) => {
      if (story.createdAt === newStory.createdAt) {
        newStory.favorite = !newStory.favorite
        handleAddRemoveFavorite(newStory)
        return newStory
      }
      return newStory
    })

    if (mode === 'favorites') {
      newStories = newStories.filter((newStory) => newStory.favorite)
    }
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
          // In case the user already has some favorites
          // Try to find the favorites to mark them.
          const favorites = handleGetFavoriteStories()
          const stories = data.map((story) => {
            const found = favorites.find(
              (favoritedStory) =>
                story.createdAt === favoritedStory.createdAt &&
                story.storyId === favoritedStory.storyId
            )
            if (found) {
              return { ...story, favorite: true }
            }
            return story
          })
          console.log('stories', stories)
          console.log('favorite', favorites)
          setStories(stories)
          isFetching.current = false
        })
        .catch((e) => {
          console.warn(e)
        })
    }
  }, [mode, newsType])

  return (
    <div
      className={`hacker__news__app-list-container ${
        mode === 'favorites' && 'extra-margin-top'
      }`}
      data-testid="list-container"
    >
      {stories.length > 0
        ? stories.map((story) => (
            <StoryCard
              story={story}
              onClick={handleFavorite}
              key={`${story.createdAt}-${mode}-${story.storyId}`}
            />
          ))
        : mode === 'favorites'
        ? 'No favorite stories yet'
        : 'Loading... '}
    </div>
  )
}

export default StoryList
