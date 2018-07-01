// @flow
import * as React from "react"
import "./styles/ToonCard.css"
import { ToonImageCore } from "../../hoc/renderProps/ToonImageCore"
import { ToonDetails } from "../../models/ToonDetails"

type ToonCardProps = {
  toonDetails: ToonDetails,
}

class ToonCard extends React.PureComponent<ToonCardProps> {
  static defaultProps = {}

  render() {
    const { toonDetails } = this.props
    return (
      <div className="ToonCard">
        <ToonImageCore
          familyId={toonDetails.familyId}
          toonId={toonDetails.toonId}
          genes={toonDetails.genes}
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
        <p className="ToonCard__name">{toonDetails.name}</p>
      </div>
    )
  }
}

export { ToonCard }
