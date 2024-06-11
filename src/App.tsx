import { Outlet } from 'react-router-dom'

import { Counter } from './features/counter/Counter'

function App() {
  return (
    <>
      <Outlet /> {/* This renders the matched child route */}
      <Counter />
    </>
  )
}

export default App
