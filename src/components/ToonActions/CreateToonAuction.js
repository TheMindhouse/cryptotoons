// @flow
import * as React from "react"
import withWeb3 from "../../hoc/withWeb3"
import { Button, message } from "antd"
import withModal from "../../hoc/withModal"
import type { WithModal } from "../../types/WithModal"
import { CreateAuctionModal } from "../Modals/CreateAuctionModal"
import { TransactionWithToon } from "../../models/TransactionWithToon"
import { LocalStorageManager } from "../../localStorage"
import { ToonDetails } from "../../models/ToonDetails"
import type { Web3StoreType } from "../../types/Web3StoreType"

type CreateToonAuctionProps = {
  toonDetails: ToonDetails,
  web3Store: Web3StoreType,
  modal: WithModal,
}

class CreateToonAuction extends React.PureComponent<CreateToonAuctionProps> {
  static defaultProps = {}

  isUserToonOwner = () => {
    const { web3Store, toonDetails } = this.props
    return web3Store && web3Store.account === toonDetails.owner
  }

  onSubmitAuction = (
    startPrice: number,
    endPrice: number,
    duration: number
  ) => {
    const { toonDetails, web3Store } = this.props
    if (!web3Store || !web3Store.Contracts) {
      return
    }
    const toonContract = web3Store.Contracts[toonDetails.familyId]
    if (!toonContract) {
      return
    }
    const durationInMs = duration * 60 * 60 * 1000
    toonContract
      .createAuction(toonDetails.toonId, startPrice, endPrice, durationInMs)
      .then((tx: TransactionWithToon) => {
        LocalStorageManager.transactions.updateTransactions(tx)
        message.success("Create Toon Auction Transaction sent")
      })
  }

  render() {
    if (!this.isUserToonOwner()) {
      return null
    }

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
