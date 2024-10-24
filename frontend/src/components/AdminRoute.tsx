import withRoleCheck from './withRoleCheck'
import Admin from '../pages/Admin'

const AdminRoute = withRoleCheck(['admin'])(Admin)

export default AdminRoute
