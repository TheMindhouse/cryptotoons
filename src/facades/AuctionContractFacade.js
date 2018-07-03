// @flow
import { BaseContract } from "./BaseContract"
import { BigNumber } from "bignumber.js"
import { ToonAuction } from "../models/web3/ToonAuction"
import { ToonAuctionResponseObj } from "../types/web3/web3ResponseObjects"
import { TransactionWithToon } from "../models/TransactionWithToon"
import { TRANSACTION_TYPE } from "../models/Transaction"

export class AuctionContractFacade extends BaseContract {
  cancelAuction(toonContractAddress: string, toonId: number, familyId: number) {
    return new Promise((resolve, reject) => {
      this.Contract.cancelAuction(
        toonContractAddress,
        toonId,
        this.config,
        (error, txHash) => {
          if (error) {
            console.log(error)
            console.log("[ERROR] Cancel Auction failed")
            reject(error)
          } else {
            const tx = {
              hash: txHash,
              type: TRANSACTION_TYPE.cancelAuction,
              name: `Cancel Auction of Toon #${toonId}`,
              account: this.account,
              timestamp: new Date(),
              familyId,
              toonId,
            }
            resolve(new TransactionWithToon(tx))
          }
        }
      )
    })
  }

  buyToon(toonContractAddress: string, toonId: number, familyId: number) {
    return new Promise((resolve, reject) => {
      this.Contract.bid(
        toonContractAddress,
        toonId,
        this.config,
        (error, txHash) => {
          if (error) {
            console.log(error)
            console.log("[ERROR] Buy Toon failed")
            reject(error)
          } else {
            const tx = {
              hash: txHash,
              type: TRANSACTION_TYPE.buyToon,
              name: `Buy Toon #${toonId}`,
              account: this.account,
              timestamp: new Date(),
              familyId,
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

  getAuction(
    toonContractAddress: string,
    toonId: number
  ): Promise<?ToonAuction> {
    return new Promise((resolve) => {
      this.Contract.getAuction(
        toonContractAddress,
        toonId,
        this.config,
        (error, result: ToonAuctionResponseObj) => {
          if (error) {
            // Rejected transaction means there is no auction for the toon
            resolve(null)
          } else {
            resolve(new ToonAuction(result))
          }
        }
      )
    })
  }
}
