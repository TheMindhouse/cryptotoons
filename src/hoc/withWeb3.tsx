import * as React from "react"
import getComponentDisplayName from "../helpers/getComponentDisplayName"
import { Web3Context } from "../stores/Web3Provider"
import type { Web3StoreType } from "../types/Web3StoreType"

const withWeb3 = (WrappedComponent: React.ComponentType<any>) => {
  class withWeb3 extends React.Component<{}> {
    render() {
      return (
        <Web3Context.Consumer>
          {(web3Store?: Web3StoreType) =>
            web3Store ? (
              <WrappedComponent {...this.props} web3Store={web3Store} />
            ) : null
          }
        </Web3Context.Consumer>
      )
    }
  }

  withWeb3.displayName = `withWeb3(${getComponentDisplayName(
    WrappedComponent
  )})`

  return withWeb3
}

export default withWeb3
