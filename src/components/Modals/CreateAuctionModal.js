// @flow
import * as React from "react"
import "./styles/CreateAuctionModal.css"
import { Col, InputNumber, Modal, Row } from "antd"
import type { WithModal } from "../../types/WithModal"

type CreateAuctionModalProps = {
  modal: WithModal,
  onSubmitAuction: (
    startPrice: number,
    endPrice: number,
    duration: number
  ) => void,
}

type CreateAuctionModalState = {
  startPrice: number,
  endPrice: number,
  duration: number,
}

class CreateAuctionModal extends React.PureComponent<
  CreateAuctionModalProps,
  CreateAuctionModalState
> {
  static defaultProps = {}

  state = {
    startPrice: 0,
    endPrice: 0,
    duration: 0, // duration in ms
  }

  onSubmit = () => {
    const { startPrice, endPrice, duration } = this.state
    this.props.onSubmitAuction(startPrice, endPrice, duration)
  }

  render() {
    const { startPrice, endPrice, duration } = this.state
    return (
      <Modal
        title="Offer this Toon for sale"
        visible={this.props.modal.isVisible}
        onOk={this.onSubmit}
        onCancel={this.props.modal.close}
        okText="Create Toon Auction"
      >
        <Row type="flex" align="middle">
          <Col span={8}>
            <b>Starting price:</b>
          </Col>
          <Col span={16}>
            <InputNumber
              value={startPrice}
              formatter={(value) => `Ξ ${value}`}
              parser={(value) => value.replace(/Ξ\s?|(,*)/g, "")}
              onChange={(value: number) => this.setState({ startPrice: value })}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={8}>
            <b>Ending price:</b>
          </Col>
          <Col span={16}>
            <InputNumber
              value={endPrice}
              formatter={(value) => `Ξ ${value}`}
              parser={(value) => value.replace(/Ξ\s?|(,*)/g, "")}
              onChange={(value: number) => this.setState({ endPrice: value })}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={8}>
            <b>Duration (hours):</b>
          </Col>
          <Col span={16}>
            <InputNumber
              value={duration}
              onChange={(value: number) => this.setState({ duration: value })}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
      </Modal>
    )
  }
}

export { CreateAuctionModal }
