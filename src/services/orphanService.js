import store from "./dataStore";

// Simulate async API delay
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// Enrich an orphan with computed fields (status + sponsor name) for UI compatibility
function enrichOrphan(orphan) {
  const sponsor = orphan.sponsorId
    ? store.sponsors.find((s) => s.id === orphan.sponsorId)
    : null;

  return {
    ...orphan,
    status: orphan.sponsorId != null ? "مكفول" : "غير مكفول",
    sponsor: sponsor ? sponsor.name : null,
  };
}

export const orphanService = {
  async getAll() {
    await delay();
    return store.orphans.map(enrichOrphan);
  },

  async getById(id) {
    await delay();
    const orphan = store.orphans.find((o) => o.id === Number(id));
    return orphan ? enrichOrphan(orphan) : null;
  },

  async create(orphan) {
    await delay();
    const newOrphan = {
      ...orphan,
      id: Math.max(...store.orphans.map((o) => o.id), 0) + 1,
      sponsorId: orphan.sponsorId ?? null,
    };
    store.orphans.push(newOrphan);

    // If a sponsorId was provided, update that sponsor's orphanId
    if (newOrphan.sponsorId != null) {
      const sponsorIndex = store.sponsors.findIndex(
        (s) => s.id === newOrphan.sponsorId
      );
      if (sponsorIndex !== -1) {
        store.sponsors[sponsorIndex] = {
          ...store.sponsors[sponsorIndex],
          orphanId: newOrphan.id,
        };
      }
    }

    return enrichOrphan(newOrphan);
  },

  async update(id, updates) {
    await delay();
    const index = store.orphans.findIndex((o) => o.id === Number(id));
    if (index === -1) throw new Error("Orphan not found");

    const oldOrphan = store.orphans[index];
    const oldSponsorId = oldOrphan.sponsorId;
    const newSponsorId = updates.sponsorId !== undefined ? updates.sponsorId : oldSponsorId;

    // Update the orphan record
    store.orphans[index] = { ...oldOrphan, ...updates, sponsorId: newSponsorId };

    // If sponsorId changed, update both old and new sponsors
    if (oldSponsorId !== newSponsorId) {
      // Unlink old sponsor
      if (oldSponsorId != null) {
        const oldSIdx = store.sponsors.findIndex((s) => s.id === oldSponsorId);
        if (oldSIdx !== -1) {
          store.sponsors[oldSIdx] = { ...store.sponsors[oldSIdx], orphanId: null };
        }
      }
      // Link new sponsor
      if (newSponsorId != null) {
        const newSIdx = store.sponsors.findIndex((s) => s.id === newSponsorId);
        if (newSIdx !== -1) {
          store.sponsors[newSIdx] = {
            ...store.sponsors[newSIdx],
            orphanId: Number(id),
          };
        }
      }
    }

    return enrichOrphan(store.orphans[index]);
  },

  async delete(id) {
    await delay();
    const orphan = store.orphans.find((o) => o.id === Number(id));

    // Cascade: unlink the related sponsor
    if (orphan && orphan.sponsorId != null) {
      const sponsorIndex = store.sponsors.findIndex(
        (s) => s.id === orphan.sponsorId
      );
      if (sponsorIndex !== -1) {
        store.sponsors[sponsorIndex] = {
          ...store.sponsors[sponsorIndex],
          orphanId: null,
        };
      }
    }

    store.orphans = store.orphans.filter((o) => o.id !== Number(id));
    return { success: true };
  },
};
