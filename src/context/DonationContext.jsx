import { createContext, useContext, useState } from "react";

const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
  const [openDonation, setOpenDonation] = useState(false);

  return (
    <DonationContext.Provider value={{ openDonation, setOpenDonation }}>
      {children}
    </DonationContext.Provider>
  );
};

export const useDonation = () => useContext(DonationContext);