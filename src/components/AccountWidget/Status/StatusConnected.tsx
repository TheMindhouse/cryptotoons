import React from "react"
import { cutAddress } from "../../../helpers/strings"
import { Link } from "react-router-dom"

export const StatusConnected = ({ account }: { account: string }) => (
  <div>
    <span className="AccountStatus__info">My Transactions History</span>
    <br />
    <span className="AccountStatus__address">
      <Link to={`/account/${account}`}>{cutAddress(account)}</Link>
    </span>
  </div>
)
