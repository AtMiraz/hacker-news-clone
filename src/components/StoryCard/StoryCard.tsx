import './StoryCard.css'
import clock from '../../assets/svgs/clock.svg'
import heartFilled from '../../assets/svgs/heart-filled.svg'
import heartOutline from '../../assets/svgs/heart-outline.svg'
import { Story } from '../../types/Story'
import { formatDistance } from 'date-fns'

type StoryProps = {
  story: Story
  onClick: () => void
}

function openInNewWindow(url: string): void {
  // mitigates security risk of opening url on _blank
  // https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

function handleDate(dateString: string): string {
  const date = new Date(dateString)
  return formatDistance(new Date(), date, { addSuffix: false })
}

function StoryCard({ story, onClick }: StoryProps) {
  return (
    <div className="hacker__news__app-story-card">
      <div
        className="story__card__info"
        onClick={() => openInNewWindow(story.url)}
      >
        <div className="story__card__info-author">
          <img src={clock} alt="clock" />
          <span data-testid="story-info">
            {handleDate(story.createdAt)} ago by {story.author}
          </span>
        </div>
        <div className="story__card__info-title" data-testid="story-title">
          {story.title}
        </div>
      </div>
      <div className="story__card__actions">
        <img
          className="story__card__actions-heart"
          data-testid="heart-button"
          onClick={() => onClick()}
          src={story.favorite ? heartFilled : heartOutline}
          alt="favorited"
        />
      </div>
    </div>
  )
}

export default StoryCard
