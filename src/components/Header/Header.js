// @flow
import React from "react"
import { Dropdown, Icon, Row } from "antd"

import logo from "../../assets/images/logo.png"
import "./styles/Header.css"
import { Link, NavLink } from "react-router-dom"
import { URLHelper } from "../../helpers/URLhelper"
import { ToonFamiliesSubmenu } from "./ToonFamiliesSubmenu"
import withWeb3 from "../../hoc/withWeb3"
import type { Web3StoreType } from "../../types/Web3StoreType"

type HeaderProps = {
  web3Store: Web3StoreType,
}

class Header extends React.Component<HeaderProps> {
  render() {
    const { account } = this.props.web3Store
    return (
      <div className="Header">
        <div className="container">
          <Row justify="space-between" type="flex" align="middle">
            <Row justify="space-between" type="flex" align="middle">
              <div>
                <Link to={URLHelper.home} className="Header__link">
                  <img src={logo} className="Header__logo" alt="" />
                </Link>
              </div>
            </Row>
            <ul className="Header__menu">
              <li>
                <Dropdown overlay={ToonFamiliesSubmenu}>
                  <NavLink
                    to={URLHelper.home}
                    exact
                    className="Header__menu-link"
                    activeClassName="Header__menu-link--active"
                  >
                    Toon Families <Icon type="down" />
                  </NavLink>
                </Dropdown>
              </li>
              <li>
                <NavLink
                  to={URLHelper.about}
                  className="Header__menu-link"
                  activeClassName="Header__menu-link--active"
                >
                  About
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={URLHelper.auctionsPage()}
                  className="Header__menu-link"
                  activeClassName="Header__menu-link--active"
                >
                  Toon Auctions
                </NavLink>
              </li>

              {account && (
                <li>
                  <NavLink
                    to={URLHelper.account(account)}
                    className="Header__menu-link"
                    activeClassName="Header__menu-link--active"
                  >
                    My Account
                  </NavLink>
                </li>
              )}
            </ul>
          </Row>
        </div>
      </div>
    )
  }
}

Header = withWeb3(Header)
export { Header }
