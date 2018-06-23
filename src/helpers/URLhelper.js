// @flow
export const URLHelper = {
  account: (address: string): string => `/account/${address}`,
  home: "/",
  about: "/about",
  contact: "/contact",
  terms: "/terms-of-use",
  pageNotFound: "/404"
};
