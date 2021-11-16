import * as React from "react"
import withWeb3 from "../../hoc/withWeb3"
import { message, Spin } from "antd"
import { LocalStorageManager } from "../../localStorage"
import { AccountBalanceWithdraw } from "./AccountBalanceWithdraw"
import type { Web3StoreType } from "../../types/Web3StoreType"
import { Transaction } from "../../models/Transaction"
import { wei2eth } from "../../helpers/unitsConverter"

type Props = {
  accountAddress: string, // NOT user address, but from the page params!
  web3Store: Web3StoreType,
}

type State = {
  isLoading: boolean,
  balance: number,
}

class AccountBalance extends React.PureComponent<Props, State> {
  static defaultProps = {}

  state = {
    isLoading: true,
    balance: 0,
  }

  componentDidMount() {
    this.getBalance()
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.accountAddress !== this.props.accountAddress) {
      this.setState({ isLoading: true }, this.getBalance)
    }
  }

  getBalance = () => {
    this.props.web3Store.AuctionContract.getAccountBalance(
      this.props.accountAddress
    ).then((balance) => this.setState({ balance, isLoading: false }))
  }

  onWithdraw = () => {
    this.props.web3Store.AuctionContract.withdrawBalance().then(
      (tx: Transaction) => {
        LocalStorageManager.transactions.updateTransactions(tx)
        message.success(`${tx.name} Transaction Sent`)
      }
    )
  }

  isOwner = (): boolean =>
    this.props.accountAddress === this.props.web3Store.account

  render() {
    if (this.state.isLoading) {
      return <Spin />
    }

    const { balance } = this.state

    return (
      <div>
        <h2>
          <b>Pending Withdrawals</b>
        </h2>
        <h1>
          <small>Ξ</small> <b>{wei2eth(balance)}</b>
        </h1>
        {this.isOwner() &&
          balance > 0 && (
            <AccountBalanceWithdraw
              onWithdraw={this.onWithdraw}
              balance={balance}
              account={this.props.web3Store.account}
            />
          )}
      </div>
    )
  }
}

AccountBalance = withWeb3(AccountBalance)
export { AccountBalance }
