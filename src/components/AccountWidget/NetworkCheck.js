// @flow
import * as React from "react"
import "./styles/NetworkCheck.css"
import withWeb3 from "../../hoc/withWeb3"
import { CONFIG } from "../../config"
import {
  METAMASK_NETWORK_NAMES,
  METAMASK_NETWORKS,
} from "../../constants/metamask"
import type { Web3StoreType } from "../../types/Web3StoreType"

type Props = {
  web3Store: Web3StoreType,
}

type State = {
  networkId: ?number,
}

class NetworkCheck extends React.PureComponent<Props, State> {
  static defaultProps = {}

  state = {
    networkId: null,
  }

  componentDidMount() {
    this.props.web3Store.web3.version.getNetwork((err, netId: string) => {
      this.setState({ networkId: parseInt(netId, 10) })
    })
  }

  render() {
    const { networkId } = this.state
    if (!networkId || networkId === CONFIG.ETHEREUM_NETWORK) {
      return null
    }

    const currentNetworkName =
      METAMASK_NETWORK_NAMES[networkId] || "Unknown Network"
    const desiredNetworkName = METAMASK_NETWORK_NAMES[CONFIG.ETHEREUM_NETWORK]
    return (
      <div className="NetworkCheck">
        <span>
          Your wallet is connected to the {currentNetworkName}. To use
          CryptoToons, please switch to the <b>{desiredNetworkName}</b>.
        </span>
      </div>
    )
  }
}

NetworkCheck = withWeb3(NetworkCheck)
export { NetworkCheck }
