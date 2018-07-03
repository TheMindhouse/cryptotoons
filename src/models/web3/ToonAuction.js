// @flow
import { ToonAuctionResponseObj } from "../../types/web3/web3ResponseObjects"

export class ToonAuction {
  seller: string
  startingPrice: number
  endingPrice: number
  duration: number
  startedAt: Date
  currentPrice: number

  constructor(props: ToonAuctionResponseObj) {
    this.seller = props[0]
    this.startingPrice = props[1].toNumber()
    this.endingPrice = props[2].toNumber()
    this.duration = props[3].toNumber() * 1000
    this.startedAt = new Date(props[4].toNumber() * 1000)
    this.currentPrice = props[5].toNumber()
  }
}
