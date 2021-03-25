// @flow
import * as React from "react"
import { FAMILY_NAMES } from "../constants/toonFamilies"
import { getUrlWithPage, URLHelper } from "../helpers/URLhelper"
import { setDocumentTitle } from "../helpers/utils"
import { ToonFamilyCollection } from "../components/ToonFamilyCollection/ToonFamilyCollection"
import { type RouterHistory, withRouter } from "react-router-dom"

type Props = {
  match: {
    params: {
      name: string,
      pageId?: string,
    },
  },
  history: RouterHistory,
}

type State = {
  familyId: number,
  pageId: number,
}

class ToonFamily extends React.PureComponent<Props, State> {
  static defaultProps = {}

  constructor(props: Props) {
    super(props)
    const familyId: number = this.getFamilyIdByProps(props)
    const pageId: number = this.getPageIdByProps(props)
    this.state = {
      familyId,
      pageId,
    }
    setDocumentTitle(this.getFamilyName())
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.match.params.name !== this.props.match.params.name) {
      const familyId: number = this.getFamilyIdByProps(this.props)
      const pageId: number = this.getPageIdByProps(this.props)
      this.setState({ familyId, pageId }, () =>
        setDocumentTitle(this.getFamilyName())
      )
    }
  }

  getFamilyIdByProps = (props: Props): number => {
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

  getPageIdByProps = (props: Props): number =>
    props.match.params.pageId ? parseInt(props.match.params.pageId, 10) : 1

  getFamilyName = (): string => {
    const { familyId } = this.state
    if (familyId > -1) {
      return FAMILY_NAMES[familyId]
    }
    return ""
  }

  onChangePage = (pageId: number) => {
    this.setState({ pageId })
    this.props.history.push(
      getUrlWithPage(URLHelper.toonFamily(this.state.familyId), pageId)
    )
  }

  render() {
    const { familyId, pageId } = this.state

    if (familyId === null) {
      return null
    }

    return (
      <ToonFamilyCollection
        familyId={familyId}
        pageId={pageId}
        onChangePage={this.onChangePage}
      />
    )
  }
}

ToonFamily = withRouter(ToonFamily)
export { ToonFamily }
