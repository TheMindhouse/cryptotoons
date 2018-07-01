// @flow
import { BigNumber } from "bignumber.js"

export class ToonInfo {
  genes: string
  birthTime: Date
  owner: string

  constructor(props: [BigNumber, BigNumber, string]) {
    this.genes = props[0].toString(10)
    this.birthTime = new Date(props[1].toNumber() * 1000)
    this.owner = props[2]
  }
}
