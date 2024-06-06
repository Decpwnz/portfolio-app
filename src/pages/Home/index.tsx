import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li>
          <Link to="portfolio">Portfolio</Link>
        </li>
        <li>
          <Link to="about">About</Link>
        </li>
        <li>
          <Link to="contacts">Contacts</Link>
        </li>
      </ul>
    </div>
  )
}
export default Home
