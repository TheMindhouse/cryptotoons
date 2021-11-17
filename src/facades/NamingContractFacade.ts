import { BaseContract } from "./BaseContract"
import { TRANSACTION_TYPE } from "../models/Transaction"
import { TransactionWithToon } from "../models/TransactionWithToon"
import { TOON_CONTRACT_ADDRESSES } from "../constants/contracts"
import { BigNumber } from "bignumber.js"
import { eth2wei } from "../helpers/unitsConverter"

export class NamingContractFacade extends BaseContract {
  async setName(familyId: number, toonId: number, tokenName: string) {
    const contractAddress = TOON_CONTRACT_ADDRESSES[familyId]
    const totalFee = await this.getTotalFee(contractAddress)
    console.log("totalFee", this.web3.utils.fromWei(String(totalFee), "ether"))

    const txHash = await this.sendTransaction(
      this.Contract.methods.setTokenName(contractAddress, toonId, tokenName),
      totalFee
    ).catch((e) => {
      console.error(e)
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

  async getName(familyId: number, toonId: number): Promise<string> {
    const contractAddress = TOON_CONTRACT_ADDRESSES[familyId]
    const result = await this.Contract.methods
      .getTokenName(contractAddress, toonId)
      .call()
    return result || ""
  }

  async getBaseFee(): Promise<number> {
    const baseFee: string = await this.Contract.methods.baseFee().call()
    return Number(baseFee || 0)
  }

  async getProjectFee(contractAddress: string): Promise<number> {
    const projectFee: string = await this.Contract.methods
      .getProjectFeeInWei(contractAddress)
      .call()
    return Number(projectFee || 0)
  }

  async getTotalFee(contractAddress: string): Promise<number> {
    const [baseFee, projectFee] = await Promise.all([
      this.getBaseFee(),
      this.getProjectFee(contractAddress),
    ])
    return baseFee + projectFee
  }
}
