// @flow
import * as React from "react"
import { FAMILY_NAMES } from "../constants/toonFamilies"
import { URLHelper } from "../helpers/URLhelper"
import { Col, Row } from "antd"
import { ToonCard } from "../components/ToonCard/ToonCard"

import toonImage from "../assets/images/toons/01-cows.png"
import { setDocumentTitle } from "../helpers/utils"

type Props = {
  match: {
    params: {
      name: string,
    },
  },
}

type State = {
  familyId?: number,
}

class ToonFamily extends React.PureComponent<Props, State> {
  static defaultProps = {}

  state = {
    familyId: null,
  }

  constructor(props) {
    super(props)
    const familyId: ?number = this.getFamilyId(props)
    this.state = {
      familyId,
    }
    setDocumentTitle(this.getFamilyName())
  }

  componentDidUpdate() {
    const familyId: ?string = this.getFamilyId(this.props)
    this.setState({ familyId }, () => setDocumentTitle(this.getFamilyName()))
  }

  getFamilyId = (props: Props): ?string => {
    const familyName = props.match.params.name
    const availableToons = Object.values(FAMILY_NAMES).map((name: string) =>
      name.toLowerCase()
    )
    const familyId = availableToons.indexOf(familyName.toLowerCase())
    if (familyId < 0) {
      document.location = URLHelper.pageNotFound
      return null
    }
    return familyId
  }

  getFamilyName = (): string => {
    const { familyId } = this.state
    if (familyId > -1) {
      return FAMILY_NAMES[familyId]
    }
    return ""
  }

  render() {
    const { familyId } = this.state

    if (familyId === null) {
      return null
    }

    return (
      <div className="containerWrapper containerWrapper--gray">
        <div className="container">
          <h1>
            <b>{this.getFamilyName()}</b>
          </h1>
          <Row gutter={30}>
            <Col span={8}>
              <ToonCard image={toonImage} name={FAMILY_NAMES[familyId]} />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export { ToonFamily }
