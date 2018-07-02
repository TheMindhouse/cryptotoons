import { FAMILY_NAMES, FAMILY_NAMES_SINGULAR } from "../constants/toonFamilies"

export const getFamilyName = (familyId: number) => {
  if (familyId > -1) {
    return FAMILY_NAMES[familyId]
  }
  return ""
}

export const getFamilyNameSingular = (familyId: number = -1) => {
  if (familyId > -1) {
    return FAMILY_NAMES_SINGULAR[familyId]
  }
  return ""
}
