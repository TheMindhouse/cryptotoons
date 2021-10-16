import * as React from "react"
import type { Web3StoreType } from "../../types/Web3StoreType"
import withWeb3 from "../../hoc/withWeb3"
import { ToonContractFacade } from "../../facades/ToonContractFacade"
import * as pluralize from "pluralize"
import type { ToonWithFamilyIds } from "../../types/ToonTypes"
import { ToonsGrid } from "../ToonsGrid/ToonsGrid"
import { Icon, Pagination, Row, Spin } from "antd"
import { CONFIG } from "../../config"
import {
  FAMILY_NAMES,
  FAMILY_NAMES_SINGULAR,
} from "../../constants/toonFamilies"
import "./styles/ToonsOwned.css"

type ToonsOwnedProps = {
  accountAddress: string,
  pageId: number,
  onChangePage: (number) => void,
  web3Store: Web3StoreType,
}

type ToonsOwnedState = {
  ownedToons: Array<ToonWithFamilyIds>,
  toonCountsByContract: Array<number>,
  isLoading: boolean,
  familyIdFilter?: number,
}

const initialState: ToonsOwnedState = {
  ownedToons: [],
  toonCountsByContract: [],
  isLoading: true,
  familyIdFilter: null,
}

class ToonsOwned extends React.PureComponent<ToonsOwnedProps, ToonsOwnedState> {
  static defaultProps = {}

  state = initialState

  componentDidMount() {
    this.getOwnedToonsCount()
  }

  componentDidUpdate(prevProps: ToonsOwnedProps) {
    if (prevProps.accountAddress !== this.props.accountAddress) {
      this.setState(initialState)
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
    Promise.all(pToonsCount).then((toonCountsByContract: Array<number>) => {
      this.getOwnedToons(toonCountsByContract)
      this.setState({ toonCountsByContract })
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
    Promise.all(pOwnedToons).then((_ownedToons: Array<ToonWithFamilyIds>) => {
      // Sort toons by families and ids
      const ownedToons = _ownedToons.sort(
        (a: ToonWithFamilyIds, b: ToonWithFamilyIds) =>
          a.familyId - b.familyId || a.toonId - b.toonId
      )
      this.setState({ ownedToons, isLoading: false })
    })
  }

  filterToons = (_familyId?: number) => {
    const { familyIdFilter } = this.state
    const familyId = _familyId === familyIdFilter ? null : _familyId
    this.setState({ familyIdFilter: familyId })
    this.props.onChangePage(1)
  }

  getFilteredToons = () => {
    const { ownedToons, familyIdFilter } = this.state
    return familyIdFilter !== null
      ? ownedToons.filter((toon) => toon.familyId === familyIdFilter)
      : ownedToons
  }

  getToonsPerPage = (
    toons: Array<ToonWithFamilyIds>
  ): Array<ToonWithFamilyIds> => {
    const { pageId } = this.props
    const startId = (pageId - 1) * CONFIG.TOONS_PER_PAGE
    const endId = startId + CONFIG.TOONS_PER_PAGE
    return toons.slice(startId, endId)
  }

  render() {
    const { ownedToons, toonCountsByContract, familyIdFilter } = this.state
    const ownedToonsFiltered = this.getFilteredToons()
    const toonsPerPage = this.getToonsPerPage(ownedToonsFiltered)

    if (this.state.isLoading) {
      return (
        <div className="container">
          <Row
            type="flex"
            align="middle"
            justify="center"
            style={{ minHeight: "50vh" }}
          >
            <Spin />
          </Row>
        </div>
      )
    }

    return (
      <div>
        <h2>
          <b>
            {ownedToons.length} {pluralize("Toon", ownedToons.length)}
          </b>
        </h2>

        <div className="ToonsOwned__FamiliesContainer">
          {toonCountsByContract.map(
            (count, familyId) =>
              count === 0 ? null : (
                <h3
                  className={`FamilyFilterItem ${
                    familyIdFilter !== null && familyIdFilter !== familyId
                      ? "FamilyFilterItem--inactive"
                      : ""
                  }`}
                  onClick={() => this.filterToons(familyId)}
                  key={familyId}
                >
                  <b>{count}</b>
                  <div className="FamilyFilterItem__Name">
                    {count === 1
                      ? FAMILY_NAMES_SINGULAR[familyId]
                      : FAMILY_NAMES[familyId]}
                  </div>
                  {familyIdFilter === familyId && (
                    <Icon
                      type="close-circle"
                      className="FamilyFilterItem__Cross"
                    />
                  )}
                </h3>
              )
          )}
        </div>

        <ToonsGrid toons={toonsPerPage} />

        <Row type="flex" justify="center" className="ToonsOwned__Pagination">
          <Pagination
            current={this.props.pageId}
            pageSize={CONFIG.TOONS_PER_PAGE}
            total={ownedToonsFiltered.length}
            onChange={this.props.onChangePage}
          />
        </Row>
      </div>
    )
  }
}

ToonsOwned = withWeb3(ToonsOwned)
export { ToonsOwned }
