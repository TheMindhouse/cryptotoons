// @flow
import * as React from "react"
import "./styles/ToonPageFooter.css"
import { ToonDetails } from "../../models/ToonDetails"
import { TOON_CONTRACT_ADDRESSES } from "../../constants/contracts"
import openseaLogo from "../../assets/images/opensea-logo.png"
import { ToonAuction } from "../../models/web3/ToonAuction"
import withWeb3 from "../../hoc/withWeb3"
import type { Web3StoreType } from "../../types/Web3StoreType"

type ToonPageFooterProps = {
  toonDetails: ToonDetails,
  toonAuction: ?ToonAuction,
  web3Store: Web3StoreType,
}

class ToonPageFooter extends React.PureComponent<ToonPageFooterProps> {
  static defaultProps = {}

  isUserToonOwner = (): boolean => {
    const { web3Store, toonDetails, toonAuction } = this.props
    const { account } = web3Store
    if (!account) {
      return false
    }
    if (toonAuction && toonAuction.seller === account) {
      return true
    }
    return toonDetails.owner === account
  }

  render() {
    const { toonDetails, toonAuction } = this.props
    const { familyId, toonId } = toonDetails

    const isOwner = this.isUserToonOwner()

    // Not loading and no active auction
    if (toonAuction !== null) return null

    return (
      <div>
        <div className="ToonPageFooter">
          <div className="container relative">
            {!isOwner && (
              <nft-card
                tokenAddress={TOON_CONTRACT_ADDRESSES[familyId]}
                tokenId={toonId}
              />
            )}
            <h3 className="ToonPageFooter__Header">Find this Toon also at:</h3>
            <a
              href={`https://opensea.io/assets/${
                TOON_CONTRACT_ADDRESSES[familyId]
              }/${toonId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={openseaLogo}
                alt="Find this Toon at OpenSea"
                className="ToonPageFooter__OpenSeaLogo"
              />
            </a>
          </div>
        </div>
      </div>
    )
  }
}

ToonPageFooter = withWeb3(ToonPageFooter)
export { ToonPageFooter }
