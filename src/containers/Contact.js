// @flow
import * as React from "react"
import { Col, Divider, Row } from "antd"
import { SocialLinks } from "../components/SocialLinks/SocialLinks"
import { setDocumentTitle } from "../helpers/utils"
import Obfuscate from "react-obfuscate"

type ContactProps = {}

class Contact extends React.PureComponent<ContactProps> {
  static defaultProps = {}

  componentDidMount() {
    setDocumentTitle("Contact")
  }

  render() {
    return (
      <div>
        <div className="containerWrapper containerWrapper--gray">
          <div className="container">
            <h1 style={{ margin: 0 }}>
              <b>Contact us</b>
            </h1>
          </div>
        </div>

        <div className="containerWrapper" style={{ marginBottom: 100 }}>
          <div className="container container--large-text text-center">
            <Row type="flex" justify="center">
              <Col
                xs={{ span: 24 }}
                sm={{ span: 20 }}
                md={{ span: 16 }}
                lg={{ span: 14 }}
              >
                <p>
                  If you have any thoughts, questions or suggestions,<br />
                  you are welcome to contact us at{" "}
                  <b>
                    <Obfuscate email="team@mindhouse.io" />
                  </b>
                </p>
                <Divider dashed />
                <p>Find us on social media!</p>
                <SocialLinks fontSize={60} />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

export { Contact }
