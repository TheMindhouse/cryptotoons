// @flow
import * as React from "react"
import "./styles/ToonFamilyCollection.css"
import { Col, Row } from "antd"
import withWeb3 from "../../hoc/withWeb3"
import type { Web3ProviderState } from "../../stores/Web3Provider"
import { ContractFacade } from "../../facades/ContractFacade"
import { URLHelper } from "../../helpers/URLhelper"
import { Logger } from "../../helpers/Logger"

type Props = {
  familyId: number,
  web3Store?: Web3ProviderState,
}

type State = {
  toonsCount: number,
}

class ToonFamilyCollection extends React.PureComponent<Props, State> {
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
    return (
      <Row gutter={30}>
        <Col span={8}>{this.state.toonsCount}</Col>
      </Row>
    )
  }
}

ToonFamilyCollection = withWeb3(ToonFamilyCollection)
export { ToonFamilyCollection }
