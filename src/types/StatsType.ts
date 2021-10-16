import { FAMILY_IDS } from "../constants/toonFamilies"

export type FamilyStats = {
  averagePrice: number,
  floorPrice: number,
  itemsCount: number,
  ownersCount: number,
  volumeTotal: number,
  volume30d: number,
  volume7d: number,
  salesTotal: number,
  sales30d: number,
  sales7d: number,
}

/**
 * JSON with data from the server
 */
export type StatsData = {
  [k: FAMILY_IDS]: FamilyStats,
}
