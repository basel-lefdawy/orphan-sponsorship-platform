import { donations as mockDonations } from "../utils/mockData";

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

let donationsData = [...mockDonations];

export const donationService = {
  async getAll() {
    await delay();
    return [...donationsData];
  },

  async getById(id) {
    await delay();
    return donationsData.find((d) => d.id === Number(id)) || null;
  },

  async create(donation) {
    await delay();
    const newDonation = {
      ...donation,
      id: Math.max(...donationsData.map((d) => d.id), 0) + 1,
    };
    donationsData.push(newDonation);
    return newDonation;
  },

  async update(id, updates) {
    await delay();
    const index = donationsData.findIndex((d) => d.id === Number(id));
    if (index === -1) throw new Error("Donation not found");
    donationsData[index] = { ...donationsData[index], ...updates };
    return donationsData[index];
  },

  async delete(id) {
    await delay();
    donationsData = donationsData.filter((d) => d.id !== Number(id));
    return { success: true };
  },
};
