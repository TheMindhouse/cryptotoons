// @flow

import { FAMILY_NAMES } from "../constants/toonFamilies"

const getToonFamilyUrl = (familyId: number): string => {
  const familyName = FAMILY_NAMES[familyId]
  return `/toons/${familyName.toLowerCase()}`
}

const getToonUrl = (familyId: number, toonId: number): string => {
  const familyUrl = getToonFamilyUrl(familyId)
  return `${familyUrl}/${toonId}`
}

export const URLHelper = {
  account: (address: string): string => `/account/${address}`,
  toonFamily: getToonFamilyUrl,
  toon: getToonUrl,
  home: "/",
  about: "/about",
  contact: "/contact",
  terms: "/terms-of-use",
  pageNotFound: "/404",
  help: "/help",
  faq: "/faq",
}
