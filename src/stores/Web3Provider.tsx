import * as React from "react"
import ToonContractABI from "../assets/abi/ToonABI.json"
import AuctionContractABI from "../assets/abi/AuctionABI.json"
import NamingContractABI from "../assets/abi/NamingABI.json"
import { ToonContractFacade } from "../facades/ToonContractFacade"
import { FAMILY_IDS } from "../constants/toonFamilies"
import {
  AUCTION_CONTRACT_ADDRESS,
  NAMING_CONTRACT_ADDRESS,
  TOON_CONTRACT_ADDRESSES,
} from "../constants/contracts"
import { CONFIG } from "../config"
import { Logger } from "../helpers/Logger"
import { AuctionContractFacade } from "../facades/AuctionContractFacade"
import type { Web3StoreType } from "../types/Web3StoreType"
import { NamingContractFacade } from "../facades/NamingContractFacade"
import { ReactNode } from "react"
import Web3 from "web3"
import { METAMASK_NETWORKS } from "../constants/metamask"

const Web3Context = React.createContext()

// const Web3 = window.Web3

type Props = {
  children?: ReactNode,
}

type State = {
  web3Store?: Web3StoreType,
  web3?: Web3,
}

class Web3Provider extends React.Component<Props, State> {
  state: State = {}

  checkAccountInterval = setInterval(() => {}, CONFIG.CHECK_ACCOUNT_DELAY)
  checkEthPriceInterval = setInterval(() => {}, CONFIG.CHECK_ETH_PRICE_DELAY)

  componentDidMount() {
    window.addEventListener("load", () => {
      this.setupWeb3()
      this.checkAccount()
      this.checkEthPrice()

      this.checkAccountInterval = setInterval(
        this.checkAccount,
        CONFIG.CHECK_ACCOUNT_DELAY
      )
      this.checkEthPriceInterval = setInterval(
        this.checkEthPrice,
        CONFIG.CHECK_ETH_PRICE_DELAY
      )
    })
  }

  componentWillUnmount() {
    window.clearInterval(this.checkAccountInterval)
    window.clearInterval(this.checkEthPriceInterval)
  }

  setupWeb3 = () => {
    Logger.log("Setting up Web3 Provider")

    let eventsSupported = false
    let metamaskAvailable = false
    let web3

    if (window.ethereum) {
      window.ethereum.enable()
      web3 = new Web3(Web3.givenProvider)
      eventsSupported = true
      metamaskAvailable = true
    } else {
      Logger.log("Metamask not found - using infura!")
      web3 = new Web3(
        new Web3.providers.HttpProvider(
          "https://mainnet.infura.io/v3/c0fab121189b4fb4909dc475d82bf450"
        )
      )
    }

    this.setState({ web3 })

    eventsSupported
      ? Logger.log("Events supported")
      : Logger.log("Events not supported")

    const Contracts = this.prepareContractFacades()
    const AuctionContract = this.prepareAuctionContractFacade()
    const NamingContract = this.prepareNamingContractFacade()

    const web3Store: Web3StoreType = {
      web3,
      Contracts,
      AuctionContract,
      NamingContract,
      account: null,
      eventsSupported,
      metamaskAvailable,
      ethPrice: undefined,
    }
    this.setState({ web3Store })
  }

  prepareContractFacades = (
    account: string = ""
  ): Record<number, ToonContractFacade> => {
    const { web3 } = this.state
    // const ContractInstance = new this.state.web3Store.web3.eth.Contract(
    //   ToonContractABI
    // )
    const Contracts: Record<number, ToonContractFacade> = {}
    Object.keys(FAMILY_IDS)
      .map((key: string): number => FAMILY_IDS[key])
      .forEach((familyId: number) => {
        const address = TOON_CONTRACT_ADDRESSES[familyId]
        if (address) {
          Contracts[familyId] = new ToonContractFacade(
            web3,
            new web3.eth.Contract(ToonContractABI, address),
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
    const { web3 } = this.state
    // const ContractInstance = web3.eth.Contract(AuctionContractABI)
    return new AuctionContractFacade(
      web3,
      new web3.eth.Contract(AuctionContractABI, AUCTION_CONTRACT_ADDRESS),
      account
    )
  }

  prepareNamingContractFacade = (
    account: string = ""
  ): NamingContractFacade => {
    const { web3 } = this.state
    // const ContractInstance = window.web3.eth.contract(NamingContractABI)
    return new NamingContractFacade(
      web3,
      new web3.eth.Contract(NamingContractABI, NAMING_CONTRACT_ADDRESS),
      account
    )
  }

  checkAccount = () => {
    const { web3 } = this.state
    web3.eth.getAccounts((error, accounts = []) => {
      const account = accounts[0]
      if (this.state.web3Store && account !== this.state.web3Store.account) {
        Logger.log("New account: ", account)
        const Contracts = this.prepareContractFacades(account)
        const AuctionContract = this.prepareAuctionContractFacade(account)
        const NamingContract = this.prepareNamingContractFacade(account)
        const web3Store: Web3StoreType = {
          ...this.state.web3Store,
          Contracts,
          AuctionContract,
          NamingContract,
          account,
        }
        this.setState({ web3Store })
      }
    })
  }

  checkEthPrice = () => {
    const { web3Store } = this.state

    if (CONFIG.ETHEREUM_NETWORK !== METAMASK_NETWORKS.main) {
      const ethPrice = 0
      if (ethPrice !== this.state.web3Store.ethPrice) {
        this.setState({ web3Store: { ...web3Store, ethPrice } })
      }
      return
    }

    fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD")
      .then((response: Response) => response.json())
      .then((responseJson: { USD: number }) => {
        const ethPrice = responseJson.USD
        if (ethPrice !== this.state.web3Store.ethPrice) {
          console.log("New ETH price: ", ethPrice)
          this.setState({ web3Store: { ...web3Store, ethPrice } })
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
