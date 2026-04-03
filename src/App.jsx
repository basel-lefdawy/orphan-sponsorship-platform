import { Routes, Route } from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import Home from "./pages/Home";
import About from "./pages/About";
import Orphan from './pages/orphans/orphan';
import Details from './components/Details';
import HelpRequest from "./pages/HelpRequest/HelpRequest";
import DonationForm from "./pages/Donation/Donation";
import SponsorFormPage from "./components/sponsoringForm/SponsorFormPage";
// Admin imports
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import OrphansList from "./pages/AdminDashboard/OrphansList";
import AddOrphan from "./pages/AdminDashboard/AddOrphan";
import EditOrphan from "./pages/AdminDashboard/EditOrphan";
import DonationsList from "./pages/AdminDashboard/DonationsList";
import SponsorsList from "./pages/AdminDashboard/SponsorsList";
import HelpRequestsList from "./pages/AdminDashboard/HelpRequestsList";
function App() {
  return (
    <Routes>
      <Route element={<MainLayouts />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/orphans" element={<Orphan />} />
        <Route path="/orphans/details/:id" element={<Details />} />
        <Route path="/help" element={<HelpRequest />} />
        <Route path="/donate" element={<DonationForm />} />
        <Route path="/sponsor-form" element={<SponsorFormPage />} />
      </Route>
      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="orphans" element={<OrphansList />} />
        <Route path="orphans/add" element={<AddOrphan />} />
        <Route path="orphans/edit/:id" element={<EditOrphan />} />
        <Route path="donations" element={<DonationsList />} />
        <Route path="sponsors" element={<SponsorsList />} />

        <Route path="help-requests" element={<HelpRequestsList />} />
      </Route>
    </Routes>
  );
}

export default App;