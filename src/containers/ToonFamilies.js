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
import { FAMILY_IDS } from "../constants/toonFamilies"
import { setDocumentTitle } from "../helpers/utils"

type Props = {}

class ToonFamilies extends React.PureComponent<Props> {
  static defaultProps = {}

  componentDidMount() {
    setDocumentTitle("Toon Families")
  }

  render() {
    const families: Array<[number, string]> = [
      [FAMILY_IDS.Cows, familyCows],
      [FAMILY_IDS.Bulls, familyBulls],
      [FAMILY_IDS.Donkeys, familyDonkeys],
      [FAMILY_IDS.Elephants, familyElephants],
      [FAMILY_IDS.Gorillas, familyGorillas],
      [FAMILY_IDS.Hippos, familyHippos],
      [FAMILY_IDS.Llamas, familyLlamas],
    ]
    return (
      <div className="containerWrapper containerWrapper--gray">
        <div className="container">
          <Row gutter={20}>
            {families.map((family: [number, string]) => (
              <Col xs={{ span: 24 }} sm={{ span: 12 }} key={family[0]}>
                <FamilyCard familyId={family[0]} image={family[1]} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    )
  }
}

export { ToonFamilies }
