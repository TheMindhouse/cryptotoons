// @flow
import * as React from "react"
import type { ToonDetailsType } from "../../types/ToonDetailsType"
import withWeb3 from "../withWeb3"
import type { Web3ProviderState } from "../../stores/Web3Provider"
import { ContractFacade } from "../../facades/ContractFacade"
import { ToonInfo } from "../../models/ToonInfo"
import { CONFIG } from "../../config"

type Props = {
  familyId: number,
  toonId: number,
  render: (?ToonDetailsType) => React.Node,
  web3Store?: Web3ProviderState,
}

type State = {
  toonDetails?: ToonDetailsType,
}

class ToonDetailsCore extends React.PureComponent<Props, State> {
  static defaultProps = {}

  state = {}

  componentDidMount() {
    this.getToonInfo().then((toonInfo: ToonInfo) => {
      const toonDetails: ToonDetailsType = {
        name: `#${this.props.toonId}`,
        toonId: this.props.toonId,
        familyId: this.props.familyId,
        birthTime: toonInfo.birthTime,
        owner: toonInfo.owner,
      }
      this.setState({ toonDetails }, () => this.getImageUrl(toonInfo.genes))
    })
  }

  getToonInfo = (): Promise<ToonInfo> => {
    const { familyId, toonId, web3Store } = this.props
    if (!web3Store || !web3Store.Contracts) {
      return Promise.reject()
    }
    const toonContract: ?ContractFacade = web3Store.Contracts[familyId]
    if (!toonContract) {
      return Promise.reject()
    }

    return toonContract.getToonInfo(toonId)
  }

  getImageUrl = (genes: string) => {
    const image: string = `${CONFIG.TOON_IMAGE_BASE_URL}/${
      this.props.familyId
    }/${genes}`
    const toonDetails = {
      ...this.state.toonDetails,
      image,
    }
    this.setState({ toonDetails })
  }

  render() {
    const { toonDetails } = this.state
    return toonDetails ? this.props.render(toonDetails) : null
  }
}

ToonDetailsCore = withWeb3(ToonDetailsCore)
export { ToonDetailsCore }
