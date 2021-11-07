import * as React from "react"
import { Button, Col, Input, message, Row, Tooltip } from "antd"
import { TransactionWithToon } from "../../../models/TransactionWithToon"
import { LocalStorageManager } from "../../../localStorage/index"
import type { Web3StoreType } from "../../../types/Web3StoreType"
import { ToonDetails } from "../../../models/ToonDetails"
import { TermsInfo } from "../../Small/TermsInfo"
import withWeb3 from "../../../hoc/withWeb3"
import { CONFIG } from "../../../config"
import { isValidName } from "../../../helpers/namingService"
import { TOON_CONTRACT_ADDRESSES } from "../../../constants/contracts"

type NameYourToonProps = {
  toonDetails: ToonDetails,
  switchToDefaultView: () => void,
  web3Store: Web3StoreType,
}

type NameYourToonState = {
  name?: string,
  isSubmitting: boolean,
}

class NameYourToon extends React.PureComponent<
  NameYourToonProps,
  NameYourToonState
> {
  static defaultProps = {}

  state = {
    name: null,
    isSubmitting: false,
  }

  onChange = ({ target }: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ name: target.value })
  }

  onSetName = () => {
    const { toonDetails, web3Store } = this.props
    const namingContract = web3Store.NamingContract
    const { name } = this.state
    this.setState({ isSubmitting: true })
    namingContract
      .setName(toonDetails.familyId, toonDetails.toonId, name || "")
      .then((tx: TransactionWithToon) => {
        LocalStorageManager.transactions.updateTransactions(tx)
        message.success(`${tx.name} Transaction Sent`)
        this.setState({ isSubmitting: false }, this.props.switchToDefaultView)
      })
      .catch((error: Error) => {
        this.setState({ isSubmitting: false })
        message.error(error.message || error)
      })
  }

  render() {
    const { name, isSubmitting } = this.state
    const isValid = isValidName(name)
    const textColor = isValid ? "inherit" : "#ef3340"

    return (
      <Row type="flex" justify="center">
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <h2 className="text-center">
            <b>Name Your Toon</b>
          </h2>

          <div>
            <p>
              As an owner, you can give this Toon an amazing name, which will
              make it stand out from the other Toons! It will be displayed here
              on this Toon page, and also added to the metadata used on other
              websites, such as OpenSea.
            </p>
            <p>You can change the name as many times as you wish!</p>
            <p>
              <b>Max length:</b> {CONFIG.MAX_NAME_LENGTH} chars<br />
              <span style={{ color: textColor }}>
                <b>Chars supported:</b> letters, numbers, spaces, dashes and
                underscores
              </span>
              <br />
              <b>Fee:</b> <small>Ξ</small>
              {CONFIG.NAMING_FEE} + gas
            </p>
            <Input
              value={name}
              placeholder="Enter fun Toon name"
              onChange={this.onChange}
              size="large"
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: textColor,
              }}
              maxLength={CONFIG.MAX_NAME_LENGTH}
            />
            <div style={{ marginTop: 8 }}>
              {(name || "").length} / {CONFIG.MAX_NAME_LENGTH}
            </div>
          </div>

          <TermsInfo />

          <Row type="flex" justify="space-between" style={{ marginTop: 30 }}>
            <Button
              type="default"
              size="large"
              onClick={this.props.switchToDefaultView}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={this.onSetName}
              loading={isSubmitting}
              disabled={!isValid}
            >
              Submit Name
            </Button>
          </Row>
        </Col>
      </Row>
    )
  }
}

NameYourToon = withWeb3(NameYourToon)
export { NameYourToon }
