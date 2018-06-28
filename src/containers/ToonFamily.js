// @flow
import * as React from "react"
import { FAMILY_NAMES } from "../constants/toonFamilies"
import { URLHelper } from "../helpers/URLhelper"

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
  }

  componentDidUpdate() {
    const familyName: ?string = this.getFamilyId(this.props)
    this.setState({ familyName })
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

  render() {
    const { familyId } = this.state

    if (familyId === null) {
      return null
    }

    return (
      <div className="containerWrapper containerWrapper--gray">
        <div className="container">
          <h1>
            <b>{FAMILY_NAMES[familyId]}</b>
          </h1>
        </div>
      </div>
    )
  }
}

export { ToonFamily }
