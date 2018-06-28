// @flow
import * as React from "react"
import "./styles/ToonCard.css"

type Props = {
  image: string,
  name: string,
}

class ToonCard extends React.PureComponent<Props> {
  static defaultProps = {}

  render() {
    return (
      <div className="ToonCard">
        <div
          className="ToonCard__image"
          style={{
            backgroundImage: `url(${this.props.image})`,
          }}
        />
        <p className="ToonCard__name">{this.props.name}</p>
      </div>
    )
  }
}

export { ToonCard }
