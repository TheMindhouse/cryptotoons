// @flow
import * as React from "react"
import { Col, Row } from "antd"
import { URLHelper } from "../../helpers/URLhelper"
import { Link } from "react-router-dom"
import "./styles/Footer.css"
import logoMindhouse from "../../assets/images/logo-mindhouse.png"
import logoWebcartoons from "../../assets/images/logo-webcartoons.png"
import discordLogo from "../../assets/images/discord.svg"
import { SocialLinks } from "../SocialLinks/SocialLinks"
import { SOCIAL_LINKS } from "../../constants/social"

type Props = {}

class Footer extends React.PureComponent<Props> {
  static defaultProps = {}

  render() {
    return (
      <div className="Footer">
        <div className="container">
          <Row>
            <Col xs={24} sm={24} md={4}>
              <nav className="Footer__nav">
                <Link to={URLHelper.about}>About</Link>
                <br />
                <Link to={URLHelper.help}>Help</Link>
                <br />
                <Link to={URLHelper.faq}>FAQ</Link>
                <br />
                <Link to={URLHelper.terms}>Terms of Use</Link>
                <br />
                <Link to={URLHelper.contact}>Contact</Link>
              </nav>
            </Col>
            <Col xs={24} sm={24} md={16} style={{ textAlign: "center" }}>
              Created with &hearts; since 2018 by The Mindhouse & WebCartoons Studio
              <Row type="flex" align="middle" justify="center">
                <a
                  href="https://mindhouse.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={logoMindhouse}
                    className="Footer__logo"
                    alt="The Mindhouse"
                  />
                </a>
                <a
                  href="https://webcartoonsstudio.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={logoWebcartoons}
                    className="Footer__logo"
                    alt="WebCartoons Studio"
                  />
                </a>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={4} className="Footer-Social">
              <SocialLinks />
              <a
                href={SOCIAL_LINKS.Discord}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={discordLogo}
                  alt="Discord"
                  className="Footer__logo"
                  style={{ width: 150, maxWidth: "80%", margin: -5 }}
                />
              </a>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export { Footer }
