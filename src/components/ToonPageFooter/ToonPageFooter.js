// @flow
import * as React from "react"
import "./styles/ToonPageFooter.css"
import { ToonDetails } from "../../models/ToonDetails"
import { TOON_CONTRACT_ADDRESSES } from "../../constants/contracts"
import openseaLogo from "../../assets/images/opensea-logo.png"

type ToonPageFooterProps = {
  toonDetails: ToonDetails,
}

class ToonPageFooter extends React.PureComponent<ToonPageFooterProps> {
  static defaultProps = {}

  render() {
    const { toonDetails } = this.props
    const { familyId, toonId } = toonDetails

    return (
      <div>
        <div className="ToonPageFooter containerWrapper">
          <div className="container relative">
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

export { ToonPageFooter }
