// @flow
import { BaseContract } from "./BaseContract"
import { BigNumber } from "bignumber.js"

export class AuctionContractFacade extends BaseContract {
  constructor(Contract: Object, account: string) {
    super(Contract, account)
  }

  getCurrentPrice(toonContractAddress: string, toonId: number) {
    return new Promise((resolve, reject) => {
      this.Contract.getCurrentPrice(
        toonContractAddress,
        toonId,
        (error, result: BigNumber) => {
          if (error) {
            console.log(error)
            reject(error)
          } else {
            resolve(result.toNumber())
          }
        }
      )
    })
  }
}
