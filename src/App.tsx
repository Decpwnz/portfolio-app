import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Outlet /> {/* This renders the matched child route */}
    </>
  )
}

export default App
