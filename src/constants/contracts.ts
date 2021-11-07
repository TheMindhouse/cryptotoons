import { FAMILY_IDS } from "./toonFamilies"

const isRinkeby = process.env.REACT_APP_ETHEREUM_NETWORK === "rinkeby"

export const CONTRACT_OWNER_ADDRESS =
  "0xBcd7247756bE53Fe42D8868F92549C54E7e64152"

export const AUCTION_CONTRACT_ADDRESS = isRinkeby
  ? // Rinkeby
    "0x0df000fb9b01ce876893887f4e6c230556b1cb6c"
  : // Live
    "0xaaa688ac2755cb6a27d123a0300bcf793c9ed019"

export const NAMING_CONTRACT_ADDRESS = isRinkeby
  ? // Rinkeby
    "0x7cB835bDBa829a2692ADbA757e2018EaA86d775f"
  : // Live
    "0xa0aface48454a21bce59f580c8bc1e236ea304e7"

/**
 * CONTRACTS ON MAIN NET
 */
export const TOON_CONTRACT_ADDRESSES = isRinkeby
  ? {
      // Rinkeby
      [FAMILY_IDS.Cows]: "0x4a34e36b0a5a5e51f478bae4204bf5ec6c62f3e1",
    }
  : {
      // Live
      [FAMILY_IDS.Cows]: "0xd4202b234c15255bf0511d3380e83bda9172a72b",
      [FAMILY_IDS.Bulls]: "0x58e80f54c86b6df98814cc274893534c0f7785e8",
      [FAMILY_IDS.Donkeys]: "0x271a0b465d5b453bb835afd2d671c76b2b76900e",
      [FAMILY_IDS.Elephants]: "0xbf8a84de5dcc0bd5792026bfdebfc75d9675a363",
      [FAMILY_IDS.Gorillas]: "0x0c6644c9973593b6a4c9c0af1af88f6b29ecace9",
      [FAMILY_IDS.Hippos]: "0x6338191071747abc74d7644d71b49c07289b1eff",
      [FAMILY_IDS.Llamas]: "0x739039c187655590367f96158201c941a61d440a",
      [FAMILY_IDS.Pandas]: "0x12166e8ab10d66f1f1d01cbb6ed0d2246f990d8e",
      [FAMILY_IDS.Monkeys]: "0xe0f2a7ce7b520ef38594de6eab6e088e249b7036",
      [FAMILY_IDS.Frogs]: "0xf420d2543dFA7f1629dDFC0e66E7B329A13C34FB",
    }
