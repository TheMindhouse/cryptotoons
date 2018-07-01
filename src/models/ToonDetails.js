// @flow
type ToonDetailsProps = {
  name: string,
  image?: string,
  toonId: number,
  familyId: number,
  birthTime: string,
  owner: string,
  genes: string,
}

export class ToonDetails {
  name: string
  image: ?string
  toonId: number
  familyId: number
  birthTime: string
  owner: string
  genes: string

  constructor({
    name,
    image,
    toonId,
    familyId,
    birthTime,
    owner,
    genes,
  }: ToonDetailsProps) {
    this.name = name
    this.image = image
    this.toonId = toonId
    this.familyId = familyId
    this.birthTime = birthTime
    this.owner = owner
    this.genes = genes
  }
}
