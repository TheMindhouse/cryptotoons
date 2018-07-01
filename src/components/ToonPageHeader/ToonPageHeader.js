// @flow
import * as React from "react"
import { ToonImageCore } from "../../hoc/renderProps/ToonImageCore"
import "./styles/ToonPageHeader.css"
import { FAMILY_NAMES_SINGULAR } from "../../constants/toonFamilies"
import { CreateToonAuction } from "../ToonActions/CreateToonAuction"
import { Col, Row } from "antd"
import { CurrentToonPrice } from "../ToonActions/CurrentToonPrice"
import { ToonDetails } from "../../models/ToonDetails"

type ToonPageHeaderProps = {
  toonDetails: ToonDetails,
}

class ToonPageHeader extends React.PureComponent<ToonPageHeaderProps> {
  static defaultProps = {}

  getFamilyName = (): string => {
    const { familyId } = this.props.toonDetails
    if (familyId > -1) {
      return FAMILY_NAMES_SINGULAR[familyId]
    }
    return ""
  }

  render() {
    const { toonDetails } = this.props
    const { familyId, toonId, genes, owner } = toonDetails
    return (
      <div>
        <div className="ToonPageHeader containerWrapper containerWrapper--gray">
          <div className="container">
            <ToonImageCore
              familyId={familyId}
              toonId={toonId}
              genes={genes}
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
        <div className="containerWrapper">
          <div className="container">
            <Row type="flex" align="middle">
              <Col span={16}>
                <h1 style={{ margin: 0 }}>
                  <b>
                    {this.getFamilyName()} #{toonId}
                  </b>
                </h1>
              </Col>
              <Col span={8} className="text-right">
                <CreateToonAuction toonDetails={toonDetails} />
                <CurrentToonPrice familyId={familyId} toonId={toonId} />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

export { ToonPageHeader }
