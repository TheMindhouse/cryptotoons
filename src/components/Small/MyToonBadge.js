// @flow
import * as React from "react"
import myToonBadgeImage from "../../assets/images/my-toon-badge.svg"
import withWeb3 from "../../hoc/withWeb3"
import type { Web3StoreType } from "../../types/Web3StoreType"
import { ToonAuction } from "../../models/web3/ToonAuction"
import { ToonDetails } from "../../models/ToonDetails"

type MyToonBadgeProps = {
  toonDetails: ToonDetails,
  toonAuction: ?ToonAuction,
  web3Store: Web3StoreType,
}

class MyToonBadge extends React.PureComponent<MyToonBadgeProps> {
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

    return <img src={myToonBadgeImage} alt="My Toon!" />
  }
}

MyToonBadge = withWeb3(MyToonBadge)
export { MyToonBadge }
