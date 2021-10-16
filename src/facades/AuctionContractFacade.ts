import { BaseContract } from "./BaseContract"
import { BigNumber } from "bignumber.js"
import { ToonAuction } from "../models/web3/ToonAuction"
import { ToonAuctionResponseObj } from "../types/web3/web3ResponseObjects"
import { TransactionWithToon } from "../models/TransactionWithToon"
import { Transaction, TRANSACTION_TYPE } from "../models/Transaction"

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

  buyToon(
    toonContractAddress: string,
    toonId: number,
    familyId: number,
    price: number
  ) {
    return new Promise((resolve, reject) => {
      this.Contract.bid(
        toonContractAddress,
        toonId,
        { ...this.config, value: price },
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

  withdrawBalance() {
    return new Promise((resolve, reject) => {
      this.Contract.withdraw(this.config, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log("[ERROR] Withdraw Account Balance failed")
          reject(error)
        } else {
          const tx: Transaction = {
            hash: txHash,
            type: TRANSACTION_TYPE.withdrawBalance,
            name: `Withdraw Account Balance`,
            account: this.account,
            timestamp: new Date(),
          }
          resolve(new Transaction(tx))
        }
      })
    })
  }

  /* ###########################################################################
   * VIEW FUNCTIONS (free)
   ########################################################################## */

  getAuction(
    toonContractAddress: string,
    toonId: number
  ): Promise<ToonAuction | undefined> {
    return new Promise((resolve, reject) => {
      this.Contract.getAuction(
        toonContractAddress,
        toonId,
        {
          ...this.config,
          gas: Math.floor(Math.random() * Math.floor(5000000) + 1000000),
        },
        (error, result: ToonAuctionResponseObj) => {
          if (error) {
            reject(error)
          } else {
            const toonAuction = new ToonAuction(result)
            toonAuction.isActive() ? resolve(toonAuction) : resolve(null)
          }
        }
      )
    })
  }

  getAccountBalance(accountAddress: string): Promise<number | undefined> {
    return new Promise((resolve, reject) => {
      this.Contract.getPendingWithdrawal(
        accountAddress,
        (error, result: BigNumber) => {
          if (error) {
            reject(error)
          } else {
            resolve(result.toNumber())
          }
        }
      )
    })
  }
}
