// @flow
import React from "react"

import "./styles/AccountStatus.css"
import withWeb3 from "../../hoc/withWeb3"
import withModal from "../../hoc/withModal"
import TransactionsModal from "../Modals/TransactionsModal"
import { TransactionsSummary } from "./TransactionsSummary"
import withTransactions from "../../hoc/withTransactions"
import { StatusDisconnected } from "./Status/StatusDisconnected"
import { StatusMetaMaskNotAvailable } from "./Status/StatusMetaMaskNotAvailable"
import { StatusConnected } from "./Status/StatusConnected"
import type { WithModal } from "../../types/WithModal"
import type { TransactionsStore } from "../../stores/TransactionsProvider"
import type { Web3Store } from "../../stores/Web3Provider"

type AccountStatusProps = {
  modal: WithModal,
  txStore: TransactionsStore,
  web3Store: Web3Store,
}

class AccountStatus extends React.PureComponent<AccountStatusProps> {
  onClearTransactions = () => {
    this.props.modal.close()
    this.props.txStore.clearTransactions()
  }

  render() {
    const { modal, txStore, web3Store } = this.props

    if (!web3Store) {
      return null
    }

    return (
      <div className="AccountStatus">
        {!web3Store.account &&
          web3Store.metamaskAvailable && <StatusDisconnected />}

        {!web3Store.account &&
          !web3Store.metamaskAvailable && <StatusMetaMaskNotAvailable />}

        {web3Store.account && (
          <div>
            <StatusConnected account={web3Store.account} />
            <div>
              <TransactionsModal
                modal={modal}
                transactions={txStore.transactions}
                onClear={this.onClearTransactions}
              />
              <TransactionsSummary
                transactions={txStore.transactions}
                onShowAll={modal.show}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withTransactions(withWeb3(withModal(AccountStatus)))
