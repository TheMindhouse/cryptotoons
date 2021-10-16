import { BigNumber } from "bignumber.js/bignumber"
import { ToonInfo } from "../models/web3/ToonInfo"
import { BaseContract } from "./BaseContract"
import { TRANSACTION_TYPE } from "../models/Transaction"
import { TransactionWithToon } from "../models/TransactionWithToon"
import { ToonInfoResponseObj } from "../types/web3/web3ResponseObjects"
import type { ToonWithFamilyIds } from "../types/ToonTypes"
import { cutAddress } from "../helpers/strings"

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
            reject("Create Auction Transaction has failed to send")
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

  transferToon(toonId: number, toAccount: string) {
    const fromAccount = this.account
    return new Promise((resolve, reject) => {
      if (!fromAccount || !toAccount || !toonId) {
        throw new Error("Incorrect arguments")
      }
      this.Contract.transferFrom(
        fromAccount,
        toAccount,
        toonId,
        this.config,
        (error, txHash) => {
          if (error) {
            console.log(error)
            reject("Transfer Toon Transaction has failed to send")
          } else {
            const tx = {
              hash: txHash,
              type: TRANSACTION_TYPE.transferToon,
              name: `Transfer Toon #${toonId} to address ${cutAddress(
                toAccount
              )}...`,
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
  getToonIdByOwnershipIndex(
    owner: string,
    index: number
  ): Promise<ToonWithFamilyIds> {
    return new Promise((resolve, reject) => {
      this.Contract.tokenOfOwnerByIndex(
        owner,
        index,
        (error, result: BigNumber) => {
          if (error) {
            console.log(error)
            reject(error)
          } else {
            resolve({
              toonId: result.toNumber(),
              familyId: this.familyId,
            })
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
