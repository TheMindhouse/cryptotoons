import * as React from "react"
import { CONFIG } from "../../config"
import { METAMASK_NETWORKS } from "../../constants/metamask"

type Props = {
  address: string,
}

const getEtherscanUrl = () => {
  switch (CONFIG.ETHEREUM_NETWORK) {
    case METAMASK_NETWORKS.rinkeby:
      return "rinkeby.etherscan.io"
    case METAMASK_NETWORKS.main:
    default:
      return "etherscan.io"
  }
}

class EtherscanContractLink extends React.PureComponent<Props> {
  static defaultProps = {}

  render() {
    const { address } = this.props

    const etherscanUrl = getEtherscanUrl()
    return (
      <a
        href={`https://${etherscanUrl}/address/${address}`}
        target="_blank"
        className="font-monospace text-nowrap"
        rel="noopener noreferrer"
      >
        {address}
      </a>
    )
  }
}

export { EtherscanContractLink }
