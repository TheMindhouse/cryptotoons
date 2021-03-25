// @flow
import * as React from "react"
import { URLHelper } from "../../helpers/URLhelper"
import { cutAddress, equalStrings } from "../../helpers/strings"
import { Link } from "react-router-dom"
import { CONTRACT_OWNER_ADDRESS } from "../../constants/contracts"
import { Icon } from "antd"

type Props = {
  address: string,
}

class AccountAddressLink extends React.PureComponent<Props> {
  static defaultProps = {}

  render() {
    const { address } = this.props
    const isFromCreators = equalStrings(address, CONTRACT_OWNER_ADDRESS)
    return isFromCreators ? (
      <Link to={URLHelper.creators}>
        <React.Fragment>
          CryptoToons Creators{" "}
          <Icon type="check-circle" style={{ fontSize: 16 }} />
        </React.Fragment>
      </Link>
    ) : (
      <Link to={URLHelper.account(address)}>{cutAddress(address)}</Link>
    )
  }
}

export { AccountAddressLink }
