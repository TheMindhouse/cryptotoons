import * as React from "react"
import { ToonAuction } from "../../../models/web3/ToonAuction"
import { ToonDetails } from "../../../models/ToonDetails"
import { Button, Row } from "antd"
import { EndToonAuction } from "../EndToonAuction"

type ToonOwnerActionButtonsProps = {
  toonAuction?: ToonAuction,
  toonDetails: ToonDetails,
  switchToNamingView: () => void,
  switchToCreateAuctionView: () => void,
  switchToTransferView: () => void,
}

class ToonOwnerActionButtons extends React.PureComponent<
  ToonOwnerActionButtonsProps
> {
  static defaultProps = {}

  render() {
    const {
      toonDetails,
      toonAuction,
      switchToNamingView,
      switchToCreateAuctionView,
      switchToTransferView,
    } = this.props
    return (
      <Row type="flex" align="middle" justify="center">
        <div style={{ margin: 10 }}>
          <Button
            type="primary"
            size="large"
            onClick={switchToNamingView}
            disabled={!!toonAuction}
            title={
              toonAuction ? "You need to end the auction first." : undefined
            }
          >
            Name Your Toon 🎉
          </Button>
        </div>
        <div style={{ margin: 10 }}>
          {toonAuction ? (
            <EndToonAuction toonDetails={toonDetails} />
          ) : (
            <Button
              type="default"
              size="large"
              icon="tag-o"
              onClick={switchToCreateAuctionView}
            >
              Sell Toon
            </Button>
          )}
        </div>
        <div style={{ margin: 10 }}>
          <Button
            type="default"
            size="large"
            icon="gift"
            onClick={switchToTransferView}
            disabled={!!toonAuction}
            title={
              toonAuction ? "You need to end the auction first." : undefined
            }
          >
            Gift Toon
          </Button>
        </div>
      </Row>
    )
  }
}
export { ToonOwnerActionButtons }
