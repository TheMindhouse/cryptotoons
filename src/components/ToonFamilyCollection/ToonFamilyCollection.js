// @flow
import * as React from "react"
import "./styles/ToonFamilyCollection.css"
import withWeb3 from "../../hoc/withWeb3"
import { ToonContractFacade } from "../../facades/ToonContractFacade"
import { Logger } from "../../helpers/Logger"
import type { Web3StoreType } from "../../types/Web3StoreType"
import { ToonsGrid } from "../ToonsGrid/ToonsGrid"
import type { ToonWithFamilyIds } from "../../types/ToonTypes"

type ToonFamilyCollectionProps = {
  familyId: number,
  web3Store: Web3StoreType,
}

type ToonFamilyCollectionState = {
  toonsCount: number,
}

class ToonFamilyCollection extends React.PureComponent<
  ToonFamilyCollectionProps,
  ToonFamilyCollectionState
> {
  static defaultProps = {}

  state = {
    toonsCount: 0,
  }

  componentDidMount() {
    this.getToonsCount()
      .then((toonsCount: number) => this.setState({ toonsCount }))
      .then()
  }

  componentDidUpdate() {
    this.getToonsCount().then((toonsCount: number) =>
      this.setState({ toonsCount })
    )
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

  getToons = (toonsCount: number): Array<ToonWithFamilyIds> => {
    const { familyId } = this.props
    return Array.from(Array(toonsCount).keys()).map(
      (toonId: number): ToonWithFamilyIds => ({
        toonId,
        familyId,
      })
    )
  }

  render() {
    const toons = this.getToons(this.state.toonsCount)

    return <ToonsGrid toons={toons} />
  }
}

ToonFamilyCollection = withWeb3(ToonFamilyCollection)
export { ToonFamilyCollection }
