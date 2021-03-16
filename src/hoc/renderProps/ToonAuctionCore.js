// @flow
import * as React from "react"
import withWeb3 from "../withWeb3"
import type { Web3StoreType } from "../../types/Web3StoreType"
import { ToonAuction } from "../../models/web3/ToonAuction"
import { AuctionContractFacade } from "../../facades/AuctionContractFacade"
import { TOON_CONTRACT_ADDRESSES } from "../../constants/contracts"

type ToonAuctionCoreProps = {
  familyId: number,
  toonId: number,
  render: (?ToonAuction) => ?React.Node,
  web3Store: Web3StoreType,
}

type ToonAuctionCoreState = {
  // Undefined when not loaded
  // Null when no active auction
  toonAuction: ?ToonAuction,
}

class ToonAuctionCore extends React.PureComponent<
  ToonAuctionCoreProps,
  ToonAuctionCoreState
> {
  static defaultProps = {}

  state = {
    toonAuction: undefined,
  }

  componentDidMount() {
    this.getToonAuction()
  }

  componentDidUpdate(prevProps: ToonAuctionCoreProps) {
    if (
      prevProps.familyId !== this.props.familyId ||
      prevProps.toonId !== this.props.toonId ||
      prevProps.web3Store !== this.props.web3Store
    ) {
      this.getToonAuction()
    }
  }

  getToonAuction = () => {
    const { toonId, familyId, web3Store } = this.props
    const AuctionContract: AuctionContractFacade = web3Store.AuctionContract
    const toonContractAddress = TOON_CONTRACT_ADDRESSES[familyId]
    return AuctionContract.getAuction(toonContractAddress, toonId).then(
      (toonAuction: ?ToonAuction) => {
        this.setState({ toonAuction })
      }
    )
  }

  render() {
    return this.props.render(this.state.toonAuction)
  }
}

ToonAuctionCore = withWeb3(ToonAuctionCore)
export { ToonAuctionCore }
