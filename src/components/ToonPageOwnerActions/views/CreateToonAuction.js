// @flow
import * as React from "react"
import { Button, Col, Divider, InputNumber, message, Row } from "antd"
import { TransactionWithToon } from "../../../models/TransactionWithToon"
import { LocalStorageManager } from "../../../localStorage/index"
import type { Web3StoreType } from "../../../types/Web3StoreType"
import type { WithModal } from "../../../types/WithModal"
import { ToonDetails } from "../../../models/ToonDetails"
import withWeb3 from "../../../hoc/withWeb3"
import { days2seconds, eth2wei } from "../../../helpers/unitsConverter"
import { TermsInfo } from "../../Small/TermsInfo"

type CreateToonAuctionProps = {
  toonDetails: ToonDetails,
  switchToDefaultView: () => void,
  web3Store: Web3StoreType,
  modal: WithModal,
}

type CreateToonAuctionState = {
  startPrice: number,
  endPrice: number,
  duration: number,
  isSubmitting: boolean,
}

class CreateToonAuction extends React.PureComponent<
  CreateToonAuctionProps,
  CreateToonAuctionState
> {
  static defaultProps = {}

  state = {
    startPrice: 0.01, // Prices in ETH
    endPrice: 0.005,
    duration: 7, // Duration in days
    isSubmitting: false,
  }

  onSubmitAuction = () => {
    this.setState({ isSubmitting: true })
    const { startPrice, endPrice, duration } = this.state
    const { toonDetails, web3Store } = this.props
    const toonContract = web3Store.Contracts[toonDetails.familyId]
    const durationInSeconds = days2seconds(duration)
    const startPriceInWei = eth2wei(startPrice)
    const endPriceInWei = eth2wei(endPrice)
    toonContract
      .createAuction(
        toonDetails.toonId,
        startPriceInWei,
        endPriceInWei,
        durationInSeconds
      )
      .then((tx: TransactionWithToon) => {
        LocalStorageManager.transactions.updateTransactions(tx)
        message.success(`${tx.name} Transaction Sent`)
        this.setState({ isSubmitting: false }, this.props.switchToDefaultView)
      })
      .catch((error: string) => {
        this.setState({ isSubmitting: false })
        message.error(error)
      })
  }

  render() {
    const { startPrice, endPrice, duration, isSubmitting } = this.state
    return (
      <Row type="flex" justify="center">
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <h2 className="text-center">
            <b>Sell Toon</b>
          </h2>

          <div>
            <p>
              Toon will be put on the market where other users can purchase it.
            </p>
            <p>
              The starting price will go down (or up) during the auction time,
              until the price reaches the ending value. If nobody buys your Toon
              while on auction, the ending price will remain available until you
              cancel the offer.
            </p>
            <Row type="flex" align="middle">
              <Col span={12}>
                <b>Enter start price</b>
              </Col>
              <Col span={12}>
                <Row type="flex" align="middle" justify="end">
                  <span style={{ marginRight: 20 }}>Ξ</span>
                  <InputNumber
                    value={startPrice}
                    min={0}
                    step={0.01}
                    onChange={(value: number) =>
                      this.setState({ startPrice: value })
                    }
                  />
                </Row>
              </Col>
            </Row>
            <Divider />
            <Row type="flex" align="middle">
              <Col span={12}>
                <b>Enter end price</b>
              </Col>
              <Col span={12}>
                <Row type="flex" align="middle" justify="end">
                  <span style={{ marginRight: 20 }}>Ξ</span>
                  <InputNumber
                    value={endPrice}
                    min={0}
                    step={0.001}
                    onChange={(value: number) =>
                      this.setState({ endPrice: value })
                    }
                  />
                </Row>
              </Col>
            </Row>
            <Divider />
            <Row type="flex" align="middle">
              <Col span={10}>
                <b>Duration</b>
              </Col>
              <Col span={14}>
                <Row type="flex" align="middle" justify="end">
                  <span style={{ marginRight: 20 }}>Days</span>
                  <InputNumber
                    min={0}
                    step={1}
                    value={duration}
                    onChange={(value: number) =>
                      this.setState({ duration: value })
                    }
                  />
                </Row>
              </Col>
              <Col span={16} />
            </Row>
          </div>

          <TermsInfo />

          <Row type="flex" justify="space-between" style={{ marginTop: 30 }}>
            <Button
              type="default"
              size="large"
              onClick={this.props.switchToDefaultView}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={this.onSubmitAuction}
              loading={isSubmitting}
            >
              Create Auction
            </Button>
          </Row>
        </Col>
      </Row>
    )
  }
}

CreateToonAuction = withWeb3(CreateToonAuction)
export { CreateToonAuction }
