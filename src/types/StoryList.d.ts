export type News = 'angular' | 'reactjs' | 'vuejs'

export type StoryListProps = {
  mode?: 'all' | 'favorites'
  newsType?: News
}
