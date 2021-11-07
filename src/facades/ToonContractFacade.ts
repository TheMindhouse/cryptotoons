import { ToonInfo } from "../models/web3/ToonInfo"
import { BaseContract } from "./BaseContract"
import { TRANSACTION_TYPE } from "../models/Transaction"
import { TransactionWithToon } from "../models/TransactionWithToon"
import { cutAddress } from "../helpers/strings"
import { Contract } from "web3-eth-contract"
import { ToonWithFamilyIds } from "../types/ToonTypes"

export class ToonContractFacade extends BaseContract {
  familyId: number

  constructor(Contract: Contract, account: string, familyId: number) {
    super(Contract, account)
    this.familyId = familyId
  }

  async createAuction(
    toonId: number,
    startPrice: number, // All prices in Wei
    endPrice: number,
    durationInSeconds: number
  ) {
    const txHash = await this.sendTransaction(
      this.Contract.methods.createSaleAuction(
        toonId,
        String(startPrice),
        String(endPrice),
        durationInSeconds
      )
    ).catch((e) => {
      console.log(e)
      throw Error("Create Auction Transaction has failed to send")
    })

    const tx = {
      hash: txHash,
      type: TRANSACTION_TYPE.createAuction,
      name: `Create Auction for Toon #${toonId}`,
      account: this.account,
      timestamp: new Date(),
      familyId: this.familyId,
      toonId,
    }
    return new TransactionWithToon(tx)

    // return new Promise((resolve, reject) => {
    //   this.Contract.methods.createSaleAuction(
    //     toonId,
    //     startPrice,
    //     endPrice,
    //     durationInSeconds,
    //     this.config,
    //     (error, txHash) => {
    //       if (error) {
    //         console.log(error)
    //         reject("Create Auction Transaction has failed to send")
    //       } else {
    //         const tx = {
    //           hash: txHash,
    //           type: TRANSACTION_TYPE.createAuction,
    //           name: `Create Auction for Toon #${toonId}`,
    //           account: this.account,
    //           timestamp: new Date(),
    //           familyId: this.familyId,
    //           toonId,
    //         }
    //         resolve(new TransactionWithToon(tx))
    //       }
    //     }
    //   )
    // })
  }

  async transferToon(toonId: number, toAccount: string) {
    const fromAccount = this.account

    if (!fromAccount || !toAccount || !toonId) {
      throw new Error("Incorrect arguments")
    }

    const txHash = await this.sendTransaction(
      this.Contract.methods.transferFrom(fromAccount, toAccount, toonId)
    ).catch(() => {
      throw Error("Transfer Toon Transaction has failed to send")
    })

    const tx = {
      hash: txHash,
      type: TRANSACTION_TYPE.transferToon,
      name: `Transfer Toon #${toonId} to address ${cutAddress(toAccount)}...`,
      account: this.account,
      timestamp: new Date(),
      familyId: this.familyId,
      toonId,
    }
    return new TransactionWithToon(tx)
    // return new Promise((resolve, reject) => {
    //   if (!fromAccount || !toAccount || !toonId) {
    //     throw new Error("Incorrect arguments")
    //   }
    //   this.Contract.methods.transferFrom(
    //     fromAccount,
    //     toAccount,
    //     toonId,
    //     this.config,
    //     (error, txHash) => {
    //       if (error) {
    //         console.log(error)
    //         reject("Transfer Toon Transaction has failed to send")
    //       } else {
    //         const tx = {
    //           hash: txHash,
    //           type: TRANSACTION_TYPE.transferToon,
    //           name: `Transfer Toon #${toonId} to address ${cutAddress(
    //             toAccount
    //           )}...`,
    //           account: this.account,
    //           timestamp: new Date(),
    //           familyId: this.familyId,
    //           toonId,
    //         }
    //         resolve(new TransactionWithToon(tx))
    //       }
    //     }
    //   )
    // })
  }

  /* ###########################################################################
   * VIEW FUNCTIONS (free)
   ########################################################################## */

  async getTotalToonsCount(): Promise<number> {
    try {
      const result = await this.Contract.methods.totalSupply().call()
      return Number(result)
    } catch (e) {
      console.error(e)
    }
    // return new Promise((resolve, reject) => {
    //   this.Contract.methods.totalSupply({}, (error, result: BigNumber) => {
    //     if (error) {
    //       console.log(error)
    //       reject(error)
    //     } else {
    //       resolve(result.toNumber())
    //     }
    //   })
    // })
  }

  async getOwnedToonsCount(owner: string): Promise<number> {
    const result = await this.Contract.methods.balanceOf(owner).call()
    return Number(result)
    // return new Promise((resolve, reject) => {
    //   this.Contract.methods.balanceOf(owner, (error, result: BigNumber) => {
    //     if (error) {
    //       console.log(error)
    //       reject(error)
    //     } else {
    //       resolve(result.toNumber())
    //     }
    //   })
    // })
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
  async getToonIdByOwnershipIndex(
    owner: string,
    index: number
  ): Promise<ToonWithFamilyIds> {
    const result = await this.Contract.methods
      .tokenOfOwnerByIndex(owner, index)
      .call()
    return {
      toonId: Number(result),
      familyId: this.familyId,
    }
    // return new Promise((resolve, reject) => {
    //   this.Contract.methods.tokenOfOwnerByIndex(
    //     owner,
    //     index,
    //     (error, result: BigNumber) => {
    //       if (error) {
    //         console.log(error)
    //         reject(error)
    //       } else {
    //         resolve({
    //           toonId: result.toNumber(),
    //           familyId: this.familyId,
    //         })
    //       }
    //     }
    //   )
    // })
  }

  async getToonInfo(toonId: number) {
    const result = await this.Contract.methods.getToonInfo(toonId).call()
    return new ToonInfo(result)
  }
}
