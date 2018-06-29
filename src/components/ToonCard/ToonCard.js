// @flow
import * as React from "react"
import "./styles/ToonCard.css"
import type { ToonDetailsType } from "../../types/ToonDetailsType"

type ToonCardProps = {
  toonDetails: ToonDetailsType,
}

class ToonCard extends React.PureComponent<ToonCardProps> {
  static defaultProps = {}

  render() {
    const { toonDetails } = this.props
    return (
      <div className="ToonCard">
        {toonDetails.image ? (
          <div
            className="ToonCard__image"
            style={{
              backgroundImage: `url(${toonDetails.image})`,
            }}
          />
        ) : (
          <div className="ToonCard__image" />
        )}
        <p className="ToonCard__name">{toonDetails.name}</p>
      </div>
    )
  }
}

export { ToonCard }
