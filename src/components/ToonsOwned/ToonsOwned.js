// @flow
import * as React from "react"
import type { Web3StoreType } from "../../types/Web3StoreType"
import withWeb3 from "../../hoc/withWeb3"
import { ToonContractFacade } from "../../facades/ToonContractFacade"
import * as pluralize from "pluralize"

type ToonsOwnedProps = {
  accountAddress: string,
  web3Store: Web3StoreType,
}

type ToonsOwnedState = {
  ownedToonsCount: ?number,
}

class ToonsOwned extends React.PureComponent<ToonsOwnedProps, ToonsOwnedState> {
  static defaultProps = {}

  state = {
    ownedToonsCount: null,
  }

  componentDidMount() {
    this.getOwnedToonsCount()
  }

  componentDidUpdate(prevProps: ToonsOwnedProps) {
    if (prevProps.accountAddress !== this.props.accountAddress) {
      this.getOwnedToonsCount()
    }
  }

  getToonContracts = (): Array<ToonContractFacade> =>
    Object.values(this.props.web3Store.Contracts)

  getOwnedToonsCount = () => {
    const { accountAddress } = this.props
    const toonContracts: Array<ToonContractFacade> = this.getToonContracts()
    // Count number of owned toons from each family
    const pToonsCount: Array<Promise<number>> = toonContracts.map(
      (toonContract: ToonContractFacade) =>
        toonContract.getOwnedToonsCount(accountAddress)
    )
    // Sum all owned toons
    Promise.all(pToonsCount).then((toonCounts: Array<number>) => {
      const ownedToonsCount = toonCounts.reduce(
        (a: number, b: number) => a + b,
        0
      )
      this.setState({ ownedToonsCount })
    })
  }

  /**
   * Get detailed info about owned toons.
   *
   * @param toonCounts - number of owned toons for each family.
   * These values are sorted the same way as corresponding contracts, eg.
   * toonCounts[0] is number of toons from family
   * Object.values(web3Store.Contracts)[0]
   */
  getOwnedToons = (toonCounts: Array<number>) => {
    const { accountAddress } = this.props
    const toonContracts: Array<ToonContractFacade> = this.getToonContracts()
    const pToonIds = toonCounts.map(
      (toonCountsForFamily: number, contractIndex: number) => {
        // For each toon from 0 to toonCountsForFamily we need to get its Toon ID
        return Array(toonCountsForFamily).map((val: any, toonIndex: number) =>
          toonContracts[contractIndex].getToonIdByOwnershipIndex(
            accountAddress,
            toonIndex
          )
        )
      }
    )
  }

  render() {
    const { ownedToonsCount } = this.state
    return (
      <div>
        <h2>
          <b>
            {ownedToonsCount} {pluralize("Toon", ownedToonsCount)} Owned
          </b>
        </h2>
        <div className="ct-chart" style={{ height: 500 }} />
      </div>
    )
  }
}

ToonsOwned = withWeb3(ToonsOwned)
export { ToonsOwned }
