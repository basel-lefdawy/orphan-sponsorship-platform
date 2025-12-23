import { Routes, Route } from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import Home from "./pages/Home";
import About from "./pages/About";
import Activities from "./pages/ActivityPage/ActivityPage";
import Orphan from './pages/orphans/orphan';
import Details from './components/Details';  
import HelpRequest from "./pages/HelpRequest/HelpRequest";
import DonationForm from "./pages/Donation/Donation";

function App() {
  return (
    <Routes>
      <Route element={<MainLayouts />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/activities' element={<Activities />} />
        <Route path="/orphans" element={<Orphan/>} />
        <Route path="/orphans/details/:id" element={<Details />} />
        <Route path="/help" element={<HelpRequest/>} />
        <Route path="/donate" element={<DonationForm/>} />

      </Route>     
    </Routes>
  );
}

export default App;