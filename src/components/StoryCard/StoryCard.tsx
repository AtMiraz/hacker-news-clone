import './StoryCard.css'
import { heartFilled, heartOutline, clock } from '../../assets/svgs/'
import { Story } from '../../types/Story'
import { handleTimeSinceDate } from '../../utils/utils'

type StoryProps = {
  story: Story
  onClick: (story: Story) => void
}

function openInNewWindow(story: Story): void {
  const url =
    story.url != null
      ? story.url
      : `https://news.ycombinator.com/item?id=${story.storyId}`

  // mitigates security risk of opening url on _blank
  // https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

function StoryCard({ story, onClick }: StoryProps) {
  return (
    <div
      className="hacker__news__app-story-card"
      data-testid="story-card-component"
    >
      <div className="story__card__info" onClick={() => openInNewWindow(story)}>
        <div className="story__card__info-author">
          <img src={clock} alt="clock" />
          <span data-testid="story-info">
            {handleTimeSinceDate(story.createdAt)} ago by {story.author}
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
          onClick={() => onClick(story)}
          src={story.favorite ? heartFilled : heartOutline}
          alt="favorited"
        />
      </div>
    </div>
  )
}

export default StoryCard
