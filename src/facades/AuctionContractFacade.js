// @flow
import { BaseContract } from "./BaseContract"
import { BigNumber } from "bignumber.js"

export class AuctionContractFacade extends BaseContract {
  getCurrentPrice(
    toonContractAddress: string,
    toonId: number
  ): Promise<?number> {
    return new Promise((resolve, reject) => {
      this.Contract.getCurrentPrice(
        toonContractAddress,
        toonId,
        (error, result: BigNumber) => {
          if (error) {
            // Rejected transaction means there is no auction for the toon
            resolve(null)
          } else {
            resolve(result.toNumber())
          }
        }
      )
    })
  }
}
