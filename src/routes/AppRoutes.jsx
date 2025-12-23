import { Routes, Route } from "react-router-dom";
import ActivityPage from "../pages/ActivityPage/ActivityPage";
import SponsoringPage from "../pages/sponsoring/sponsoring";
import OrphansByCategoryPage from "../pages/sponsoring/OrphansByCategoryPage";
import SponsorFormPage from "../pages/sponsoring/sponsoringForm/SponsorFormPage";
import Details from "../pages/sponsoring/details";
const AppRoutes = () => {
    return (
        <Routes>
            {/* مثال: صفحة رئيسية ثانية للموقع */}
            <Route path="/ActivityPage" element={<ActivityPage />} />

            {/* قسم الكفالة */}
            <Route path="/sponsoring" element={<SponsoringPage />} />
            <Route
                path="/sponsoring/:type"
                element={<OrphansByCategoryPage />}
            />
            <Route path="/SponsorFormPage" element={<SponsorFormPage />} />
            <Route
                path="/details/:id"
                element={<Details />}
            />
        </Routes>
    );
};

export default AppRoutes;

