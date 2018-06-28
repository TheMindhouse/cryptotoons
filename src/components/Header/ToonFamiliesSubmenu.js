// @flow
import * as React from "react"
import { URLHelper } from "../../helpers/URLhelper"
import { Menu } from "antd"
import { NavLink } from "react-router-dom"

const ToonFamiliesSubmenu = (
  <Menu>
    <Menu.Item>
      <NavLink to={URLHelper.home} exact>
        CryptoCows
      </NavLink>
    </Menu.Item>
    <Menu.Item>
      <NavLink to={URLHelper.home} exact>
        BitBulls
      </NavLink>
    </Menu.Item>
    <Menu.Item>
      <NavLink to={URLHelper.home} exact>
        DappDonkeys
      </NavLink>
    </Menu.Item>
    <Menu.Item>
      <NavLink to={URLHelper.home} exact>
        EtherElephants
      </NavLink>
    </Menu.Item>
    <Menu.Item>
      <NavLink to={URLHelper.home} exact>
        GuldenGorillas
      </NavLink>
    </Menu.Item>
    <Menu.Item>
      <NavLink to={URLHelper.home} exact>
        HodlHippos
      </NavLink>
    </Menu.Item>
    <Menu.Item>
      <NavLink to={URLHelper.home} exact>
        LiteLlamas
      </NavLink>
    </Menu.Item>
  </Menu>
)
export { ToonFamiliesSubmenu }
