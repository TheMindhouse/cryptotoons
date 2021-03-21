// @flow
import * as React from "react"
import { URLHelper } from "../../helpers/URLhelper"
import { cutAddress, equalStrings } from "../../helpers/strings"
import { Link } from "react-router-dom"
import { CONTRACT_OWNER_ADDRESS } from "../../constants/contracts"

type Props = {
  address: string,
}

class AccountAddressLink extends React.PureComponent<Props> {
  static defaultProps = {}

  render() {
    const { address } = this.props
    const isFromCreators = equalStrings(address, CONTRACT_OWNER_ADDRESS)
    return (
      <Link to={URLHelper.account(address)}>
        {isFromCreators ? "CryptoToons Creators" : cutAddress(address)}
      </Link>
    )
  }
}

export { AccountAddressLink }
