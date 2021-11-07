import { ToonInfoResponseObj } from "../../types/web3/web3ResponseObjects"

export class ToonInfo {
  genes: string
  birthTime: Date
  owner: string

  constructor({ genes, owner, birthTime }: ToonInfoResponseObj) {
    this.genes = genes
    this.birthTime = new Date(Number(birthTime) * 1000)
    this.owner = owner
  }
}
