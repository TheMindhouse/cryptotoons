import { Contract } from "web3-eth-contract"
import { CONFIG } from "../config"

export class BaseContract {
  Contract: Contract
  account: string

  constructor(Contract: Contract, account: string) {
    this.Contract = Contract
    this.account = account
  }

  async sendTransaction(contractMethod: any, value?: number): Promise<string> {
    const gasEstimate = await contractMethod.estimateGas({
      from: this.account,
      value,
    })

    const safeGas = Math.floor(gasEstimate * CONFIG.SAFE_GAS_MULTIPLIER)

    console.log("gasEstimate", gasEstimate, "safeGas", safeGas)

    return new Promise((resolve, reject) => {
      contractMethod.send(
        { from: this.account, value, gas: safeGas },
        (error, txHash) => {
          if (error) {
            console.error(error)
            reject(error)
          } else {
            resolve(txHash)
          }
        }
      )
    })
  }
}
