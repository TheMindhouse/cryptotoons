import { Contract } from "web3-eth-contract"
import { CONFIG } from "../config"
import Web3 from "web3"

export class BaseContract {
  web3: Web3
  Contract: Contract
  account: string

  constructor(web3: Web3, Contract: Contract, account: string) {
    this.web3 = web3
    this.Contract = Contract
    this.account = account
  }

  async sendTransaction(contractMethod: any, value?: number): Promise<string> {
    const [gasPrice, gasEstimate] = await Promise.all<number>([
      this.web3.eth.getGasPrice(),
      contractMethod.estimateGas({
        from: this.account,
        value,
      }),
    ])

    const safeGas = Math.floor(gasEstimate * CONFIG.SAFE_GAS_MULTIPLIER)
    const maxGasPrice = Math.floor(Number(gasPrice) * CONFIG.MAX_GAS_PRICE_MULTIPLIER)

    console.log("gasEstimate", gasEstimate, "safeGas", safeGas)
    console.log(
      "currentGasPrice",
      this.web3.utils.fromWei(String(gasPrice), "gwei"),
      "maxGasPrice",
      this.web3.utils.fromWei(String(maxGasPrice), "gwei")
    )

    return new Promise((resolve, reject) => {
      contractMethod.send(
        {
          from: this.account,
          value,
          gas: safeGas,
          maxFeePerGas: maxGasPrice,
          maxPriorityFeePerGas: this.web3.utils.toWei("1.5", "gwei"),
        },
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
