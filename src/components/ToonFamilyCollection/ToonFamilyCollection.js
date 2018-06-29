// @flow
import * as React from "react"
import "./styles/ToonFamilyCollection.css"
import { Col, Row } from "antd"
import withWeb3 from "../../hoc/withWeb3"
import type { Web3ProviderState } from "../../stores/Web3Provider"
import { ContractFacade } from "../../facades/ContractFacade"
import { Logger } from "../../helpers/Logger"
import { ToonCard } from "../ToonCard/ToonCard"
import { ToonDetailsCore } from "../../hoc/renderProps/ToonDetailsCore"
import { ToonDetailsType } from "../../types/ToonDetailsType"
import { URLHelper } from "../../helpers/URLhelper"
import { Link } from "react-router-dom"

type ToonFamilyCollectionProps = {
  familyId: number,
  web3Store?: Web3ProviderState,
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

    if (!web3Store || !web3Store.Contracts) {
      return Promise.resolve(0)
    }

    const toonContract: ?ContractFacade = web3Store.Contracts[familyId]
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
          <Col span={8} key={toonId}>
            <ToonDetailsCore
              familyId={familyId}
              toonId={toonId}
              render={(toonDetails: ToonDetailsType) => (
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
