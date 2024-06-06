import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div>
      <h1>YOOO THATS A CUSTOM NOT FOUND PAGE</h1>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  )
}

export default NotFound
