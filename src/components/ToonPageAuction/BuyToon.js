// @flow
import * as React from "react"
import { Button, message, Modal, Tooltip } from "antd"
import { ToonDetails } from "../../models/ToonDetails"
import { ToonAuction } from "../../models/web3/ToonAuction"
import withWeb3 from "../../hoc/withWeb3"
import type { Web3StoreType } from "../../types/Web3StoreType"
import { TransactionWithToon } from "../../models/TransactionWithToon"
import { LocalStorageManager } from "../../localStorage"
import { TOON_CONTRACT_ADDRESSES } from "../../constants/contracts"
import { wei2eth } from "../../helpers/unitsConverter"

type BuyToonProps = {
  toonDetails: ToonDetails,
  toonAuction: ToonAuction,
  web3Store: Web3StoreType,
}

class BuyToon extends React.PureComponent<BuyToonProps> {
  static defaultProps = {}

  isPriceIncreasing = () =>
    this.props.toonAuction.endingPrice > this.props.toonAuction.startingPrice

  getMaxPrice = () =>
    this.isPriceIncreasing()
      ? 1.1 * this.props.toonAuction.currentPrice
      : this.props.toonAuction.currentPrice

  confirm = () => {
    Modal.confirm({
      title: `Buy ${this.props.toonDetails.name} now?`,
      content: (
        <div>
          <br />
          <p>
            <b>Max price: Ξ{wei2eth(this.getMaxPrice())}</b>
          </p>
          {this.isPriceIncreasing() && (
            <div>
              <p style={{ lineHeight: "1.2em" }}>
                <small>
                  <b>Important notice</b>
                  <br />
                  Price of the Toon is increasing with time, which means that
                  when the transaction is processed, the price will be a bit
                  higher. We've added 10% to the current price so your
                  transaction can still go through after some time.
                </small>
              </p>
            </div>
          )}
          <p>Toon's ownership will be transferred to your account.</p>
        </div>
      ),
      okText: "Ok, buy this Toon",
      okType: "primary",
      onOk: this.buyToon,
    })
  }

  buyToon = () => {
    const { toonDetails, web3Store } = this.props
    const { toonId, familyId } = toonDetails
    const toonContractAddress = TOON_CONTRACT_ADDRESSES[toonDetails.familyId]
    const AuctionContract = web3Store.AuctionContract
    const price = this.getMaxPrice()
    AuctionContract.buyToon(toonContractAddress, toonId, familyId, price).then(
      (tx: TransactionWithToon) => {
        LocalStorageManager.transactions.updateTransactions(tx)
        message.success(`${tx.name} Transaction Sent`)
      }
    )
  }

  render() {
    const { web3Store, toonAuction } = this.props

    // Do not show Buy button for Toon owner
    if (web3Store.account === toonAuction.seller) {
      return null
    }

    if (!web3Store.account) {
      return (
        <Tooltip title="Log in to MetaMask to buy Toons">
          <Button
            type="primary"
            size="large"
            icon="shopping-cart"
            onClick={this.confirm}
            style={{ width: "100%" }}
            title="Log in"
            disabled
          >
            Buy now
          </Button>
        </Tooltip>
      )
    }

    return (
      <div>
        <Button
          type="primary"
          size="large"
          icon="shopping-cart"
          onClick={this.confirm}
          style={{ width: "100%" }}
        >
          Buy now
        </Button>
      </div>
    )
  }
}

BuyToon = withWeb3(BuyToon)
export { BuyToon }
