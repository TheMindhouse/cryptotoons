// @flow
import React from "react"
import { LocalStorageManager } from "../localStorage"
import {
  Transaction,
  TRANSACTION_RECEIPT_STATUS,
  TRANSACTION_STATUS,
} from "../models/Transaction"
import withWeb3 from "../hoc/withWeb3"
import { notification } from "antd"
import { EtherscanLink } from "../components/Small/EtherscanLink"
import { CONFIG } from "../config"
import type { Web3Store } from "./Web3Provider"

const TransactionsContext = React.createContext()

type TransactionsProviderProps = {
  web3Store: Web3Store,
}

type TransactionsProviderState = {
  transactions: Array<Transaction>,
  clearTransactions: () => void,
}

class TransactionsProvider extends React.Component<
  TransactionsProviderProps,
  TransactionsProviderState
> {
  checkTransactionsInterval: * = setInterval(() => {}, CONFIG.CHECK_TX_DELAY)

  constructor(props) {
    super(props)
    this.state = {
      transactions: LocalStorageManager.transactions.getTransactions(),
      clearTransactions: this.onClearTransactions,
    }
  }

  componentDidMount() {
    this.checkTransactionsInterval = setInterval(() => {
      this.checkTransactions()
      this.updateTransactions()
    }, CONFIG.CHECK_TX_DELAY)
  }

  componentWillUnmount() {
    window.clearInterval(this.checkTransactionsInterval)
    this.checkTransactionsInterval = null
  }

  updateTransactions = () => {
    this.setState({
      transactions: LocalStorageManager.transactions.getTransactions(),
    })
  }

  checkTransactions = () => {
    LocalStorageManager.transactions
      .getTransactions()
      .filter((tx) => tx.status === TRANSACTION_STATUS.pending)
      .forEach((tx) => {
        // todo - prevent double notifications when checkTransactions runs
        // the second time before getTransactionReceipt is received
        // console.log(`Checking transaction - ${tx.hash}`)
        this.props.web3Store.web3.eth.getTransactionReceipt(
          tx.hash,
          (error, result) => {
            if (!error && result) {
              const status = TRANSACTION_RECEIPT_STATUS[Number(result.status)]
              const newTx = { ...tx, status }
              LocalStorageManager.transactions.updateTransactions(newTx)

              this.showNotification(newTx)
            }
          }
        )
      })
  }

  onClearTransactions = () => {
    this.setState({ transactions: [] })
    LocalStorageManager.transactions.clearTransactions()
  }

  showNotification = (tx: Transaction) => {
    const notificationConfig = {
      description: (
        <p>
          {tx.name} (<EtherscanLink hash={tx.hash} />)
        </p>
      ),
      duration: 5,
    }
    switch (tx.status) {
      case TRANSACTION_STATUS.failed:
        return notification.error({
          ...notificationConfig,
          duration: 0,
          message: "Transaction failed",
        })
      case TRANSACTION_STATUS.completed:
      default:
        return notification.success({
          ...notificationConfig,
          message: "Transaction completed",
        })
    }
  }

  render() {
    return (
      <TransactionsContext.Provider value={this.state}>
        {this.props.children}
      </TransactionsContext.Provider>
    )
  }
}

TransactionsProvider = withWeb3(TransactionsProvider)

export type TransactionsStore = TransactionsProviderState
export { TransactionsContext, TransactionsProvider }
