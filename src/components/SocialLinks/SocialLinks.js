// @flow
import * as React from "react"
import { Icon } from "antd"
import { SOCIAL_LINKS } from "../../constants/social"

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
          href={SOCIAL_LINKS.Instagram}
          target="_blank"
          rel="noopener noreferrer"
          style={style}
        >
          <Icon type="instagram" />
        </a>
        <a
          href={SOCIAL_LINKS.Twitter}
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
