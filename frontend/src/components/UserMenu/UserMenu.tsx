import { Link, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout } from '../../features/auth/authSlice'

const UserMenu: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    localStorage.removeItem('token')
    dispatch(logout())
    navigate('/')
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <li>
        <Link to="/profile" onClick={() => navigate('/profile')}>
          Profile
        </Link>
      </li>
      <li>
        <Link to="/admin" onClick={() => navigate('/admin')}>
          Control Panel
        </Link>
      </li>
      <li>
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      </li>
    </>
  )
}

export default UserMenu
