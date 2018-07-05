// @flow
import { BigNumber } from "bignumber.js/bignumber"
import { ToonInfo } from "../models/web3/ToonInfo"
import { BaseContract } from "./BaseContract"
import { TRANSACTION_TYPE } from "../models/Transaction"
import { TransactionWithToon } from "../models/TransactionWithToon"
import { ToonInfoResponseObj } from "../types/web3/web3ResponseObjects"

export class ToonContractFacade extends BaseContract {
  familyId: number

  constructor(Contract: Object, account: string, familyId: number) {
    super(Contract, account)
    this.familyId = familyId
  }

  createAuction(
    toonId: number,
    startPrice: number, // All prices in Wei
    endPrice: number,
    durationInSeconds: number
  ) {
    return new Promise((resolve, reject) => {
      this.Contract.createSaleAuction(
        toonId,
        startPrice,
        endPrice,
        durationInSeconds,
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

  /* ###########################################################################
   * VIEW FUNCTIONS (free)
   ########################################################################## */

  getTotalToonsCount(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.Contract.totalSupply({}, (error, result: BigNumber) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(result.toNumber())
        }
      })
    })
  }

  getOwnedToonsCount(owner: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.Contract.balanceOf(owner, (error, result: BigNumber) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(result.toNumber())
        }
      })
    })
  }

  /**
   * In order to get toon details we need to find Toon Id.
   * We know how many toons are owned by an address, and using that amount
   * we can iterate over owned toons and obtain their proper id.
   * (I know, it's tricky)
   *
   * @param owner - address
   * @param index - index of toon as in ownership array [0..ownedToonsCount]
   * @returns {Promise<number>}
   */
  getToonIdByOwnershipIndex(owner: string, index: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.Contract.tokenOfOwnerByIndex(
        owner,
        index,
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

  getToonInfo(toonId: number): Promise<ToonInfo> {
    return new Promise((resolve, reject) => {
      this.Contract.getToonInfo(
        toonId,
        (error, result: ToonInfoResponseObj) => {
          if (error) {
            console.log(error)
            reject(error)
          } else {
            resolve(new ToonInfo(result))
          }
        }
      )
    })
  }
}
