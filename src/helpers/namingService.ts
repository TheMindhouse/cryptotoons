import { CONFIG } from "../config"

// Allow only alphanumeric, underscores, dashes and spaces
const FORBIDDEN_CHARS = /[^0-9a-zA-Z_\-\s]/g

/**
 * Cleans the name from chars other than allowed before sending it to the contract or showing it on the page
 */
export const cleanName = (name: string) =>
  name
    .replace(FORBIDDEN_CHARS, "")
    .trim()
    .substring(0, CONFIG.MAX_NAME_LENGTH)

/**
 * Returns false if a name contains forbidden chars
 */
export const isValidName = (name?: string | null) =>
  !(name || "").match(FORBIDDEN_CHARS)
