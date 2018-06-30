// @flow
export class BaseContract {
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
}
