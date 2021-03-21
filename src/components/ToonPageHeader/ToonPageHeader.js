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
import { PendingTransactionInfo } from "../Small/PendingTransactionInfo"
import { TRANSACTION_TYPE } from "../../models/Transaction"
import { MyToonBadge } from "../Small/MyToonBadge"

type ToonPageHeaderProps = {
  toonDetails: ToonDetails,
  toonAuction: ?ToonAuction,
}

class ToonPageHeader extends React.PureComponent<ToonPageHeaderProps> {
  static defaultProps = {}

  render() {
    const { toonDetails, toonAuction } = this.props
    const { name, familyId, toonId, birthTime } = toonDetails

    const transactionTypes = [
      TRANSACTION_TYPE.buyToon,
      TRANSACTION_TYPE.transferToon,
      TRANSACTION_TYPE.cancelAuction,
      TRANSACTION_TYPE.createAuction,
    ]

    return (
      <div>
        <div className="ToonPageHeader containerWrapper containerWrapper--gray">
          <div className="container relative">
            {toonAuction && (
              <div className="ToonPageHeader__ForSaleBadge">
                <ForSaleBadge price={toonAuction.currentPrice} />
              </div>
            )}

            <div className="ToonPageHeader__MyToonBadge">
              <MyToonBadge
                toonDetails={toonDetails}
                toonAuction={toonAuction}
              />
            </div>

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
                    text={<Moment format="MMMM Do, YYYY">{birthTime}</Moment>}
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
                      toonAuction !== undefined && (
                        <AccountAddressLink
                          address={
                            toonAuction ? toonAuction.seller : toonDetails.owner
                          }
                        />
                      )
                    }
                  />
                </Row>
              </Col>
            </Row>
          </div>
        </div>
        <div className="container container--small">
          <PendingTransactionInfo
            type={transactionTypes}
            toon={toonDetails}
            style={{ marginBottom: 10 }}
          />
        </div>
      </div>
    )
  }
}

export { ToonPageHeader }
