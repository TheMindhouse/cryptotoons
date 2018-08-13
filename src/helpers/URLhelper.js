// @flow

import { FAMILY_NAMES } from "../constants/toonFamilies"

const getToonFamilyUrl = (familyId: number): string => {
  const familyName = FAMILY_NAMES[familyId]
  return `/toons/${familyName.toLowerCase()}`
}

const getToonFamilyUrlWithPage = (familyId: number, pageId: number): string => {
  if (pageId === 1) {
    return getToonFamilyUrl(familyId)
  }
  const familyName = FAMILY_NAMES[familyId]
  return `/toons/${familyName.toLowerCase()}/page/${pageId}`
}

const getToonUrl = (familyId: number, toonId: number): string => {
  const familyUrl = getToonFamilyUrl(familyId)
  return `${familyUrl}/${toonId}`
}

export const URLHelper = {
  account: (address: string): string => `/account/${address}`,
  toonFamily: getToonFamilyUrl,
  toonFamilyWithPage: getToonFamilyUrlWithPage,
  toon: getToonUrl,
  home: "/",
  about: "/about",
  contact: "/contact",
  terms: "/terms-of-use",
  pageNotFound: "/404",
  help: "/help",
  faq: "/faq",
}
