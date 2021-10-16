import * as React from "react"
import "./styles/FamilyCard.css"
import { URLHelper } from "../../helpers/URLhelper"
import { Link } from "react-router-dom"
import { FAMILY_NAMES } from "../../constants/toonFamilies"
import { TOON_CONTRACT_ADDRESSES } from "../../constants/contracts"

type Props = {
  image: string,
  familyId: number,
}

class FamilyCard extends React.PureComponent<Props> {
  static defaultProps = {}

  render() {
    const isFamilyPublished =
      TOON_CONTRACT_ADDRESSES[this.props.familyId] !== ""
    return (
      <div
        className={`FamilyCard ${
          !isFamilyPublished ? "FamilyCard--disabled" : ""
        }`}
      >
        {!isFamilyPublished && (
          <div className="FamilyCard__ComingSoon">
            <span>COMING SOON, STAY TOONED!</span>
          </div>
        )}
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
