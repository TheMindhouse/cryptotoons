// @flow
import * as React from "react"
import "./styles/ToonCard.css"
import { ToonImageCore } from "../../hoc/renderProps/ToonImageCore"
import { ToonDetails } from "../../models/ToonDetails"
import { ToonAuction } from "../../models/web3/ToonAuction"
import { ToonAuctionCore } from "../../hoc/renderProps/ToonAuctionCore"
import { ForSaleBadge } from "../Small/ForSaleBadge"
import { Icon } from "antd"
import { MyToonBadge } from "../Small/MyToonBadge"
import { ToonCardPlaceholder } from "./ToonCardPlaceholder"

type ToonCardProps = {
  toonDetails: ?ToonDetails,
}

class ToonCard extends React.PureComponent<ToonCardProps> {
  static defaultProps = {}

  render() {
    const { toonDetails } = this.props

    if (!toonDetails) return <ToonCardPlaceholder />

    const { familyId, toonId, name } = toonDetails

    return (
      <div className="ToonCard">
        <ToonAuctionCore
          familyId={familyId}
          toonId={toonId}
          render={(toonAuction: ?ToonAuction) => (
            <div>
              {toonAuction && (
                <div>
                  <div className="ToonCard__ForSaleBadge">
                    <ForSaleBadge price={toonAuction.currentPrice} />
                  </div>
                </div>
              )}
              <div className="ToonCard__MyToonBadge">
                <MyToonBadge
                  toonDetails={toonDetails}
                  toonAuction={toonAuction}
                />
              </div>
            </div>
          )}
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
              <div className="ToonCard__image ToonCard__image--placeholder">
                <Icon type="loading" />
              </div>
            )
          }
        />
        <p className="ToonCard__name">{name}</p>
      </div>
    )
  }
}

export { ToonCard }
