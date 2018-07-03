// @flow
import * as React from "react"
import "./styles/ToonPageAuction.css"
import { ToonAuction } from "../../models/web3/ToonAuction"
import Moment from "react-moment"
import { BuyToon } from "./BuyToon"
import { ToonDetails } from "../../models/ToonDetails"
import { wei2eth } from "../../helpers/ethConverter"

type ToonPageAuctionProps = {
  toonDetails: ToonDetails,
  toonAuction: ?ToonAuction,
}

class ToonPageAuction extends React.PureComponent<ToonPageAuctionProps> {
  static defaultProps = {}

  render() {
    const toonAuction: ?ToonAuction = this.props.toonAuction
    const toonDetails: ToonDetails = this.props.toonDetails
    if (!toonAuction) {
      return null
    }

    const {
      startingPrice,
      endingPrice,
      duration,
      startedAt,
      currentPrice,
    } = toonAuction

    const endDate = new Date(startedAt.valueOf() + duration)
    const isAuctionAtEnd = Date.now() > endDate

    return (
      <div className="container">
        {toonAuction && (
          <BuyToon toonDetails={toonDetails} toonAuction={toonAuction} />
        )}
        <p>
          <b>Started at:</b> Ξ{wei2eth(startingPrice)}
        </p>
        <p>
          <b>Price goes to:</b> Ξ{wei2eth(endingPrice)}
        </p>
        <p>
          <b>Buy now price:</b> Ξ{wei2eth(currentPrice)}
        </p>
        {!isAuctionAtEnd && (
          <p>
            <b>Time left:</b>{" "}
            <Moment fromNow ago>
              {endDate}
            </Moment>
          </p>
        )}
      </div>
    )
  }
}

export { ToonPageAuction }
