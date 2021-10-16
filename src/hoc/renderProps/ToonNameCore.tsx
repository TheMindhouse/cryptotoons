import * as React from "react"
import withWeb3 from "../withWeb3"
import type { Web3StoreType } from "../../types/Web3StoreType"
import { NamingContractFacade } from "../../facades/NamingContractFacade"
import { cleanName } from "../../helpers/namingService"
import {ReactNode} from "react";

type State = {
  customName?: string,
  loading: boolean,
}

type Props = {
  familyId: number,
  toonId: number,
  render: (data: State) => ReactNode,
  web3Store: Web3StoreType,
}

class ToonNameCore extends React.PureComponent<Props, State> {
  static defaultProps = {}

  state = {
    loading: true,
  }

  componentDidMount() {
    this.getName()
  }

  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.familyId !== this.props.familyId ||
      prevProps.toonId !== this.props.toonId ||
      prevProps.web3Store !== this.props.web3Store
    ) {
      this.getName()
    }
  }

  getName = async () => {
    const { familyId, toonId, web3Store } = this.props
    const namingContract: NamingContractFacade = web3Store.NamingContract

    this.setState({ loading: true })

    try {
      const _customName = await namingContract.getName(familyId, toonId)
      const customName = cleanName(_customName)
      this.setState({ customName })
    } catch (e) {
      console.error(e)
    }

    this.setState({ loading: false })
  }

  render() {
    return this.props.render(this.state)
  }
}

ToonNameCore = withWeb3(ToonNameCore)
export { ToonNameCore }
