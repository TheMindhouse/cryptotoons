// @flow
import { Transaction } from "./Transaction"

type TransactionWithToonProps = {
  ...Transaction,
  familyId: number,
  toonId: number,
}

export class TransactionWithToon extends Transaction {
  constructor(props: TransactionWithToonProps) {
    super(props)
    this.familyId = props.familyId
    this.toonId = props.toonId
  }
}
