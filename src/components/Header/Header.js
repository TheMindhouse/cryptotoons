// @flow
import React from "react"
import { Dropdown, Icon, Row } from "antd"

import logo from "../../assets/images/logo.png"
import "./styles/Header.css"
import { Link, NavLink } from "react-router-dom"
import { URLHelper } from "../../helpers/URLhelper"
import { ToonFamiliesSubmenu } from "./ToonFamiliesSubmenu"

type Props = {
  account?: string,
}

const Header = (props: Props) => {
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
                to="/about"
                className="Header__menu-link"
                activeClassName="Header__menu-link--active"
              >
                About
              </NavLink>
            </li>

            {props.account && (
              <li>
                <NavLink
                  to={`/account/${props.account}`}
                  className="Header__menu-link"
                  activeClassName="Header__menu-link--active"
                >
                  <span className="hidden-mobile">My</span> Account
                </NavLink>
              </li>
            )}
          </ul>
        </Row>
      </div>
    </div>
  )
}

export { Header }
