// @flow
import * as React from "react"
import ABI from "../assets/abi/ToonABI.json"
import { ToonContractFacade } from "../facades/ToonContractFacade"
import { FAMILY_IDS } from "../constants/toonFamilies"
import { TOON_CONTRACT_ADDRESSES } from "../constants/contracts"
import { CONFIG } from "../config"
import { Logger } from "../helpers/Logger"
import { AuctionContractFacade } from "../facades/AuctionContractFacade"

const Web3Context = React.createContext()

const Web3 = window.Web3

type Props = {
  children?: React.Node,
}

type State = {
  web3?: ?Object,
  Contracts?: { [number]: ToonContractFacade },
  AuctionContract?: AuctionContractFacade,
  account?: ?string,
  eventsSupported: boolean,
  metamaskAvailable: boolean,
}

class Web3Provider extends React.Component<Props, State> {
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

    this.setState({
      web3: window.web3,
      Contracts,
      eventsSupported,
      metamaskAvailable,
    })
  }

  prepareContractFacades = (
    account: string = ""
  ): { [number]: ToonContractFacade } => {
    const ContractInstance = window.web3.eth.contract(ABI)
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

  checkAccount = () => {
    window.web3.eth.getAccounts((error, accounts = []) => {
      const account = accounts[0]
      if (account !== this.state.account) {
        Logger.log("New account: ", account)
        const Contracts = this.prepareContractFacades(account)
        this.setState({ account, Contracts })
      }
    })
  }

  render() {
    return (
      <Web3Context.Provider value={this.state}>
        {this.props.children}
      </Web3Context.Provider>
    )
  }
}

export type Web3Store = ?State

export { Web3Context, Web3Provider }
