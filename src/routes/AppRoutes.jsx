// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ActivityPage from '../pages/ActivityPage/ActivityPage';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/ActivityPage" element={<ActivityPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
