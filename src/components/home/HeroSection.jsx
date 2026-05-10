import headerImage from "../../assets/orphans.jpg";
import { Button } from "@mui/material";
import './hero.css';
import { useDonation } from "../../context/DonationContext";
import DonationForm from "../../pages/Donation/Donation";

function HeroSection() {
  const { openDonation, setOpenDonation } = useDonation();

  return (
    <div className="header">
      <img className="imgorphans" src={headerImage} alt="header" />
      <div className="header-overlay"></div>
      <div className="header-text">
        <h1>دار الايتام</h1>
        <p>معًا نمنح الأمل لكل طفل</p>
        <Button className="btn" variant="contained" onClick={() => setOpenDonation(true)}>
          تبرع
        </Button>
      </div>

      {openDonation && <DonationForm onClose={() => setOpenDonation(false)} />}
    </div>
  );
}

export default HeroSection;