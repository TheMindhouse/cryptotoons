// @flow
import * as React from "react"
import "./styles/ToonPageAuction.css"
import { ToonAuction } from "../../models/web3/ToonAuction"
import Moment from "react-moment"
import { BuyToon } from "./BuyToon"
import { ToonDetails } from "../../models/ToonDetails"
import { wei2eth } from "../../helpers/unitsConverter"
import { AuctionChart } from "./AuctionChart"
import { Col, Row } from "antd"
import { TextWithLabel } from "../Small/TextWithLabel"

type ToonPageAuctionProps = {
  toonDetails: ToonDetails,
  toonAuction: ToonAuction,
}

class ToonPageAuction extends React.PureComponent<ToonPageAuctionProps> {
  static defaultProps = {}

  render() {
    const toonAuction: ToonAuction = this.props.toonAuction
    const toonDetails: ToonDetails = this.props.toonDetails

    const {
      startingPrice,
      endingPrice,
      duration,
      startedAt,
      currentPrice,
    } = toonAuction

    // WHen auction reaches end date, endingPrice stays available until
    // someone buys the toon or the owner cancels the auction.
    const isForever = duration >= 8640000000000000
    const endDate = new Date(startedAt.valueOf() + duration)
    const isAuctionAtEnd = Date.now() > endDate

    return (
      <div className="container">
        <Row className="ToonPageAuction">
          <Col xs={{ span: 24 }} md={{ span: 20, offset: 2 }}>
            <Row type="flex" align="middle" justify="space-between" gutter={16}>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }} className="ToonPageAuction__Col">
                <Row type="flex" align="middle" justify="space-between">
                  <TextWithLabel
                    label="Auction started"
                    text={
                      <h3 className="color-lgray">
                        <Moment format="YYYY/MM/DD, HH:mm">{startedAt}</Moment>
                      </h3>
                    }
                  />
                  {!isAuctionAtEnd &&
                    !isForever && (
                      <TextWithLabel
                        label="Time left"
                        text={
                          <h2 className="color-lgray">
                            <Moment fromNow ago>
                              {endDate}
                            </Moment>
                          </h2>
                        }
                      />
                    )}
                </Row>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 9 }} lg={{ span: 8 }} className="ToonPageAuction__Col">
                <Row type="flex" align="middle" justify="end">
                  <Col xs={{ span: 12 }}>
                    <TextWithLabel
                      label="Buy now price"
                      text={
                        <h2>
                          <small className="text-smaller">Ξ</small>{" "}
                          <b>
                            {currentPrice > 0 ? wei2eth(currentPrice) : "Free"}
                          </b>
                        </h2>
                      }
                    />
                  </Col>
                  <Col xs={{ span: 12 }}>
                    <BuyToon
                      toonDetails={toonDetails}
                      toonAuction={toonAuction}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col xs={{ span: 24 }} md={{ span: 18, offset: 3 }}>
            <div className="ToonPageAuction__ChartContainer">
              <AuctionChart toonAuction={toonAuction} />
            </div>
          </Col>

          <Col xs={{ span: 24 }} md={{ span: 20, offset: 2 }}>
            <Row type="flex" align="middle" justify="space-between">
              <p>
                <small className="color-lgray">
                  <b>STARTED AT</b>
                </small>{" "}
                <span>
                  <small>Ξ</small> <b>{wei2eth(startingPrice)}</b>
                </span>
              </p>

              <p>
                <small className="color-lgray">
                  <b>PRICE GOES TO</b>
                </small>{" "}
                <span>
                  <small>Ξ</small> <b>{wei2eth(endingPrice)}</b>
                </span>
              </p>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export { ToonPageAuction }
