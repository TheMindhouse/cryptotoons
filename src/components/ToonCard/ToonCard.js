// @flow
import * as React from "react"
import "./styles/ToonCard.css"
import { ToonImageCore } from "../../hoc/renderProps/ToonImageCore"
import { ToonDetails } from "../../models/ToonDetails"
import { ToonAuction } from "../../models/web3/ToonAuction"
import { ToonAuctionCore } from "../../hoc/renderProps/ToonAuctionCore"
import { ForSaleBadge } from "../Small/ForSaleBadge"

type ToonCardProps = {
  toonDetails: ToonDetails,
}

class ToonCard extends React.PureComponent<ToonCardProps> {
  static defaultProps = {}

  render() {
    const { familyId, toonId, genes, name } = this.props.toonDetails
    return (
      <div className="ToonCard">
        <ToonAuctionCore
          familyId={familyId}
          toonId={toonId}
          render={(toonAuction: ?ToonAuction) =>
            toonAuction && (
              <div className="ToonCard__ForSaleBadge">
                <ForSaleBadge price={toonAuction.currentPrice} />
              </div>
            )
          }
        />
        <ToonImageCore
          familyId={familyId}
          toonId={toonId}
          render={(imageUrl: ?string) =>
            imageUrl ? (
              <div
                className="ToonCard__image"
                style={{
                  backgroundImage: `url(${imageUrl})`,
                }}
              />
            ) : (
              <div className="ToonCard__image ToonCard__image--placeholder" />
            )
          }
        />
        <p className="ToonCard__name">{name}</p>
      </div>
    )
  }
}

export { ToonCard }
