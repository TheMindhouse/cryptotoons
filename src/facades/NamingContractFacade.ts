import { BaseContract } from "./BaseContract"
import { TRANSACTION_TYPE } from "../models/Transaction"
import { TransactionWithToon } from "../models/TransactionWithToon"
import { TOON_CONTRACT_ADDRESSES } from "../constants/contracts"
import { BigNumber } from "bignumber.js"
import { eth2wei } from "../helpers/unitsConverter"

export class NamingContractFacade extends BaseContract {
  async setName(familyId: number, toonId: number, tokenName: string) {
    const contractAddress = TOON_CONTRACT_ADDRESSES[familyId]
    const fee = await this.getFee()

    const txHash = await this.sendTransaction(
      this.Contract.methods.setTokenName(contractAddress, toonId, tokenName),
      fee
    ).catch(() => {
      throw Error("Name Your Toon Transaction has failed to send")
    })

    const tx = {
      hash: txHash,
      type: TRANSACTION_TYPE.setName,
      name: `Set Name for Toon #${toonId}`,
      account: this.account,
      timestamp: new Date(),
      familyId,
      toonId,
    }
    return new TransactionWithToon(tx)
  }

  /* ###########################################################################
   * VIEW FUNCTIONS (free)
   ########################################################################## */

  async getName(familyId: number, toonId: number) {
    const contractAddress = TOON_CONTRACT_ADDRESSES[familyId]
    const result = await this.Contract.methods
      .getTokenName(contractAddress, toonId)
      .call()
    return result || ""
  }

  async getFee() {
    return await this.Contract.methods.fee().call()
  }
}
