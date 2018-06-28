// @flow
import * as React from "react"
import "./styles/FamilyCard.css"

type Props = {
  image: string,
  name: string,
}

class FamilyCard extends React.PureComponent<Props> {
  static defaultProps = {}

  render() {
    return (
      <div className="FamilyCard">
        <img src={this.props.image} className="FamilyCard__image" />
      </div>
    )
  }
}

export { FamilyCard }
