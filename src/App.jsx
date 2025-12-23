import './App.css'
import Orphan from './pages/orphans/orphan';
import Details from './components/Details';  
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Orphan/>} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
        
      </BrowserRouter>
 
    </>
  )
}

export default App
