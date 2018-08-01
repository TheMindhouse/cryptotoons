// @flow
import React from "react"
import { URLHelper } from "../../../helpers/URLhelper"
import { Link } from "react-router-dom"

export const StatusMetaMaskNotAvailable = () => (
  <span className="AccountStatus__InstallMetaMaskInfo">
    To participate in trading CryptoToons on this site,{" "}
    <Link to={URLHelper.help}>install the MetaMask Chrome plugin</Link>.
  </span>
)
