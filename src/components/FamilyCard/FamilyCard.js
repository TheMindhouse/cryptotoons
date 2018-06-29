// @flow
import * as React from "react"
import "./styles/FamilyCard.css"
import { URLHelper } from "../../helpers/URLhelper"
import { FAMILY_NAMES } from "../../constants/toonFamilies"
import { Link } from "react-router-dom"

type Props = {
  image: string,
  familyId: number,
}

class FamilyCard extends React.PureComponent<Props> {
  static defaultProps = {}

  render() {
    return (
      <div className="FamilyCard">
        <Link to={URLHelper.toonFamily(this.props.familyId)}>
          <img src={this.props.image} className="FamilyCard__image" />
        </Link>
      </div>
    )
  }
}

export { FamilyCard }
