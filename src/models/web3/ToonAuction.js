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

  // Contract will return an auction object with default values (zeros) even if such auction doesn't exist.
  // Auction is active when startedAt value is higher than 0.
  isActive() {
    return this.startedAt > 0
  }
}
