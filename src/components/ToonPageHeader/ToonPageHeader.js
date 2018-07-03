// @flow
import * as React from "react"
import { ToonImageCore } from "../../hoc/renderProps/ToonImageCore"
import "./styles/ToonPageHeader.css"
import { Col, Row } from "antd"
import { ToonDetails } from "../../models/ToonDetails"
import { URLHelper } from "../../helpers/URLhelper"
import { Link } from "react-router-dom"
import Moment from "react-moment"
import { getFamilyName } from "../../helpers/familyNamesHelper"
import { AUCTION_CONTRACT_ADDRESS } from "../../constants/contracts"
import { ToonAuction } from "../../models/web3/ToonAuction"

type ToonPageHeaderProps = {
  toonDetails: ToonDetails,
  toonAuction: ?ToonAuction,
}

class ToonPageHeader extends React.PureComponent<ToonPageHeaderProps> {
  static defaultProps = {}

  render() {
    const { toonDetails } = this.props
    const { name, familyId, toonId, genes, owner, birthTime } = toonDetails
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
                <h1>
                  <b>{name}</b>
                </h1>
                <p>
                  Born <Moment format="YYYY/MM/DD">{birthTime}</Moment> &bull;{" "}
                  Family:{" "}
                  <Link to={URLHelper.toonFamily(familyId)}>
                    {getFamilyName(familyId)}
                  </Link>
                </p>
              </Col>
              <Col span={8} className="text-right">
                <p>
                  <b>Owner:</b>
                  <br />
                  {owner === AUCTION_CONTRACT_ADDRESS ? "On Auction" : owner}
                </p>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

export { ToonPageHeader }
