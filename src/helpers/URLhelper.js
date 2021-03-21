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

const getAccountUrl = (address: string): string => `/account/${address}`

const getAccountUrlWithPage = (address: string, pageId: number): string =>
  pageId === 1
    ? getAccountUrl(address)
    : getAccountUrl(address) + `/page/${pageId}`

export const URLHelper = {
  account: getAccountUrl,
  accountWithPage: getAccountUrlWithPage,
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
