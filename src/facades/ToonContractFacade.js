// @flow
import { ToonInfo } from "../models/ToonInfo"
import { BaseContract } from "./BaseContract"
import { TRANSACTION_TYPE } from "../models/Transaction"
import { TransactionWithToon } from "../models/TransactionWithToon"

export class ToonContractFacade extends BaseContract {
  familyId: number

  constructor(Contract: Object, account: string, familyId: number) {
    super(Contract, account)
    this.familyId = familyId
  }

  createAuction({
    toonId,
    startPrice,
    endPrice,
    duration,
  }: {
    toonId: number,
    startPrice: number,
    endPrice: number,
    duration: number,
  }) {
    return new Promise((resolve, reject) => {
      this.Contract.createSaleAuction(
        toonId,
        startPrice,
        endPrice,
        duration,
        this.config,
        (error, txHash) => {
          if (error) {
            console.log(error)
            console.log("[ERROR] Create Auction failed")
            reject(error)
          } else {
            const tx = {
              hash: txHash,
              type: TRANSACTION_TYPE.createAuction,
              name: `Create Auction for Toon #${toonId}`,
              account: this.account,
              timestamp: new Date(),
              familyId: this.familyId,
              toonId,
            }
            resolve(new TransactionWithToon(tx))
          }
        }
      )
    })
  }

  /**
   * VIEW FUNCTIONS (free)
   */

  getTotalToonsCount(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.Contract.totalSupply({}, (error, result) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(parseInt(result, 10))
        }
      })
    })
  }

  getToonInfo(toonId: number): Promise<ToonInfo> {
    return new Promise((resolve, reject) => {
      this.Contract.getToonInfo(toonId, (error, result) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(new ToonInfo(result))
        }
      })
    })
  }
}
