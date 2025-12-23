import headerImage from "../../assets/orphans.jpg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './hero.css';

function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <img className="imgorphans" src={headerImage} alt="header" />
      <div className="header-overlay"></div>
      <div className="header-text">
        <h1>دار الايتام</h1>
        <p>معًا نمنح الأمل لكل طفل</p>
        <Button className="btn" variant="contained" onClick={() => navigate("/donate")}>
          تبرع
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;

