import React from "react"
import "./styles/Stat.css"
import EthToUsd from "../EthToUsd/EthToUsd"

type Props = {
  title: string,
  text?: string | number,
  value?: number,
}

const Stat = ({ title, value, text }: Props) => {
  return (
    <div className="Stat">
      <div className="Stat__Title">{title}</div>
      {text && <div className="Stat__Value">{text}</div>}
      {value && (
        <>
          <div className="Stat__Value"><EthToUsd eth={value} /></div>
          <div className="Stat__Value--Secondary">
            {value} <small>ETH</small>
          </div>
        </>
      )}
    </div>
  )
}

export default Stat
