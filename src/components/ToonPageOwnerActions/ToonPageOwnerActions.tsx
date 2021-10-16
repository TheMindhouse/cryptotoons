import * as React from "react"
import withWeb3 from "../../hoc/withWeb3"
import type { Web3StoreType } from "../../types/Web3StoreType"
import { ToonDetails } from "../../models/ToonDetails"
import { ToonAuction } from "../../models/web3/ToonAuction"
import { CreateToonAuction } from "./views/CreateToonAuction"
import { ToonOwnerActionButtons } from "./views/ToonOwnerActionButtons"
import { TransferToon } from "./views/TransferToon"
import { NameYourToon } from "./views/NameYourToon"

const OWNER_ACTION_VIEWS = {
  BUTTONS: 0,
  CREATE_AUCTION: 1,
  TRANSFER: 2,
  SET_NAME: 3,
}

type ToonPageOwnerActionsProps = {
  toonDetails: ToonDetails,
  toonAuction?: ToonAuction,
  web3Store: Web3StoreType,
}

type ToonPageOwnerActionsState = {
  currentView: number,
}

class ToonPageOwnerActions extends React.PureComponent<
  ToonPageOwnerActionsProps,
  ToonPageOwnerActionsState
> {
  static defaultProps = {}

  state = {
    currentView: OWNER_ACTION_VIEWS.BUTTONS,
  }

  isUserToonOwner = (): boolean => {
    const { web3Store, toonDetails, toonAuction } = this.props
    const { account } = web3Store
    if (!account) {
      return false
    }
    if (toonAuction && toonAuction.seller === account) {
      return true
    }
    return toonDetails.owner === account
  }

  switchView = (view: number) => {
    if (Object.values(OWNER_ACTION_VIEWS).includes(view)) {
      this.setState({
        currentView: view,
      })
    }
  }

  render() {
    if (!this.isUserToonOwner()) {
      return null
    }

    const { toonDetails, toonAuction } = this.props
    const { currentView } = this.state

    return (
      <div className="containerWrapper" style={{ paddingTop: 0 }}>
        <div className="container">
          {currentView === OWNER_ACTION_VIEWS.BUTTONS && (
            <ToonOwnerActionButtons
              toonDetails={toonDetails}
              toonAuction={toonAuction}
              switchToNamingView={() =>
                this.switchView(OWNER_ACTION_VIEWS.SET_NAME)
              }
              switchToCreateAuctionView={() =>
                this.switchView(OWNER_ACTION_VIEWS.CREATE_AUCTION)
              }
              switchToTransferView={() =>
                this.switchView(OWNER_ACTION_VIEWS.TRANSFER)
              }
            />
          )}

          {currentView === OWNER_ACTION_VIEWS.CREATE_AUCTION && (
            <CreateToonAuction
              toonDetails={toonDetails}
              switchToDefaultView={() =>
                this.switchView(OWNER_ACTION_VIEWS.BUTTONS)
              }
            />
          )}

          {currentView === OWNER_ACTION_VIEWS.TRANSFER && (
            <TransferToon
              toonDetails={toonDetails}
              switchToDefaultView={() =>
                this.switchView(OWNER_ACTION_VIEWS.BUTTONS)
              }
            />
          )}

          {currentView === OWNER_ACTION_VIEWS.SET_NAME && (
            <NameYourToon
              toonDetails={toonDetails}
              switchToDefaultView={() =>
                this.switchView(OWNER_ACTION_VIEWS.BUTTONS)
              }
            />
          )}
        </div>
      </div>
    )
  }
}

ToonPageOwnerActions = withWeb3(ToonPageOwnerActions)
export { ToonPageOwnerActions }
