import * as React from "react"
import "./styles/NetworkCheck.css"
import withWeb3 from "../../hoc/withWeb3"
import { CONFIG } from "../../config"
import { METAMASK_NETWORK_NAMES } from "../../constants/metamask"
import type { Web3StoreType } from "../../types/Web3StoreType"
import logoMetamask from "../../assets/images/logo-metamask.svg"
import bgBlue from "../../assets/images/background-blue.jpg"

type Props = {
  web3Store: Web3StoreType,
}

type State = {
  networkId?: number,
}

class NetworkCheck extends React.PureComponent<Props, State> {
  static defaultProps = {}

  state = {
    networkId: null,
  }

  componentDidMount() {
    this.props.web3Store.web3.eth.net.getId((err, netId: number) => {
      this.setState({ networkId: netId })
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
      <div
        className="NetworkCheck"
        style={{ backgroundImage: `url(${bgBlue})` }}
      >
        <div>
          <img
            src={logoMetamask}
            className="NetworkCheck__logo"
            alt="MetaMask logo"
          />
        </div>
        <span>
          Your wallet is connected to the {currentNetworkName}.<br />
          <b>To use CryptoToons, please switch to the {desiredNetworkName}</b>.
        </span>
      </div>
    )
  }
}

NetworkCheck = withWeb3(NetworkCheck)
export { NetworkCheck }
