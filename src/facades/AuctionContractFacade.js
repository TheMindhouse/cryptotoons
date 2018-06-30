// @flow
import { BaseContract } from "./BaseContract"

export class AuctionContractFacade extends BaseContract {
  constructor(Contract: Object, account: string) {
    super(Contract, account)
  }
}
