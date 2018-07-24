// @flow
import * as React from "react"
import { ToonImageCore } from "../../hoc/renderProps/ToonImageCore"
import "./styles/ToonPageHeader.css"
import { Col, Icon, Row } from "antd"
import { ToonDetails } from "../../models/ToonDetails"
import { URLHelper } from "../../helpers/URLhelper"
import { Link } from "react-router-dom"
import Moment from "react-moment"
import { getFamilyName } from "../../helpers/familyNamesHelper"
import { ToonAuction } from "../../models/web3/ToonAuction"
import { ForSaleBadge } from "../Small/ForSaleBadge"
import { TextWithLabel } from "../Small/TextWithLabel"
import { AccountAddressLink } from "../Small/AccountAddressLink"

type ToonPageHeaderProps = {
  toonDetails: ToonDetails,
  toonAuction: ?ToonAuction,
}

class ToonPageHeader extends React.PureComponent<ToonPageHeaderProps> {
  static defaultProps = {}

  render() {
    const { toonDetails, toonAuction } = this.props
    const { name, familyId, toonId, genes, birthTime } = toonDetails
    return (
      <div>
        <div className="ToonPageHeader containerWrapper containerWrapper--gray">
          <div className="container">
            {toonAuction && <ForSaleBadge price={toonAuction.currentPrice} />}
            <ToonImageCore
              familyId={familyId}
              toonId={toonId}
              render={(imageUrl: ?string) =>
                imageUrl ? (
                  <div
                    className="ToonPageHeader__Image"
                    style={{
                      backgroundImage: `url(${imageUrl})`,
                    }}
                  />
                ) : (
                  <div className="ToonPageHeader__Image ToonPageHeader__Image--placeholder">
                    <Icon type="loading" style={{ fontSize: 24 }} />
                  </div>
                )
              }
            />
          </div>
        </div>
        <div className="containerWrapper">
          <div className="container">
            <Row type="flex" align="middle">
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <h1 className="ToonPageHeader__Name">
                  <b>{name}</b>
                </h1>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <Row
                  type="flex"
                  align="middle"
                  justify="space-between"
                  className="ToonPageHeader__Info"
                >
                  <TextWithLabel
                    label="Born"
                    text={<Moment format="YYYY/MM/DD">{birthTime}</Moment>}
                  />
                  <TextWithLabel
                    label="Family"
                    text={
                      <Link to={URLHelper.toonFamily(familyId)}>
                        {getFamilyName(familyId)}
                      </Link>
                    }
                  />
                  <TextWithLabel
                    label="Owner"
                    text={
                      <AccountAddressLink
                        address={
                          toonAuction ? toonAuction.seller : toonDetails.owner
                        }
                      />
                    }
                  />
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

export { ToonPageHeader }
