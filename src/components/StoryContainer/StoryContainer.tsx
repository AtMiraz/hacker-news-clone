import './StoryContainer.css'
import { useState } from 'react'
import { dropdownItem } from '../../types/DropdownItem'
import { News } from '../../types/StoryList'
import { Category } from '../../types/Story'
import { handleGetCategory, handleSetCategory } from '../../utils/utils'
import { angular, react, vue } from '../../assets/images/'

import DropdownSelect from '../DropdownSelect/DropdownSelect'
import TabSelect from '../TabSelect/TabSelect'
import StoryList from '../StoryList/StoryList'

function StoryContainer() {
  let defaults = [
    {
      name: 'Angular',
      image: angular,
      selected: true,
      value: 'angular',
    },
    { name: 'React', value: 'reactjs', image: react, selected: false },
    { name: 'Vue', value: 'vuejs', image: vue, selected: false },
  ] as dropdownItem[]

  const tabs = [
    { label: 'All', value: 'all' as Category },
    { label: 'My faves', value: 'favorites' as Category },
  ]

  let currentCategory = 'angular' as News

  const storageCategory = handleGetCategory()

  if (storageCategory != null) {
    defaults = defaults.map((item) => {
      if (item.value === storageCategory) {
        currentCategory = item.value as News
        return { ...item, selected: true }
      }
      return { ...item, selected: false }
    })
  }

  const [newsCategories, setNewsCategories] = useState(defaults)

  const [currentMode, setMode] = useState<Category>('all')

  const [newsType, setType] = useState<News>(currentCategory)

  const handleDropdownUpdate = (item: dropdownItem) => {
    const categories = newsCategories.map((category) => {
      if (category.value === item.value) {
        if (item.value != newsType) {
          setType(item.value as News)
          handleSetCategory(item.value as News)
        }
        return { ...item, selected: true }
      }
      return { ...category, selected: false }
    })

    setNewsCategories(categories)
  }

  const handleTabUpdate = (item: string) => {
    setMode(item as Category)
  }

  return (
    <div className="hacker__news__app-story-container">
      <TabSelect items={tabs} onUpdate={handleTabUpdate}></TabSelect>
      <DropdownSelect
        items={newsCategories}
        onUpdate={handleDropdownUpdate}
      ></DropdownSelect>
      <StoryList mode={currentMode} newsType={newsType}></StoryList>
    </div>
  )
}

export default StoryContainer
