import { METAMASK_NETWORKS } from "./constants/metamask"

export const CONFIG = {
  ETHEREUM_NETWORK: METAMASK_NETWORKS.rinkeby,
  // Page base URL
  PAGE_URL: "cryptotoons.io",
  // Google Analytics code
  ANALYTICS_ID: "UA-117937544-5",
  // Hotjar settings
  HOTJAR_ID: 855484,
  HOTJAR_VERSION: 6,
  // Browser page title
  PAGE_TITLE: "CryptoToons - Entertoonment on the blockchain",
  // Base URL to get toon images
  TOON_IMAGE_BASE_URL: "https://mindhouse.io:3100/toon",
  // Delay to check transactions in ms
  CHECK_TX_DELAY: 3000,
  // Delay to check account address in ms
  CHECK_ACCOUNT_DELAY: 2000,
}
