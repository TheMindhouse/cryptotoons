// @flow
import * as React from "react"
import { URLHelper } from "../helpers/URLhelper"
import { FAMILY_NAMES, FAMILY_NAMES_SINGULAR } from "../constants/toonFamilies"
import { setDocumentTitle } from "../helpers/utils"
import { ToonDetailsType } from "../types/ToonDetailsType"
import { ToonDetailsCore } from "../hoc/renderProps/ToonDetailsCore"
import { ToonPageHeader } from "../components/ToonPageHeader/ToonPageHeader"

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
    setDocumentTitle(`${this.getFamilyName()} #${toonId}`)
  }

  componentDidUpdate() {
    const familyId: number = this.getFamilyId(this.props)
    const toonId = parseInt(this.props.match.params.toonId, 10)
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
      return FAMILY_NAMES_SINGULAR[familyId]
    }
    return ""
  }

  render() {
    const { familyId, toonId } = this.state
    return (
      <div>
        <ToonDetailsCore
          familyId={familyId}
          toonId={toonId}
          render={(toonDetails: ToonDetailsType) => (
            <ToonPageHeader toonDetails={toonDetails} />
          )}
        />
      </div>
    )
  }
}

export { Toon }
