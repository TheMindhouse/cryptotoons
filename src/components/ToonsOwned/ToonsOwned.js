// @flow
import * as React from "react"
import type { Web3StoreType } from "../../types/Web3StoreType"
import withWeb3 from "../../hoc/withWeb3"
import { ToonContractFacade } from "../../facades/ToonContractFacade"
import * as pluralize from "pluralize"
import type { ToonWithFamilyIds } from "../../types/ToonTypes"
import { ToonsGrid } from "../ToonsGrid/ToonsGrid"

type ToonsOwnedProps = {
  accountAddress: string,
  web3Store: Web3StoreType,
}

type ToonsOwnedState = {
  ownedToonsCount: ?number,
  ownedToons: Array<ToonWithFamilyIds>,
}

class ToonsOwned extends React.PureComponent<ToonsOwnedProps, ToonsOwnedState> {
  static defaultProps = {}

  state = {
    ownedToonsCount: null,
    ownedToons: [],
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
    Object.keys(this.props.web3Store.Contracts).map(
      (key: number): ToonContractFacade => this.props.web3Store.Contracts[key]
    )

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
      this.getOwnedToons(toonCounts)
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
   * @param toonCountsByContract - number of owned toons from each family.
   * Indexes of these values correspond to the values in web3Store.Contracts, eg.
   * toonCountsByContract[0] is number of toons from the family in the first contract
   */
  getOwnedToons = (toonCountsByContract: Array<number>) => {
    const { accountAddress } = this.props
    const toonContracts: Array<ToonContractFacade> = this.getToonContracts()

    // This array will hold all promises which resolve to toon id with its family id
    const pOwnedToons: Array<Promise<ToonWithFamilyIds>> = []

    // For each contract get details for all the toons owned by the user
    toonCountsByContract.forEach(
      (toonCountsForFamily: number, contractIndex: number) => {
        // For each toon from 0 to toonCountsForFamily we need to get its Toon ID
        for (let toonIndex = 0; toonIndex < toonCountsForFamily; toonIndex++) {
          const pOwnedToon: Promise<ToonWithFamilyIds> = toonContracts[
            contractIndex
          ].getToonIdByOwnershipIndex(accountAddress, toonIndex)
          pOwnedToons.push(pOwnedToon)
        }
      }
    )

    // Wait until all promises are resolved and then update state
    Promise.all(pOwnedToons).then((ownedToons: Array<ToonWithFamilyIds>) => {
      this.setState({ ownedToons })
    })
  }

  render() {
    const { ownedToonsCount, ownedToons } = this.state
    const ownedToonsSorted = ownedToons.sort(
      (a: ToonWithFamilyIds, b: ToonWithFamilyIds) =>
        a.familyId - b.familyId || a.toonId - b.toonId
    )
    return (
      <div>
        <h2>
          <b>
            {ownedToonsCount} {pluralize("Toon", ownedToonsCount)} Owned
          </b>
        </h2>
        <ToonsGrid toons={ownedToonsSorted} />
      </div>
    )
  }
}

ToonsOwned = withWeb3(ToonsOwned)
export { ToonsOwned }
