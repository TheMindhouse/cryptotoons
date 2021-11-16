export const TRANSACTION_STATUS = {
  pending: "pending",
  completed: "completed",
  failed: "failed",
}

export const TRANSACTION_RECEIPT_STATUS = {
  0: TRANSACTION_STATUS.failed,
  1: TRANSACTION_STATUS.completed,
}

export const TRANSACTION_TYPE = {
  createAuction: "createAuction",
  cancelAuction: "cancelAuction",
  buyToon: "buyToon",
  transferToon: "transferToon",
  withdrawBalance: "withdrawBalance",
  setName: "setName",
}

export interface TransactionProps {
  hash: string;
  status?: string;
  type: string;
  name: string;
  account: string;
  timestamp: Date;
}

export class Transaction {
  hash: string;
  status: string;
  type: string;
  name: string;
  account: string;
  timestamp: Date;

  constructor({ hash, type, name, status, account, timestamp }: TransactionProps) {
    if (TRANSACTION_TYPE[type] === "undefined") {
      throw new Error("Incorrect transaction type")
    }

    this.hash = hash
    this.status = status || TRANSACTION_STATUS.pending
    this.type = TRANSACTION_TYPE[type]
    this.name = name
    this.account = account
    this.timestamp = new Date(timestamp)
  }
}
