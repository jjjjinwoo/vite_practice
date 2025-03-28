import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Table from './pages/Table'
import Map1 from './pages/Map1'
import Map2 from './pages/Map2'
import Map3 from './pages/Map3'
import Map4 from './pages/Map4'
import RentalMap from './pages/RentalMap'
import Chart from './pages/Chart'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<Table />} />
        <Route path="/map1" element={<Map1 />} />
        <Route path="/map2" element={<Map2 />} />
        <Route path="/map3" element={<Map3 />} />
        <Route path="/map4" element={<Map4 />} />
        <Route path="/rentalMap" element={<RentalMap />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>

      <Link to='/'>Go to Home</Link> <br/>
      <Link to='/table'>Go to Table</Link> <br/>
      <Link to='/map1'>Go to Map1</Link> <br/>
      <Link to='/map2'>Go to Map2</Link> <br/>
      <Link to='/map3'>Go to Map3</Link> <br/>
      <Link to='/map4'>Go to Map4</Link> <br/>
      <Link to='/rentalMap'>Go to RentalMap</Link> <br/>
      <Link to='/chart'>Go to Chart</Link>
    </>
  )
}

export default App
