import { Routes, Route } from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import Home from "./pages/Home";
import About from "./pages/About";
import Activities from "./pages/ActivityPage/ActivityPage";
import Orphan from './pages/orphans/orphan';
import Details from './components/Details';  

function App() {
  return (
    <Routes>
      <Route element={<MainLayouts />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/activities' element={<Activities />} />
        <Route path="/orphans" element={<Orphan/>} />
        <Route path="/orphans/details/:id" element={<Details />} />
      </Route>     
    </Routes>
  );
}

export default App;
