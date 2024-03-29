import * as React from "react"
import { URLHelper } from "../../helpers/URLhelper"
import { Menu } from "antd"
import { NavLink } from "react-router-dom"
import { FAMILY_IDS, FAMILY_NAMES } from "../../constants/toonFamilies"

const ToonFamiliesSubmenu = (
  <Menu>
    {Object.values(FAMILY_IDS).map((familyId: number) => (
      <Menu.Item key={familyId}>
        <NavLink to={URLHelper.toonFamily(familyId)} exact>
          {FAMILY_NAMES[familyId]}
        </NavLink>
      </Menu.Item>
    ))}
  </Menu>
)
export { ToonFamiliesSubmenu }
