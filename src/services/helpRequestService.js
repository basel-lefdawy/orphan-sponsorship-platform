import { helpRequests as mockHelpRequests } from "../utils/mockData";

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

let helpRequestsData = [...mockHelpRequests];

export const helpRequestService = {
  async getAll() {
    await delay();
    return [...helpRequestsData];
  },

  async getById(id) {
    await delay();
    return helpRequestsData.find((h) => h.id === Number(id)) || null;
  },

  async create(helpRequest) {
    await delay();
    const newRequest = {
      ...helpRequest,
      id: Math.max(...helpRequestsData.map((h) => h.id), 0) + 1,
    };
    helpRequestsData.push(newRequest);
    return newRequest;
  },

  async update(id, updates) {
    await delay();
    const index = helpRequestsData.findIndex((h) => h.id === Number(id));
    if (index === -1) throw new Error("Help request not found");
    helpRequestsData[index] = { ...helpRequestsData[index], ...updates };
    return helpRequestsData[index];
  },

  async delete(id) {
    await delay();
    helpRequestsData = helpRequestsData.filter((h) => h.id !== Number(id));
    return { success: true };
  },
};
