// @flow
export const cutAddress = (address: string = ""): string => {
  return address.substr(0, 15)
}

export const isAddressNull = (address: string = ""): boolean => {
  return address === "0x0000000000000000000000000000000000000000"
}

export const padStart = (value: number) => {
  if (String.prototype.padStart) {
    return String(value).padStart(2, "0")
  }
  return value
}

export const slugify = (text: string): string =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text

/**
 * Checks if two strings are the same, case-insensitive.
 * Used to compare addresses.
 */
export const equalStrings = (a: ?string, b: ?string) => (a || '').toLowerCase() === (b || '').toLowerCase()
