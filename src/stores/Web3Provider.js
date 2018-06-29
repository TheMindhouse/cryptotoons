// @flow
import * as React from "react"
import ABI from "../helpers/ABI.json"
import { ContractFacade } from "../facades/ContractFacade"
import { FAMILY_IDS } from "../constants/toonFamilies"
import { TOON_CONTRACT_ADDRESSES } from "../constants/contracts"
import { CONFIG } from "../config"
import { Logger } from "../helpers/Logger"

const Web3Context = React.createContext()

const Web3 = window.Web3

type Props = {
  children: React.Children,
}

type State = {
  web3?: ?Object,
  Contracts?: { [number]: ContractFacade },
  account?: ?string,
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

    if (typeof window.web3 !== "undefined") {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      Logger.log("Metamask not found - using localhost!")
      window.web3 = new Web3(
        new Web3.providers.HttpProvider("http://localhost:8545")
      )
    }

    const Contracts = this.prepareContractFacades()

    Logger.log(Contracts)

    this.setState({
      web3: window.web3,
      Contracts,
    })
  }

  prepareContractFacades = (
    account: ?string = null
  ): { [number]: ContractFacade } => {
    const ContractInstance = window.web3.eth.contract(ABI)
    const Contracts: Object = {}
    Object.values(FAMILY_IDS).forEach((familyId) => {
      const address = TOON_CONTRACT_ADDRESSES[familyId]
      if (address) {
        Contracts[familyId] = new ContractFacade(
          ContractInstance.at(address),
          account
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

export type Web3ProviderState = State

export { Web3Context, Web3Provider }
