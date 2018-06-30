// @flow
import { Transaction, TRANSACTION_TYPE } from "../models/Transaction"
import { TransactionWithToon } from "../models/TransactionWithToon"

const STORAGE_KEY = "USER_TX"

const getTransactions = (): Array<Transaction> => {
  const transactions = window.localStorage.getItem(STORAGE_KEY)
  if (transactions) {
    return JSON.parse(transactions).map((tx) => {
      switch (tx.type) {
        case TRANSACTION_TYPE.createAuction:
          return new TransactionWithToon(tx)
        default:
          return new Transaction(tx)
      }
    })
  }
  return []
}

const updateTransactions = (transaction: Transaction) => {
  const currentTransactions = getTransactions()

  // Check if transaction is saved already
  const index = currentTransactions.findIndex(
    (tx) => tx.hash === transaction.hash
  )

  const newTransactions =
    index >= 0
      ? [
          ...currentTransactions.slice(0, index),
          transaction,
          ...currentTransactions.slice(index + 1, currentTransactions.length),
        ]
      : [...currentTransactions, transaction]

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newTransactions))
}

const clearTransactions = () => {
  window.localStorage.removeItem(STORAGE_KEY)
}

export const transactions = {
  getTransactions,
  updateTransactions,
  clearTransactions,
}
