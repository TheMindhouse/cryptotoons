// @flow
import * as React from "react"
import ToonContractABI from "../assets/abi/ToonABI.json"
import AuctionContractABI from "../assets/abi/AuctionABI.json"
import { ToonContractFacade } from "../facades/ToonContractFacade"
import { FAMILY_IDS } from "../constants/toonFamilies"
import {
  AUCTION_CONTRACT_ADDRESS,
  TOON_CONTRACT_ADDRESSES,
} from "../constants/contracts"
import { CONFIG } from "../config"
import { Logger } from "../helpers/Logger"
import { AuctionContractFacade } from "../facades/AuctionContractFacade"
import type { Web3StoreType } from "../types/Web3StoreType"

const Web3Context = React.createContext()

const Web3 = window.Web3

type Props = {
  children?: React.Node,
}

type State = {
  web3Store?: Web3StoreType,
}

class Web3Provider extends React.Component<Props, State> {
  state = {}

  checkAccountInterval: * = setInterval(() => {}, CONFIG.CHECK_ACCOUNT_DELAY)

  componentDidMount() {
    window.addEventListener("load", () => {
      this.setupWeb3()
      this.checkAccount()
      this.checkAccountInterval = setInterval(
        this.checkAccount,
        CONFIG.CHECK_ACCOUNT_DELAY
      )
    })
  }

  componentWillUnmount() {
    window.clearInterval(this.checkAccountInterval)
  }

  setupWeb3 = () => {
    Logger.log("Setting up Web3 Provider")

    let eventsSupported = false
    let metamaskAvailable = false

    if (typeof window.web3 !== "undefined") {
      window.web3 = new Web3(window.web3.currentProvider)
      eventsSupported = true
      metamaskAvailable = true
    } else {
      Logger.log("Metamask not found - using localhost!")
      window.web3 = new Web3(
        new Web3.providers.HttpProvider("http://localhost:8545")
      )
    }

    eventsSupported
      ? Logger.log("Events supported")
      : Logger.log("Events not supported")

    const Contracts = this.prepareContractFacades()
    const AuctionContract = this.prepareAuctionContractFacade()

    const web3Store: Web3StoreType = {
      web3: window.web3,
      Contracts,
      AuctionContract,
      eventsSupported,
      metamaskAvailable,
    }
    this.setState({ web3Store })
  }

  prepareContractFacades = (
    account: string = ""
  ): { [number]: ToonContractFacade } => {
    const ContractInstance = window.web3.eth.contract(ToonContractABI)
    const Contracts: Object = {}
    Object.keys(FAMILY_IDS)
      .map((key: string): number => FAMILY_IDS[key])
      .forEach((familyId: number) => {
        const address = TOON_CONTRACT_ADDRESSES[familyId]
        if (address) {
          Contracts[familyId] = new ToonContractFacade(
            ContractInstance.at(address),
            account,
            familyId
          )
        }
      })
    return Contracts
  }

  prepareAuctionContractFacade = (
    account: string = ""
  ): AuctionContractFacade => {
    const ContractInstance = window.web3.eth.contract(AuctionContractABI)
    return new AuctionContractFacade(
      ContractInstance.at(AUCTION_CONTRACT_ADDRESS),
      account
    )
  }

  checkAccount = () => {
    window.web3.eth.getAccounts((error, accounts = []) => {
      const account = accounts[0]
      if (account !== this.state.account) {
        Logger.log("New account: ", account)
        const Contracts = this.prepareContractFacades(account)
        const AuctionContract = this.prepareAuctionContractFacade(account)
        const web3Store: Web3StoreType = {
          ...this.state.web3Store,
          Contracts,
          AuctionContract,
        }
        this.setState({ web3Store })
      }
    })
  }

  render() {
    return (
      <Web3Context.Provider value={this.state.web3Store}>
        {this.props.children}
      </Web3Context.Provider>
    )
  }
}

export { Web3Context, Web3Provider }
