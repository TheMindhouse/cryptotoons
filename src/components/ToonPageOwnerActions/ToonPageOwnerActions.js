// @flow
import * as React from "react"
import withWeb3 from "../../hoc/withWeb3"
import type { Web3StoreType } from "../../types/Web3StoreType"
import { ToonDetails } from "../../models/ToonDetails"
import { ToonAuction } from "../../models/web3/ToonAuction"
import { CreateToonAuction } from "../ToonPageAuction/CreateToonAuction"
import { EndToonAuction } from "../ToonPageAuction/EndToonAuction"

type ToonPageOwnerActionsProps = {
  toonDetails: ToonDetails,
  toonAuction: ?ToonAuction,
  web3Store: Web3StoreType,
}

class ToonPageOwnerActions extends React.PureComponent<
  ToonPageOwnerActionsProps
> {
  static defaultProps = {}

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

  render() {
    if (!this.isUserToonOwner()) {
      return null
    }

    const { toonDetails, toonAuction } = this.props

    return (
      <div className="container">
        {toonAuction ? (
          <EndToonAuction toonDetails={toonDetails} />
        ) : (
          <CreateToonAuction toonDetails={toonDetails} />
        )}
      </div>
    )
  }
}

ToonPageOwnerActions = withWeb3(ToonPageOwnerActions)
export { ToonPageOwnerActions }
