// @flow
import * as React from "react"
import { Col, Divider, Icon, Row } from "antd"
import { URLHelper } from "../../helpers/URLhelper"
import { Link } from "react-router-dom"
import "./styles/Footer.css"
import logoMindhouse from "../../assets/images/logo-mindhouse.png"
import logoWebcartoons from "../../assets/images/logo-webcartoons.png"

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
                <Link to={URLHelper.home}>About</Link>
                <br />
                <Link to={URLHelper.home}>Help</Link>
                <br />
                <Link to={URLHelper.home}>Terms of Use</Link>
                <br />
                <Link to={URLHelper.home}>Contact</Link>
              </nav>
            </Col>
            <Col xs={24} sm={24} md={16} style={{ textAlign: "center" }}>
              Created with &hearts; by The Mindhouse & WebCartoons Studio
              <Row type="flex" align="middle" justify="center">
                <a
                  href="https://mindhouse.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={logoMindhouse}
                    title="The Mindhouse"
                    className="Footer__logo"
                  />
                </a>
                <a
                  href="http://www.webcartoons.nl/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={logoWebcartoons}
                    title="WebCartoons Studio"
                    className="Footer__logo"
                  />
                </a>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={4} className="Footer-Social">
              <a
                href="https://www.facebook.com/cryptotoons/"
                target="_blank"
                rel="noopener noreferrer"
                className="Footer-Social__Icon"
              >
                <Icon type="facebook" />
              </a>
              <a
                href="https://www.instagram.com/cryptotoons/"
                target="_blank"
                rel="noopener noreferrer"
                className="Footer-Social__Icon"
              >
                <Icon type="instagram" />
              </a>
              <a
                href="https://twitter.com/toontoken"
                target="_blank"
                rel="noopener noreferrer"
                className="Footer-Social__Icon"
              >
                <Icon type="twitter" />
              </a>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export { Footer }
