import * as React from "react"
import withTransactions from "../../hoc/withTransactions"
import { Transaction, TRANSACTION_STATUS } from "../../models/Transaction"
import { TransactionWithToon } from "../../models/TransactionWithToon"
import { Alert, Icon } from "antd"
import { EtherscanLink } from "./EtherscanLink"
import withWeb3 from "../../hoc/withWeb3"
import type { TransactionsStore } from "../../stores/TransactionsProvider"
import type { Web3StoreType } from "../../types/Web3StoreType"
import type { ToonWithFamilyIds } from "../../types/ToonTypes"

type Props = {
  type: string | Array<string>,
  toon?: ToonWithFamilyIds,
  style?: Object,
  // withTransactions
  txStore: TransactionsStore,
  web3Store: Web3StoreType,
}

class PendingTransactionInfo extends React.PureComponent<Props> {
  static defaultProps = {}

  isTxPending = (status: string): boolean =>
    status === TRANSACTION_STATUS.pending

  isTxTypeFromProps = (type: string): boolean => {
    if (Array.isArray(this.props.type)) {
      return this.props.type.includes(type)
    }
    return this.props.type === type
  }

  isUserTxSender = (sender: string): boolean =>
    sender === this.props.web3Store.account

  isTxWithGivenToonId = (toon: ToonWithFamilyIds): boolean => {
    if (!this.props.toon) {
      return false
    }
    return (
      toon.toonId === this.props.toon.toonId &&
      toon.familyId === this.props.toon.familyId
    )
  }

  getPendingTransactions = () => {
    const pendingTx = this.props.txStore.transactions.filter(
      (tx: Transaction | TransactionWithToon) =>
        this.isTxPending(tx.status) &&
        this.isTxTypeFromProps(tx.type) &&
        this.isUserTxSender(tx.account) &&
        (!this.props.toon || this.isTxWithGivenToonId(tx))
    )
    return pendingTx.map((tx: Transaction) => (
      <div key={tx.hash} style={{ marginTop: 10 }}>
        <Alert
          message={
            <small>
              {tx.name} transaction pending (<EtherscanLink hash={tx.hash} />)
            </small>
          }
          type="info"
          showIcon
          icon={<Icon type="loading" />}
          style={this.props.style}
        />
      </div>
    ))
  }

  render() {
    const pendingTransactions = this.getPendingTransactions()
    if (pendingTransactions.length > 0) {
      return <div style={{ marginTop: 20 }}>{pendingTransactions}</div>
    }
    return null
  }
}

PendingTransactionInfo = withTransactions(withWeb3(PendingTransactionInfo))
export { PendingTransactionInfo }
