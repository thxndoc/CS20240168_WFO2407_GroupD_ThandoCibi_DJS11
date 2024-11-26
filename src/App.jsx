import ShowPreviews from './pages/ShowPreviews'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Layout from './components/Layout'
import ShowDetails from './pages/ShowDetails'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<ShowPreviews />} />
                <Route path="/:showId" element={<ShowDetails />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
