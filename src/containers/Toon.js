// @flow
import * as React from "react"
import { URLHelper } from "../helpers/URLhelper"
import { FAMILY_NAMES } from "../constants/toonFamilies"
import { setDocumentTitle } from "../helpers/utils"
import { ToonDetailsType } from "../types/ToonDetailsType"
import { ToonDetailsCore } from "../hoc/renderProps/ToonDetailsCore"
import { ToonCard } from "../components/ToonCard/ToonCard"

type ToonProps = {
  match: {
    params: {
      familyName: string,
      toonId: string,
    },
  },
}

type ToonState = {
  familyId: number,
  toonId: number,
}

class Toon extends React.PureComponent<ToonProps, ToonState> {
  static defaultProps = {}

  constructor(props: ToonProps) {
    super(props)
    const familyId: number = this.getFamilyId(props)
    const toonId = parseInt(props.match.params.toonId, 10)
    this.state = {
      familyId,
      toonId,
    }
    setDocumentTitle(this.getFamilyName())
  }

  componentDidUpdate() {
    const familyId: number = this.getFamilyId(this.props)
    const toonId = this.props.match.params.toonId
    this.setState({ familyId, toonId }, () =>
      setDocumentTitle(this.getFamilyName())
    )
  }

  getFamilyId = (props: ToonProps): number => {
    const { familyName } = props.match.params
    const availableToons = Object.values(FAMILY_NAMES).map((name: mixed) =>
      String(name).toLowerCase()
    )
    const familyId = availableToons.indexOf(familyName.toLowerCase())
    if (familyId < 0) {
      document.location.href = URLHelper.pageNotFound
      return -1
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
    const { familyId, toonId } = this.state
    return (
      <div className="containerWrapper containerWrapper--gray">
        <div className="container">
          <ToonDetailsCore
            familyId={familyId}
            toonId={toonId}
            render={(toonDetails: ToonDetailsType) => (
              <ToonCard toonDetails={toonDetails} />
            )}
          />
        </div>
        <div className="container">
          <h1>
            <b>
              {this.getFamilyName()} #{toonId}
            </b>
          </h1>
        </div>
      </div>
    )
  }
}

export { Toon }
