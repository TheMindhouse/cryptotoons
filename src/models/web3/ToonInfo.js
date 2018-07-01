// @flow
import { BigNumber } from "bignumber.js"

export class ToonInfo {
  genes: string
  birthTime: number
  owner: string

  constructor(props: [BigNumber, number, string]) {
    this.genes = props[0].toString(10)
    this.birthTime = props[1]
    this.owner = props[2]
  }
}
