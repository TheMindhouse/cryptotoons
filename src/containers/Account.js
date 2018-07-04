// @flow
import * as React from "react"
import { Alert } from "antd"
import withWeb3 from "../hoc/withWeb3"
import { setDocumentTitle } from "../helpers/utils"
import type { Web3StoreType } from "../types/Web3StoreType"

type AccountProps = {
  match: {
    params: {
      address: string,
    },
  },
  web3Store: Web3StoreType,
}

class Account extends React.PureComponent<AccountProps> {
  static defaultProps = {}

  componentDidMount() {
    setDocumentTitle("Account Details")
  }

  render() {
    const urlAccountAddress = this.props.match.params.address
    return (
      <div>
        <div
          className="containerWrapper containerWrapper--gray"
          style={{ marginBottom: 50 }}
        >
          <div className="container">
            <h1>
              <b>Account Details</b>
            </h1>
            <h2 className="text-wrap">{urlAccountAddress}</h2>
          </div>
        </div>

        <div className="containerWrapper">
          <div className="container">
            {urlAccountAddress === this.props.account && (
              <Alert type="success" message="This is your account" showIcon />
            )}
          </div>
        </div>
      </div>
    )
  }
}

Account = withWeb3(Account)
export { Account }
