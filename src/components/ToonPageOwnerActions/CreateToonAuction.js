// @flow
import * as React from "react"
import { CreateAuctionModal } from "../Modals/CreateAuctionModal"
import { Button, message } from "antd"
import { TransactionWithToon } from "../../models/TransactionWithToon"
import { LocalStorageManager } from "../../localStorage/index"
import type { Web3StoreType } from "../../types/Web3StoreType"
import type { WithModal } from "../../types/WithModal"
import withModal from "../../hoc/withModal"
import { ToonDetails } from "../../models/ToonDetails"
import withWeb3 from "../../hoc/withWeb3"

type CreateToonAuctionProps = {
  toonDetails: ToonDetails,
  web3Store: Web3StoreType,
  modal: WithModal,
}

class CreateToonAuction extends React.PureComponent<CreateToonAuctionProps> {
  static defaultProps = {}

  onSubmitAuction = (
    startPrice: number,
    endPrice: number,
    duration: number
  ) => {
    const { toonDetails, web3Store } = this.props
    const toonContract = web3Store.Contracts[toonDetails.familyId]
    const durationInSeconds = duration * 60 * 60
    toonContract
      .createAuction(
        toonDetails.toonId,
        startPrice,
        endPrice,
        durationInSeconds
      )
      .then((tx: TransactionWithToon) => {
        LocalStorageManager.transactions.updateTransactions(tx)
        message.success("Create Toon Auction Transaction sent")
      })
  }

  render() {
    return (
      <div>
        <CreateAuctionModal
          modal={this.props.modal}
          onSubmitAuction={this.onSubmitAuction}
        />
        <Button
          type="primary"
          size="large"
          icon="tag-o"
          onClick={this.props.modal.show}
        >
          Create Auction
        </Button>
      </div>
    )
  }
}

CreateToonAuction = withModal(withWeb3(CreateToonAuction))
export { CreateToonAuction }
