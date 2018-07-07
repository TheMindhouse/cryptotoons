// @flow
import * as React from "react"
import { Icon } from "antd"

type SocialLinksProps = {
  fontSize: number,
}

class SocialLinks extends React.PureComponent<SocialLinksProps> {
  static defaultProps = {
    fontSize: 30,
  }

  getStyle = () => {
    const { fontSize } = this.props
    return {
      fontSize,
      marginLeft: fontSize / 3,
    }
  }

  render() {
    const style = this.getStyle()
    return (
      <div>
        <a
          href="https://www.facebook.com/cryptotoons/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...style, marginLeft: 0 }}
        >
          <Icon type="facebook" />
        </a>
        <a
          href="https://www.instagram.com/cryptotoons/"
          target="_blank"
          rel="noopener noreferrer"
          style={style}
        >
          <Icon type="instagram" />
        </a>
        <a
          href="https://twitter.com/toontoken"
          target="_blank"
          rel="noopener noreferrer"
          style={style}
        >
          <Icon type="twitter" />
        </a>
      </div>
    )
  }
}

export { SocialLinks }
