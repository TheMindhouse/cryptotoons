// @flow
export const URLHelper = {
  account: (address: string): string => `/account/${address}`,
  toonFamily: (family: string = ""): string => `/toons/${family.toLowerCase()}`,
  home: "/",
  about: "/about",
  contact: "/contact",
  terms: "/terms-of-use",
  pageNotFound: "/404",
}
