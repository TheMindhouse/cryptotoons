import { BigNumber } from "bignumber.js/bignumber"

export type ToonAuctionResponseObj = [
  string, // seller
  BigNumber, // startingPrice
  BigNumber, // endingPrice
  BigNumber, // duration
  BigNumber, // startedAt
  BigNumber, // currentPrice
]

export type ToonInfoResponseObj = [
  BigNumber, // genes
  BigNumber, // birthTime
  string, // owner
]
