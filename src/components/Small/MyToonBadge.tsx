import * as React from "react"
import myToonBadgeImage from "../../assets/images/my-toon-badge.svg"
import genesisBadgeImage from "../../assets/images/genesis-toon-badge.svg"
import withWeb3 from "../../hoc/withWeb3"
import type { Web3StoreType } from "../../types/Web3StoreType"
import { ToonAuction } from "../../models/web3/ToonAuction"
import { ToonDetails } from "../../models/ToonDetails"
import { equalStrings } from "../../helpers/strings"
import { CONTRACT_OWNER_ADDRESS } from "../../constants/contracts"

type MyToonBadgeProps = {
  toonDetails: ToonDetails,
  toonAuction?: ToonAuction,
  web3Store: Web3StoreType,
}

class MyToonBadge extends React.PureComponent<MyToonBadgeProps> {
  static defaultProps = {}

  getToonOwner = (): string => {
    const { toonDetails, toonAuction } = this.props
    return toonAuction ? toonAuction.seller : toonDetails.owner
  }

  isUserToonOwner = (): boolean => {
    const { web3Store } = this.props
    const { account } = web3Store
    if (!account) return false

    const toonOwner = this.getToonOwner()
    return equalStrings(toonOwner, account)
  }

  isCreatorsToonOwner = (): boolean => {
    const toonOwner = this.getToonOwner()
    return equalStrings(toonOwner, CONTRACT_OWNER_ADDRESS)
  }

  render() {
    const isOwnerCreators = this.isCreatorsToonOwner()
    const isOwnerUser = this.isUserToonOwner()

    if (isOwnerCreators) {
      return <img src={genesisBadgeImage} alt="Genesis Toon!" />
    }

    if (isOwnerUser) {
      return <img src={myToonBadgeImage} alt="My Toon!" />
    }

    return null
  }
}

MyToonBadge = withWeb3(MyToonBadge)
export { MyToonBadge }
