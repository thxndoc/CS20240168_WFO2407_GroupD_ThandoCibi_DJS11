import ShowPreviews from './components/ShowPreviews'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            
            <Route index element={<ShowPreviews />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
