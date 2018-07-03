// @flow
import * as React from "react"
import { Button, message, Modal } from "antd"
import { TransactionWithToon } from "../../models/TransactionWithToon"
import { LocalStorageManager } from "../../localStorage/index"
import type { Web3StoreType } from "../../types/Web3StoreType"
import type { WithModal } from "../../types/WithModal"
import { ToonDetails } from "../../models/ToonDetails"
import { TOON_CONTRACT_ADDRESSES } from "../../constants/contracts"
import withWeb3 from "../../hoc/withWeb3"

type EndToonAuctionProps = {
  toonDetails: ToonDetails,
  web3Store: Web3StoreType,
  modal: WithModal,
}

class EndToonAuction extends React.PureComponent<EndToonAuctionProps> {
  static defaultProps = {}

  confirm = () => {
    Modal.confirm({
      title: "End Auction?",
      content: `Auction of Toon #${
        this.props.toonDetails.toonId
      } will be cancelled.`,
      okText: "End",
      okType: "primary",
      onOk: this.cancelAuction,
    })
  }

  cancelAuction = () => {
    const { toonDetails, web3Store } = this.props
    const { toonId, familyId } = toonDetails
    const toonContractAddress = TOON_CONTRACT_ADDRESSES[toonDetails.familyId]
    const AuctionContract = web3Store.AuctionContract
    AuctionContract.cancelAuction(toonContractAddress, toonId, familyId).then(
      (tx: TransactionWithToon) => {
        LocalStorageManager.transactions.updateTransactions(tx)
        message.success(`${tx.name} Transaction Sent`)
      }
    )
  }

  render() {
    return (
      <div>
        <Button type="primary" size="large" icon="tag-o" onClick={this.confirm}>
          End Auction
        </Button>
      </div>
    )
  }
}

EndToonAuction = withWeb3(EndToonAuction)
export { EndToonAuction }
