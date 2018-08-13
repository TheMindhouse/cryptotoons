// @flow
import * as React from "react"
import "./styles/ToonFamilyCollection.css"
import withWeb3 from "../../hoc/withWeb3"
import { ToonContractFacade } from "../../facades/ToonContractFacade"
import { Logger } from "../../helpers/Logger"
import type { Web3StoreType } from "../../types/Web3StoreType"
import { ToonsGrid } from "../ToonsGrid/ToonsGrid"
import type { ToonWithFamilyIds } from "../../types/ToonTypes"
import { getFamilyName } from "../../helpers/familyNamesHelper"
import { Pagination, Row, Spin } from "antd"
import { CONFIG } from "../../config"

type ToonFamilyCollectionProps = {
  familyId: number,
  pageId: number,
  onChangePage: (number) => void,
  web3Store: Web3StoreType,
}

type ToonFamilyCollectionState = {
  toonsCount: number,
  isLoading: boolean,
}

class ToonFamilyCollection extends React.PureComponent<
  ToonFamilyCollectionProps,
  ToonFamilyCollectionState
> {
  static defaultProps = {}

  state = {
    toonsCount: 0,
    isLoading: true,
  }

  componentDidMount() {
    this.getToonsCount().then((toonsCount: number) =>
      this.setState({ toonsCount, isLoading: false })
    )
  }

  componentDidUpdate(prevProps: ToonFamilyCollectionProps) {
    if (prevProps.familyId !== this.props.familyId) {
      this.setState({ isLoading: true })
      this.getToonsCount().then((toonsCount: number) =>
        this.setState({ toonsCount, isLoading: false })
      )
    }
  }

  /**
   * Get total number of toons from given family
   * @returns {Promise<number>}
   */
  getToonsCount = (): Promise<number> => {
    const { familyId, web3Store } = this.props
    const toonContract: ?ToonContractFacade = web3Store.Contracts[familyId]
    if (!toonContract) {
      return Promise.resolve(0)
    }

    Logger.log("getToonsCount for family: ", familyId, web3Store)

    return toonContract.getTotalToonsCount()
  }

  getToons = (): Array<ToonWithFamilyIds> => {
    const { toonsCount } = this.state
    const { familyId, pageId } = this.props
    const startId = (pageId - 1) * CONFIG.TOONS_PER_PAGE
    const endId = startId + CONFIG.TOONS_PER_PAGE
    return Array.from(Array(toonsCount).keys())
      .reverse() // Show toons with the highest id (newest) first
      .slice(startId, endId)
      .map(
        (toonId: number): ToonWithFamilyIds => ({
          toonId,
          familyId,
        })
      )
  }

  render() {
    const totalToonsCount = this.state.toonsCount
    const toons = this.getToons()

    if (this.state.isLoading) {
      return (
        <div className="containerWrapper containerWrapper--gray">
          <div className="container">
            <h1>
              <b>{getFamilyName(this.props.familyId)}</b>
            </h1>
            <Row
              type="flex"
              align="middle"
              justify="center"
              style={{ minHeight: "50vh" }}
            >
              <Spin />
            </Row>
          </div>
        </div>
      )
    }

    return (
      <div className="containerWrapper containerWrapper--gray">
        <div className="container">
          <h1>
            <b>
              {totalToonsCount} {getFamilyName(this.props.familyId)}
            </b>
          </h1>
          <ToonsGrid toons={toons} />
          <Row type="flex" justify="center" style={{ marginTop: 20 }}>
            <Pagination
              current={this.props.pageId}
              pageSize={CONFIG.TOONS_PER_PAGE}
              total={totalToonsCount}
              onChange={this.props.onChangePage}
            />
          </Row>
        </div>
      </div>
    )
  }
}

ToonFamilyCollection = withWeb3(ToonFamilyCollection)
export { ToonFamilyCollection }
