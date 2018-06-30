// @flow
import * as React from "react"
import { ToonDetailsType } from "../../types/ToonDetailsType"
import { ToonImageCore } from "../../hoc/renderProps/ToonImageCore"
import "./styles/ToonPageHeader.css"

type ToonPageHeaderProps = {
  toonDetails: ToonDetailsType,
}

class ToonPageHeader extends React.PureComponent<ToonPageHeaderProps> {
  static defaultProps = {}

  render() {
    const { toonDetails } = this.props
    return (
      <div className="ToonPageHeader containerWrapper containerWrapper--gray">
        <div className="container">
          <ToonImageCore
            familyId={toonDetails.familyId}
            toonId={toonDetails.toonId}
            genes={toonDetails.genes}
            render={(imageUrl: ?string) =>
              imageUrl ? (
                <div
                  className="ToonPageHeader__Image"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                  }}
                />
              ) : (
                <div className="ToonPageHeader__Image ToonPageHeader__Image--placeholder" />
              )
            }
          />
        </div>
      </div>
    )
  }
}

export { ToonPageHeader }
