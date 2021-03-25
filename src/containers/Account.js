// @flow
import * as React from "react"
import { Alert } from "antd"
import withWeb3 from "../hoc/withWeb3"
import { setDocumentTitle } from "../helpers/utils"
import type { Web3StoreType } from "../types/Web3StoreType"
import { ToonsOwned } from "../components/ToonsOwned/ToonsOwned"
import { getUrlWithPage, URLHelper } from "../helpers/URLhelper"
import { type RouterHistory, withRouter } from "react-router-dom"
import { AUCTION_CONTRACT_ADDRESS, CONTRACT_OWNER_ADDRESS, } from "../constants/contracts"
import { equalStrings } from "../helpers/strings"

type Props = {
  match: {
    params: {
      address: string,
      pageId?: string,
    },
  },
  history: RouterHistory,
  web3Store: Web3StoreType,
  address: ?string,
  url: ?string,
}

type State = {
  urlAccountAddress: string,
  pageId: number,
  pageTitle: string,
  isCreatorsPage: boolean,
  isAuctionsPage: boolean,
}

class Account extends React.PureComponent<Props, State> {
  static defaultProps = {}

  constructor(props: Props) {
    super(props)
    this.state = this.getInitialState(props)
  }

  componentDidUpdate(prevProps: Props) {
    const prevParams = prevProps.match.params
    const currentParams = this.props.match.params
    if (
      !equalStrings(prevParams.address, currentParams.address) ||
      !equalStrings(prevProps.address, this.props.address)
    ) {
      this.setState(this.getInitialState(this.props))
    }

    if (prevParams.pageId !== currentParams.pageId) {
      this.setState({ pageId: this.getPageIdByProps(this.props) })
    }
  }

  getInitialState = (props: Props) => {
    const urlAccountAddress = props.address || props.match.params.address
    const pageId: number = this.getPageIdByProps(props)
    const isCreatorsPage = equalStrings(
      urlAccountAddress,
      CONTRACT_OWNER_ADDRESS
    )
    const isAuctionsPage = equalStrings(
      urlAccountAddress,
      AUCTION_CONTRACT_ADDRESS
    )
    const pageTitle = isCreatorsPage
      ? "Toons From Original Creators"
      : isAuctionsPage
        ? "Toon Auctions"
        : "Account Details"
    setDocumentTitle(pageTitle)

    return {
      urlAccountAddress,
      pageId,
      pageTitle,
      isCreatorsPage,
      isAuctionsPage,
    }
  }

  getPageIdByProps = (props: Props): number =>
    props.match.params.pageId ? parseInt(props.match.params.pageId, 10) : 1

  onChangePage = (pageId: number) => {
    this.setState({ pageId })
    this.props.history.push(
      getUrlWithPage(
        this.props.url || URLHelper.account(this.state.urlAccountAddress),
        pageId
      )
    )
  }

  render() {
    const {
      urlAccountAddress,
      pageId,
      pageTitle,
      isCreatorsPage,
      isAuctionsPage,
    } = this.state
    const userAccountAddress = this.props.web3Store.account
    return (
      <div>
        <div className="containerWrapper containerWrapper--gray">
          <div className="container">
            <h1>
              <b>{pageTitle}</b>
            </h1>
            <h2 className="text-wrap">
              {isCreatorsPage
                ? "Waiting for their new home"
                : isAuctionsPage
                  ? "Follow the auctions as prices can change dynamically!"
                  : urlAccountAddress}
            </h2>
            {urlAccountAddress === userAccountAddress && (
              <Alert type="success" message="This is your account" showIcon />
            )}
          </div>
        </div>

        <div className="containerWrapper">
          <div className="container">
            <ToonsOwned
              accountAddress={urlAccountAddress}
              pageId={pageId}
              onChangePage={this.onChangePage}
            />
            {/*{equalStrings(userAccountAddress, CONTRACT_OWNER_ADDRESS) && (*/}
            {/*  <AccountBalance accountAddress={urlAccountAddress} />*/}
            {/*)}*/}
          </div>
        </div>
      </div>
    )
  }
}

Account = withRouter(withWeb3(Account))
export { Account }
