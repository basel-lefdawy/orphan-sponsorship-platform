const NOT_CONNECTED_MESSAGE = "This action is not connected to the backend yet.";

function notConnected() {
  throw new Error(NOT_CONNECTED_MESSAGE);
}

export const donationService = {
  async getAll() {
    return [];
  },

  async getById() {
    return null;
  },

  async create() {
    notConnected();
  },

  async update() {
    notConnected();
  },

  async delete() {
    notConnected();
  },
};
