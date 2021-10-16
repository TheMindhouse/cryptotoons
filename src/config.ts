import { METAMASK_NETWORKS } from "./constants/metamask"

// const API_URL = 'http://localhost:3100';
const API_URL = 'https://mindhouse.io:3100';

export const CONFIG = {
  ETHEREUM_NETWORK: METAMASK_NETWORKS.main,
  // Page base URL
  PAGE_URL: "cryptotoons.io",
  // Google Analytics code
  ANALYTICS_ID: "UA-117937544-5",
  // Hotjar settings
  HOTJAR_ID: 961408,
  HOTJAR_VERSION: 6,
  // Browser page title
  PAGE_TITLE: "CryptoToons - Entertoonment on the blockchain",
  // API to get toon images
  TOON_IMAGE_BASE_URL: `${API_URL}/toon`,
  // API for stats
  STATS_URL: `${API_URL}/stats`,
  // Delay to check transactions in ms
  CHECK_TX_DELAY: 3000,
  // Delay to check account address in ms
  CHECK_ACCOUNT_DELAY: 2000,
  // Number of toons per page
  TOONS_PER_PAGE: 24,
  // Max length of custom toon name
  MAX_NAME_LENGTH: 25,
  // Fee for naming a Toon
  NAMING_FEE: 0.001,
}
