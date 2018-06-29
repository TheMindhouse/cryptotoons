// @flow
import * as React from "react"
import "./styles/FamilyCard.css"
import { URLHelper } from "../../helpers/URLhelper"
import { Link } from "react-router-dom"
import { FAMILY_NAMES } from "../../constants/toonFamilies"

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
          <img
            src={this.props.image}
            className="FamilyCard__image"
            alt={FAMILY_NAMES[this.props.familyId]}
          />
        </Link>
      </div>
    )
  }
}

export { FamilyCard }
