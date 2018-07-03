// @flow
import * as React from "react"
import "./styles/ToonPageAuction.css"
import { ToonAuction } from "../../models/web3/ToonAuction"
import Moment from "react-moment"

type ToonPageAuctionProps = {
  toonAuction: ?ToonAuction,
}

class ToonPageAuction extends React.PureComponent<ToonPageAuctionProps> {
  static defaultProps = {}

  render() {
    const toonAuction: ?ToonAuction = this.props.toonAuction
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
    return (
      <div className="container">
        <p>Started at: {startingPrice}</p>
        <p>Price goes to: {endingPrice}</p>
        <p>Buy now price: {currentPrice}</p>
        <p>
          Time left:{" "}
          <Moment fromNow ago>
            {new Date(startedAt.valueOf() + duration)}
          </Moment>
        </p>
      </div>
    )
  }
}

export { ToonPageAuction }
