import { AuctionContractFacade } from "../facades/AuctionContractFacade"
import { ToonContractFacade } from "../facades/ToonContractFacade"
import { NamingContractFacade } from "../facades/NamingContractFacade"
import Web3 from "web3";

export type Web3StoreType = {
  web3: Web3,
  Contracts: Record<number, ToonContractFacade>,
  AuctionContract: AuctionContractFacade,
  NamingContract: NamingContractFacade,
  account?: string,
  eventsSupported: boolean,
  metamaskAvailable: boolean,
  ethPrice?: number;
}
