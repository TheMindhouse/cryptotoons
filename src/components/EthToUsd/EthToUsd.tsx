import * as React from "react"
import withWeb3 from "../../hoc/withWeb3"
import { Web3StoreType } from "../../types/Web3StoreType"

interface Props {
  eth: number;
  // withWeb3
  web3Store: Web3StoreType;
}

const EthToUsd = ({ eth, web3Store: { ethPrice } }: Props) => {
  if (typeof ethPrice === undefined) {
    return null
  }

  const priceInUSD = ethPrice ? eth * ethPrice : 0

  return <span>${Number(priceInUSD.toFixed(2)).toLocaleString()}</span>
}

export default withWeb3(EthToUsd)
