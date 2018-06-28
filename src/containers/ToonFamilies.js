// @flow
import * as React from "react"
import { Col, Row } from "antd"
import { FamilyCard } from "../components/FamilyCard/FamilyCard"

import familyCows from "../assets/images/toon-families/cows.jpg"
import familyBulls from "../assets/images/toon-families/bulls.jpg"
import familyDonkeys from "../assets/images/toon-families/donkeys.jpg"
import familyElephants from "../assets/images/toon-families/elephants.jpg"
import familyGorillas from "../assets/images/toon-families/gorillas.jpg"
import familyHippos from "../assets/images/toon-families/hippos.jpg"
import familyLlamas from "../assets/images/toon-families/llamas.jpg"

type Props = {}

class ToonFamilies extends React.PureComponent<Props> {
  static defaultProps = {}

  render() {
    return (
      <div className="containerWrapper containerWrapper--gray">
        <div className="container">
          <Row gutter={20}>
            <Col span={12}>
              <FamilyCard image={familyCows} name="CryptoCows" />
            </Col>
            <Col span={12}>
              <FamilyCard image={familyBulls} name="BitBulls" />
            </Col>
            <Col span={12}>
              <FamilyCard image={familyDonkeys} name="DappDonkeys" />
            </Col>
            <Col span={12}>
              <FamilyCard image={familyElephants} name="EtherElephants" />
            </Col>
            <Col span={12}>
              <FamilyCard image={familyGorillas} name="GuldenGorillas" />
            </Col>
            <Col span={12}>
              <FamilyCard image={familyHippos} name="HodlHippos" />
            </Col>
            <Col span={12}>
              <FamilyCard image={familyLlamas} name="LiteLlamas" />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export { ToonFamilies }
