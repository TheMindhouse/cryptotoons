// @flow
import * as React from "react"
import { FAMILY_NAMES } from "../constants/toonFamilies"
import { URLHelper } from "../helpers/URLhelper"
import { setDocumentTitle } from "../helpers/utils"
import { ToonFamilyCollection } from "../components/ToonFamilyCollection/ToonFamilyCollection"

type Props = {
  match: {
    params: {
      name: string,
    },
  },
}

type State = {
  familyId: number,
}

class ToonFamily extends React.PureComponent<Props, State> {
  static defaultProps = {}

  state = {
    familyId: -1,
  }

  constructor(props: Props) {
    super(props)
    const familyId: number = this.getFamilyId(props)
    this.state = {
      familyId,
    }
    setDocumentTitle(this.getFamilyName())
  }

  componentDidUpdate() {
    const familyId: number = this.getFamilyId(this.props)
    this.setState({ familyId }, () => setDocumentTitle(this.getFamilyName()))
  }

  getFamilyId = (props: Props): number => {
    const familyName = props.match.params.name
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
    const { familyId } = this.state

    if (familyId === null) {
      return null
    }

    return <ToonFamilyCollection familyId={familyId} />
  }
}

export { ToonFamily }
