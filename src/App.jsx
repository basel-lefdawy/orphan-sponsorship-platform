import { Routes, Route } from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import Home from "./pages/Home";
import About from "./pages/About";
import Activities from "./pages/ActivityPage/ActivityPage";
import Orphan from './pages/orphans/orphan';
import Details from './components/Details';
import HelpRequest from "./pages/HelpRequest/HelpRequest";
import DonationForm from "./pages/Donation/Donation";
import SponsoringPage from "./pages/sponsoring/sponsoring";
import OrphansByCategoryPage from "./pages/sponsoring/OrphansByCategoryPage";
import SponsorFormPage from "./pages/sponsoring/sponsoringForm/SponsorFormPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayouts />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/activities' element={<Activities />} />
        <Route path="/orphans" element={<Orphan />} />
        <Route path="/orphans/details/:id" element={<Details />} />
        <Route path="/help" element={<HelpRequest />} />
        <Route path="/donate" element={<DonationForm />} />
        <Route path="/sponsoring" element={<SponsoringPage />} />
        <Route
          path="/sponsoring/:type"
          element={<OrphansByCategoryPage />}
        />
        <Route
          path="/sponsoring/details/:id"
          element={<Details />}
        />
        <Route path="/SponsorFormPage" element={<SponsorFormPage />} />

      </Route>
    </Routes>
  );
}

export default App;