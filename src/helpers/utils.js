// @flow
import { CONFIG } from "../config"

export const setDocumentTitle = (title?: string) => {
  document.title = title ? `${title} | ${CONFIG.PAGE_TITLE}` : CONFIG.PAGE_TITLE
}
