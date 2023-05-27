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
  const [currentPage, setCurrentPage] = useState(0)
  const isFetching = useRef(false)
  const isFirstRender = useRef(true)
  const lastElement = useRef(null)

  function goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
    return handleFetchStories(newsType, currentPage)
  }

  function handlePopulateFavorites() {
    const favorites = handleGetFavoriteStories()
    setStories(favorites)
  }

  function handleFetchData() {
    handlePopulateStories()
      .then((data) => {
        // In case the user already has some favorites
        // Try to find the favorites to mark them.
        const favorites = handleGetFavoriteStories()
        const newStories = data.map((story) => {
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

        setStories((previouStories) => [...previouStories, ...newStories])
        setCurrentPage((previousPage) => previousPage + 1)

        isFetching.current = false
        isFirstRender.current = false
      })
      .catch((e) => {
        console.warn(e)
      })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching.current) {
          handleFetchData()
        }
      },
      { threshold: 1 }
    )

    if (lastElement.current) {
      observer.observe(lastElement.current)
    }

    return () => {
      if (lastElement.current) {
        observer.unobserve(lastElement.current)
      }
    }
  }, [newsType, lastElement, currentPage])

  useEffect(() => {
    if (isFirstRender.current) return
    // Cleanup whenever mode changes.
    setCurrentPage(0)
    setStories([])
    if (mode === 'all') {
      handleFetchData()
    } else {
      handlePopulateFavorites()
    }
  }, [mode])

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
              key={`${story.createdAt}-${mode}-${story.storyId}-${story.author}-${story.title}`}
            />
          ))
        : mode === 'favorites'
        ? 'No favorite stories yet'
        : 'Loading... '}
      <div
        className="list__container-go-to-top"
        title="Go to top"
        onClick={goToTop}
      >
        {' '}
      </div>
      {mode === 'all' && <div ref={lastElement}></div>}
    </div>
  )
}

export default StoryList
