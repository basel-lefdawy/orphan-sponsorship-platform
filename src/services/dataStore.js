// ============================================================
// Shared Data Store — Single Source of Truth
// Both orphanService and sponsorService reference this store
// so that mutations in one service are visible to the other.
// ============================================================

import { orphans as mockOrphans, sponsors as mockSponsors } from "../utils/mockData";

const store = {
  orphans: [...mockOrphans],
  sponsors: [...mockSponsors],
};

export default store;
