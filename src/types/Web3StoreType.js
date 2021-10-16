import { AuctionContractFacade } from "../facades/AuctionContractFacade"
import { ToonContractFacade } from "../facades/ToonContractFacade"
import { NamingContractFacade } from "../facades/NamingContractFacade"

export type Web3StoreType = {
  web3: Object,
  Contracts: { [number]: ToonContractFacade },
  AuctionContract: AuctionContractFacade,
  NamingContract: NamingContractFacade,
  account: ?string,
  eventsSupported: boolean,
  metamaskAvailable: boolean,
}
