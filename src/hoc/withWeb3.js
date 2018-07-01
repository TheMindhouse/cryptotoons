import React from "react"
import getComponentDisplayName from "../helpers/getComponentDisplayName"
import { Web3Context } from "../stores/Web3Provider"

const withWeb3 = (WrappedComponent) => {
  class withWeb3 extends React.Component<{}> {
    render() {
      return (
        <Web3Context.Consumer>
          {(web3Store) =>
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
