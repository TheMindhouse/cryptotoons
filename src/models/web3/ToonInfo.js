// @flow
import { ToonInfoResponseObj } from "../../types/web3/web3ResponseObjects"

export class ToonInfo {
  genes: string
  birthTime: Date
  owner: string

  constructor(props: ToonInfoResponseObj) {
    this.genes = props[0].toString(10)
    this.birthTime = new Date(props[1].toNumber() * 1000)
    this.owner = props[2]
  }
}
