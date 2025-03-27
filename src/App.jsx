import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Table from './pages/Table'
import Map1 from './pages/Map1'
import Map2 from './pages/Map2'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<Table />} />
        <Route path="/map1" element={<Map1 />} />
        <Route path="/map2" element={<Map2 />} />
      </Routes>

      <Link to='/'>Go to Home</Link> <br/>
      <Link to='/table'>Go to Table</Link> <br/>
      <Link to='/map1'>Go to Map1</Link> <br/>
      <Link to='/map2'>Go to Map2</Link>
    </>
  )
}

export default App
