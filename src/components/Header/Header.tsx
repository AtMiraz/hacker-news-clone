import './Header.css'
import logo from '../../assets/svgs/hacker-news.svg'

function Header() {
  return (
    <>
      <div className="hacker__news__app-header">
        <h1> Hacker News </h1>
        <img src={logo} alt="logo" />
      </div>
    </>
  )
}

export default Header
