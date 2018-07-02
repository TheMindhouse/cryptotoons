// @flow
import * as React from "react"
import withWeb3 from "../../hoc/withWeb3"
import { TOON_CONTRACT_ADDRESSES } from "../../constants/contracts"
import type { Web3StoreType } from "../../types/Web3StoreType"

type CurrentToonPriceProps = {
  familyId: number,
  toonId: number,
  web3Store: Web3StoreType,
}

type CurrentToonPriceState = {
  price: ?number,
}

class CurrentToonPrice extends React.PureComponent<
  CurrentToonPriceProps,
  CurrentToonPriceState
> {
  static defaultProps = {}

  state = {
    price: null,
  }

  componentDidMount() {
    this.getToonPrice()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.familyId !== this.props.familyId ||
      prevProps.toonId !== this.props.toonId
    ) {
      this.getToonPrice()
    }
  }

  getToonPrice() {
    const { familyId, toonId, web3Store } = this.props
    if (!web3Store || !web3Store.Contracts) {
      return
    }
    const auctionContract = web3Store.AuctionContract
    if (!auctionContract) {
      return
    }
    const toonContractAddress = TOON_CONTRACT_ADDRESSES[familyId]
    auctionContract
      .getCurrentPrice(toonContractAddress, toonId)
      .then((price: ?number) => this.setState({ price }))
  }

  render() {
    const { price } = this.state

    if (price === null || price === undefined) {
      return null
    }

    return (
      <div>
        <h1>
          <b>{price > 0 ? `${price} ETH` : "Free"}</b>
        </h1>
      </div>
    )
  }
}

CurrentToonPrice = withWeb3(CurrentToonPrice)
export { CurrentToonPrice }
