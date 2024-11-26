import ShowPreviews from './components/ShowPreviews'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<ShowPreviews />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
