// @flow
import { BigNumber } from "bignumber.js"

export class Auction {
  seller: string
  startingPrice: number
  endingPrice: number
  duration: number
  startedAt: Date

  constructor(props: [string, BigNumber, BigNumber, BigNumber, BigNumber]) {
    this.seller = props[0]
    this.startingPrice = props[1].toNumber()
    this.endingPrice = props[2].toNumber()
    this.duration = props[3].toNumber()
    this.startedAt = new Date(props[4].toNumber())
  }
}
