const NOT_CONNECTED_MESSAGE = "هذا الإجراء غير متصل بالباكند بعد.";

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
