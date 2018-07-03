// @flow
import * as React from "react"
import "./styles/ToonFamilyCollection.css"
import { Col, Row } from "antd"
import withWeb3 from "../../hoc/withWeb3"
import { ToonContractFacade } from "../../facades/ToonContractFacade"
import { Logger } from "../../helpers/Logger"
import { ToonCard } from "../ToonCard/ToonCard"
import { ToonDetailsCore } from "../../hoc/renderProps/ToonDetailsCore"
import { URLHelper } from "../../helpers/URLhelper"
import { Link } from "react-router-dom"
import { ToonDetails } from "../../models/ToonDetails"
import type { Web3StoreType } from "../../types/Web3StoreType"

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

  render() {
    const { familyId } = this.props
    return (
      <Row gutter={30}>
        {Array.from(Array(this.state.toonsCount).keys()).map((toonId) => (
          <Col span={6} key={toonId} className="ToonFamilyCollection__Toon">
            <ToonDetailsCore
              familyId={familyId}
              toonId={toonId}
              render={(toonDetails: ToonDetails) => (
                <Link to={URLHelper.toon(familyId, toonId)}>
                  <ToonCard toonDetails={toonDetails} />
                </Link>
              )}
            />
          </Col>
        ))}
      </Row>
    )
  }
}

ToonFamilyCollection = withWeb3(ToonFamilyCollection)
export { ToonFamilyCollection }