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
  familyName?: string,
}

class ToonFamily extends React.PureComponent<Props, State> {
  static defaultProps = {}

  state = {}

  constructor(props) {
    super(props)
    const familyName: ?string = this.getFamilyName(props)
    this.state = {
      familyName,
    }
  }

  componentDidUpdate() {
    const familyName: ?string = this.getFamilyName(this.props)
    this.setState({ familyName })
  }

  getFamilyName = (props: Props): ?string => {
    const familyName = props.match.params.name
    const availableToons = Object.values(FAMILY_NAMES).map((name: string) =>
      name.toLowerCase()
    )
    const familyId = availableToons.indexOf(familyName.toLowerCase())
    if (familyId < 0) {
      document.location = URLHelper.pageNotFound
      return null
    }
    return FAMILY_NAMES[familyId]
  }

  render() {
    if (!this.state.familyName) {
      return null
    }

    return (
      <div className="container">
        <h1>{this.state.familyName}</h1>
      </div>
    )
  }
}

export { ToonFamily }
