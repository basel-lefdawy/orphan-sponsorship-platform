import store from "./dataStore";

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// Enrich a sponsor with computed orphanName for UI compatibility
function enrichSponsor(sponsor) {
  const orphan = sponsor.orphanId
    ? store.orphans.find((o) => o.id === sponsor.orphanId)
    : null;

  return {
    ...sponsor,
    orphanName: orphan ? orphan.name : "—",
  };
}

export const sponsorService = {
  async getAll() {
    await delay();
    return store.sponsors.map(enrichSponsor);
  },

  async getById(id) {
    await delay();
    const sponsor = store.sponsors.find((s) => s.id === Number(id));
    return sponsor ? enrichSponsor(sponsor) : null;
  },

  async create(sponsor) {
    await delay();
    const newSponsor = {
      ...sponsor,
      id: Math.max(...store.sponsors.map((s) => s.id), 0) + 1,
    };
    store.sponsors.push(newSponsor);

    // If orphanId is set, update the orphan's sponsorId
    if (newSponsor.orphanId != null) {
      const orphanIndex = store.orphans.findIndex(
        (o) => o.id === newSponsor.orphanId
      );
      if (orphanIndex !== -1) {
        store.orphans[orphanIndex] = {
          ...store.orphans[orphanIndex],
          sponsorId: newSponsor.id,
        };
      }
    }

    return enrichSponsor(newSponsor);
  },

  async update(id, updates) {
    await delay();
    const index = store.sponsors.findIndex((s) => s.id === Number(id));
    if (index === -1) throw new Error("Sponsor not found");

    const oldSponsor = store.sponsors[index];
    const oldOrphanId = oldSponsor.orphanId;
    const newOrphanId = updates.orphanId !== undefined ? updates.orphanId : oldOrphanId;

    // Update the sponsor record
    store.sponsors[index] = { ...oldSponsor, ...updates, orphanId: newOrphanId };

    // If orphanId changed, update both old and new orphans
    if (oldOrphanId !== newOrphanId) {
      // Unlink old orphan
      if (oldOrphanId != null) {
        const oldOIdx = store.orphans.findIndex((o) => o.id === oldOrphanId);
        if (oldOIdx !== -1) {
          store.orphans[oldOIdx] = { ...store.orphans[oldOIdx], sponsorId: null };
        }
      }
      // Link new orphan
      if (newOrphanId != null) {
        const newOIdx = store.orphans.findIndex((o) => o.id === newOrphanId);
        if (newOIdx !== -1) {
          store.orphans[newOIdx] = {
            ...store.orphans[newOIdx],
            sponsorId: Number(id),
          };
        }
      }
    }

    return enrichSponsor(store.sponsors[index]);
  },

  async delete(id) {
    await delay();
    const sponsor = store.sponsors.find((s) => s.id === Number(id));

    // Cascade: set related orphan's sponsorId to null
    if (sponsor && sponsor.orphanId != null) {
      const orphanIndex = store.orphans.findIndex(
        (o) => o.id === sponsor.orphanId
      );
      if (orphanIndex !== -1) {
        store.orphans[orphanIndex] = {
          ...store.orphans[orphanIndex],
          sponsorId: null,
        };
      }
    }

    store.sponsors = store.sponsors.filter((s) => s.id !== Number(id));
    return { success: true };
  },
};
