// @flow
import { BaseContract } from "./BaseContract"
import { TRANSACTION_TYPE } from "../models/Transaction"
import { TransactionWithToon } from "../models/TransactionWithToon"
import { TOON_CONTRACT_ADDRESSES } from "../constants/contracts"
import { BigNumber } from "bignumber.js"

export class NamingContractFacade extends BaseContract {
  async setName(familyId: string, toonId: number, tokenName: string) {
    const contractAddress = TOON_CONTRACT_ADDRESSES[familyId]
    const fee = await this.getFee()
    return new Promise((resolve, reject) => {
      this.Contract.setTokenName(
        contractAddress,
        toonId,
        tokenName,
        { ...this.config, value: fee },
        (error, txHash) => {
          if (error) {
            console.log(error)
            reject("Name Your Toon Transaction has failed to send")
          } else {
            const tx = {
              hash: txHash,
              type: TRANSACTION_TYPE.setName,
              name: `Set Name for Toon #${toonId}`,
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

  getName(familyId: number, toonId: number): Promise<string> {
    const contractAddress = TOON_CONTRACT_ADDRESSES[familyId]
    return new Promise((resolve, reject) => {
      try {
        this.Contract.getTokenName(
          contractAddress,
          toonId,
          this.config,
          (error, result: string) => {
            if (error) {
              console.error(error)
              reject(error)
            } else {
              resolve(result || "")
            }
          }
        )
      } catch (e) {
        console.error(e)
      }
    })
  }

  getFee(): Promise<BigNumber> {
    return new Promise((resolve, reject) => {
      try {
        this.Contract.fee((error, result: BigNumber) => {
          if (error) {
            console.error(error)
            reject(error)
          } else {
            resolve(result)
          }
        })
      } catch (e) {
        console.error(e)
      }
    })
  }
}
