import { Routes, Route } from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import Home from "./pages/Home";
import About from "./pages/About";
import Orphan from './pages/orphans/orphan';
import Details from './components/Details';
import HelpRequest from "./pages/HelpRequest/HelpRequest";
import DonationForm from "./pages/Donation/Donation";
import SponsorFormPage from "./components/sponsoringForm/SponsorFormPage";
import Login from "./pages/login/login";
import SignUp from "./pages/login/signUp";
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
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;