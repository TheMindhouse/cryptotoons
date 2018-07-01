import { AuctionContractFacade } from "../facades/AuctionContractFacade"
import { ToonContractFacade } from "../facades/ToonContractFacade"

export type Web3StoreType = {
  web3: Object,
  Contracts: { [number]: ToonContractFacade },
  AuctionContract: AuctionContractFacade,
  account: ?string,
  eventsSupported: boolean,
  metamaskAvailable: boolean,
}
