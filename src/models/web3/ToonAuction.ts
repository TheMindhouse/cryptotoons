import { ToonAuctionResponseObj } from "../../types/web3/web3ResponseObjects"
import { AUCTION_DIRECTIONS } from "../../constants/auction"

export class ToonAuction {
  seller: string
  startingPrice: number
  endingPrice: number
  duration: number
  startedAt: Date
  currentPrice: number

  constructor({
    startingPrice,
    endingPrice,
    currentPrice,
    startedAt,
    seller,
    duration,
  }: ToonAuctionResponseObj) {
    this.seller = seller
    this.startingPrice = Number(startingPrice)
    this.endingPrice = Number(endingPrice)
    this.duration = Number(duration) * 1000
    this.startedAt = new Date(Number(startedAt) * 1000)
    this.currentPrice = Number(currentPrice)
  }

  /**
   * Returns true if the auction is available for interaction
   *
   * Contract will return an auction object with default values (zeros) even if such auction doesn't exist.
   * Auction is active when startedAt value is higher than 0.
   *
   * @return {boolean}
   */
  isActive(): boolean {
    return this.startedAt > 0
  }

  /**
   * Returns true if the price of the toon is increasing when both
   * the ending price is higher than the starting price
   * and the auction hasn't reached an end yet.
   *
   * @return {boolean}
   */
  isPriceIncreasing(): boolean {
    return (
      this.endingPrice > this.startingPrice && this.getPercentCompleted() < 1
    )
  }

  /**
   * Returns how much of auction time has elapsed
   *
   * @return {number} - percent scaled from 0 to 1
   */
  getPercentCompleted(): number {
    const { duration, startedAt } = this
    const timeElapsed = Date.now() - startedAt
    if (timeElapsed >= duration) {
      return 1
    }
    return timeElapsed / duration
  }

  /**
   * Returns the direction in which the price goes.
   * The ending price can be lower, higher or the same as the starting price.
   *
   * @return {number}
   */
  getAuctionDirection = (): number => {
    const { startingPrice, endingPrice } = this
    // Price decreasing
    if (startingPrice > endingPrice) {
      return AUCTION_DIRECTIONS.DECREASING
    }
    // Price increasing
    if (startingPrice < endingPrice) {
      return AUCTION_DIRECTIONS.INCREASING
    }
    // Price not changing
    return AUCTION_DIRECTIONS.STABLE
  }
}
