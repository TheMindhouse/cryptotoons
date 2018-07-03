// @flow
import * as React from "react"
import withWeb3 from "../withWeb3"
import { ToonContractFacade } from "../../facades/ToonContractFacade"
import { ToonInfo } from "../../models/web3/ToonInfo"
import { ToonDetails } from "../../models/ToonDetails"
import type { Web3StoreType } from "../../types/Web3StoreType"

type Props = {
  familyId: number,
  toonId: number,
  render: (ToonDetails) => ?React.Node,
  web3Store: Web3StoreType,
}

type State = {
  toonDetails?: ToonDetails,
}

class ToonDetailsCore extends React.PureComponent<Props, State> {
  static defaultProps = {}

  state = {}

  componentDidMount() {
    this.getToon()
  }

  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.familyId !== this.props.familyId ||
      prevProps.toonId !== this.props.toonId ||
      prevProps.web3Store !== this.props.web3Store
    ) {
      this.getToon()
    }
  }

  getToon = () => {
    this.getToonInfo().then((toonInfo: ToonInfo) => {
      const toonDetails = new ToonDetails({
        name: `#${this.props.toonId}`,
        toonId: this.props.toonId,
        familyId: this.props.familyId,
        birthTime: toonInfo.birthTime,
        owner: toonInfo.owner,
        genes: toonInfo.genes,
      })
      this.setState({ toonDetails })
    })
  }

  getToonInfo = (): Promise<ToonInfo> => {
    const { familyId, toonId, web3Store } = this.props
    const toonContract: ?ToonContractFacade = web3Store.Contracts[familyId]
    if (!toonContract) {
      return Promise.reject()
    }

    return toonContract.getToonInfo(toonId)
  }

  render() {
    const { toonDetails } = this.state
    return toonDetails ? this.props.render(toonDetails) : null
  }
}

ToonDetailsCore = withWeb3(ToonDetailsCore)
export { ToonDetailsCore }
