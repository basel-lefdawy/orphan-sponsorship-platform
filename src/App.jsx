import { Routes, Route, useLocation } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import MainLayouts from "./layouts/MainLayouts";
import Home from "./pages/Home";
import About from "./pages/About";
import Orphan from './pages/orphans/orphan';
import Details from './components/Details';
import HelpRequest from "./pages/HelpRequest/HelpRequest";
import DonationForm from "./pages/Donation/Donation";
import SponsorFormPage from "./components/sponsoringForm/SponsorFormPage";

function App() {
  const location = useLocation();

  // Scroll to top عند كل تغيير صفحة
  useLayoutEffect(() => {
    // للتأكد من أن كل scrollable elements ترجع للأعلى
    document.documentElement.scrollTo(0, 0); // html
    document.body.scrollTo(0, 0); // body
  }, [location.pathname]);

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
    </Routes>
  );
}

export default App;