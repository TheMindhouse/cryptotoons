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

const getAccountUrl = (address: string): string => `/account/${address}`

export const getUrlWithPage = (
  url: string,
  pageId: ?(number | string)
): string =>
  pageId === undefined || pageId === null || pageId === 1
    ? url
    : `${url}/page/${pageId}`

export const URLHelper = {
  account: getAccountUrl,
  toonFamily: getToonFamilyUrl,
  toon: getToonUrl,
  home: "/",
  about: "/about",
  contact: "/contact",
  terms: "/terms-of-use",
  pageNotFound: "/404",
  help: "/help",
  faq: "/faq",
  auctions: "/auctions",
  genesis: "/genesis",
}
