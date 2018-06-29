// @flow
import { ToonInfo } from "../models/ToonInfo"

export class ContractFacade {
  Contract: Object
  account: string
  config: {
    gas: number,
    from: string,
  }

  constructor(Contract: Object, account: string) {
    this.Contract = Contract
    this.account = account
    this.config = {
      gas: 6000000,
      from: account,
    }
  }

  /**
   * VIEW FUNCTIONS (free)
   */

  getTotalToonsCount(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.Contract.totalSupply({}, (error, result) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(parseInt(result, 10))
        }
      })
    })
  }

  getToonInfo(toonId: number): Promise<ToonInfo> {
    return new Promise((resolve, reject) => {
      this.Contract.getToonInfo(toonId, (error, result) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(new ToonInfo(result))
        }
      })
    })
  }
}
