import { BaseContract } from "./BaseContract"
import { BigNumber } from "bignumber.js"
import { ToonAuction } from "../models/web3/ToonAuction"
import { ToonAuctionResponseObj } from "../types/web3/web3ResponseObjects"
import { TransactionWithToon } from "../models/TransactionWithToon"
import { Transaction, TRANSACTION_TYPE } from "../models/Transaction"

export class AuctionContractFacade extends BaseContract {
  async cancelAuction(
    toonContractAddress: string,
    toonId: number,
    familyId: number
  ) {
    const txHash = await this.sendTransaction(
      this.Contract.methods.cancelAuction(toonContractAddress, toonId)
    ).catch(() => {
      throw Error("[ERROR] Cancel Auction failed")
    })

    const tx = {
      hash: txHash,
      type: TRANSACTION_TYPE.cancelAuction,
      name: `Cancel Auction of Toon #${toonId}`,
      account: this.account,
      timestamp: new Date(),
      familyId,
      toonId,
    }
    return new TransactionWithToon(tx)
  }

  async buyToon(
    toonContractAddress: string,
    toonId: number,
    familyId: number,
    price: number
  ) {
    const txHash = await this.sendTransaction(
      this.Contract.methods.bid(toonContractAddress, toonId),
      price
    ).catch(() => {
      throw Error("[ERROR] Buy Toon failed")
    })

    const tx = {
      hash: txHash,
      type: TRANSACTION_TYPE.buyToon,
      name: `Buy Toon #${toonId}`,
      account: this.account,
      timestamp: new Date(),
      familyId,
      toonId,
    }
    return new TransactionWithToon(tx)
  }

  async withdrawBalance() {
    const txHash = await this.sendTransaction(
      this.Contract.methods.withdraw()
    ).catch(() => {
      throw Error("[ERROR] Withdraw Account Balance failed")
    })
    const tx = {
      hash: txHash,
      type: TRANSACTION_TYPE.withdrawBalance,
      name: `Withdraw Account Balance`,
      account: this.account,
      timestamp: new Date(),
    }
    return new Transaction(tx)
  }

  /* ###########################################################################
   * VIEW FUNCTIONS (free)
   ########################################################################## */

  async getAuction(toonContractAddress: string, toonId: number) {
    const result = await this.Contract.methods
      .getAuction(toonContractAddress, toonId)
      .call()

    const toonAuction = new ToonAuction(result)
    return toonAuction.isActive() ? toonAuction : null
  }

  async getAccountBalance(accountAddress: string) {
    return await this.Contract.methods.getPendingWithdrawal(accountAddress)
  }
}
