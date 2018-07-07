// @flow
import * as React from "react"
import { Button, Col, Input, message, Row, Tooltip } from "antd"
import { TransactionWithToon } from "../../../models/TransactionWithToon"
import { LocalStorageManager } from "../../../localStorage/index"
import type { Web3StoreType } from "../../../types/Web3StoreType"
import { ToonDetails } from "../../../models/ToonDetails"
import { TermsInfo } from "../../Small/TermsInfo"
import withWeb3 from "../../../hoc/withWeb3"

type TransferToonProps = {
  toonDetails: ToonDetails,
  switchToDefaultView: () => void,
  web3Store: Web3StoreType,
}

type TransferToonState = {
  receiver: ?string,
  isSubmitting: boolean,
}

class TransferToon extends React.PureComponent<
  TransferToonProps,
  TransferToonState
> {
  static defaultProps = {}

  state = {
    receiver: null,
    isSubmitting: false,
  }

  onChange = ({ target }: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ receiver: target.value })
  }

  onTransferToon = () => {
    const { toonDetails, web3Store } = this.props
    const toonContract = web3Store.Contracts[toonDetails.familyId]
    const { receiver } = this.state
    if (!receiver || receiver === "") {
      return message.error("Enter recipient's address")
    }
    this.setState({ isSubmitting: true })
    toonContract
      .transferToon(toonDetails.toonId, receiver)
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
    const { receiver, isSubmitting } = this.state
    return (
      <Row type="flex" justify="center">
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <h2 className="text-center">
            <b>Transfer Toon as Gift</b>
          </h2>

          <div>
            <p>
              Toon's ownership will be transferred to the new owner. You will
              lose ownership of this toon.
            </p>
            <Tooltip
              trigger={["focus"]}
              title={<small>Make sure to double check the address</small>}
              placement="topLeft"
            >
              <Input
                value={receiver}
                placeholder="Enter recipient's address"
                onChange={this.onChange}
              />
            </Tooltip>
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
              onClick={this.onTransferToon}
              loading={isSubmitting}
            >
              Send Toon
            </Button>
          </Row>
        </Col>
      </Row>
    )
  }
}

TransferToon = withWeb3(TransferToon)
export { TransferToon }
