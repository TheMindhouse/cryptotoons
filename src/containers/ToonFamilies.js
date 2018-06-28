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
import { Link } from "react-router-dom"
import { FAMILY_IDS } from "../constants/toonFamilies"

type Props = {}

class ToonFamilies extends React.PureComponent<Props> {
  static defaultProps = {}

  render() {
    return (
      <div className="containerWrapper containerWrapper--gray">
        <div className="container">
          <Row gutter={20}>
            <Col span={12}>
              <FamilyCard image={familyCows} familyId={FAMILY_IDS.Cows} />
            </Col>
            <Col span={12}>
              <FamilyCard image={familyBulls} familyId={FAMILY_IDS.Bulls} />
            </Col>
            <Col span={12}>
              <FamilyCard image={familyDonkeys} familyId={FAMILY_IDS.Donkeys} />
            </Col>
            <Col span={12}>
              <FamilyCard
                image={familyElephants}
                familyId={FAMILY_IDS.Elephants}
              />
            </Col>
            <Col span={12}>
              <FamilyCard
                image={familyGorillas}
                familyId={FAMILY_IDS.Gorillas}
              />
            </Col>
            <Col span={12}>
              <FamilyCard image={familyHippos} familyId={FAMILY_IDS.Hippos} />
            </Col>
            <Col span={12}>
              <FamilyCard image={familyLlamas} familyId={FAMILY_IDS.Llamas} />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export { ToonFamilies }
