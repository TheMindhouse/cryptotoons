import { Transaction } from "./Transaction"

interface TransactionWithToonProps extends Transaction {
  familyId: number;
  toonId: number;
}

export class TransactionWithToon extends Transaction {
  familyId: number
  toonId: number

  constructor(props: TransactionWithToonProps) {
    super(props)
    this.familyId = props.familyId
    this.toonId = props.toonId
  }
}
