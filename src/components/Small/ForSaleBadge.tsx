import * as React from "react"
import "./styles/ForSaleBadge.css"
import { Icon } from "antd"
import { wei2eth } from "../../helpers/unitsConverter"

type ForSaleBadgeProps = {
  price: number, // price in Wei
}

class ForSaleBadge extends React.PureComponent<ForSaleBadgeProps> {
  static defaultProps = {}

  render() {
    const { price } = this.props
    return (
      <div className="ForSaleBadge">
        <Icon type="tag" className="ForSaleBadge__Icon" />
        <span className="ForSaleBadge__Caption">For sale</span>
        <span className="ForSaleBadge__Price">
          <small>Ξ</small> <b>{price ? wei2eth(price) : "Free"}</b>
        </span>
      </div>
    )
  }
}

export { ForSaleBadge }
