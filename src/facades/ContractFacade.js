export class ContractFacade {
  constructor(Contract, account) {
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

  getTotalToonsCount() {
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
}
