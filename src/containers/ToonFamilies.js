// @flow
import * as React from "react"
import { Col, Row } from "antd"
import { FamilyCard } from "../components/FamilyCard/FamilyCard"

import familyCows from "../assets/images/toon-families/cows.png"
import familyBulls from "../assets/images/toon-families/bulls.png"
import familyDonkeys from "../assets/images/toon-families/donkeys.png"
import familyElephants from "../assets/images/toon-families/elephants.png"
import familyGorillas from "../assets/images/toon-families/gorillas.png"
import familyHippos from "../assets/images/toon-families/hippos.png"
import familyLlamas from "../assets/images/toon-families/llamas.png"
import familyPandas from "../assets/images/toon-families/pandas.png"
import familyMonkeys from "../assets/images/toon-families/monkeys.png"
import { FAMILY_IDS } from "../constants/toonFamilies"
import { setDocumentTitle } from "../helpers/utils"
import { URLHelper } from "../helpers/URLhelper"

type Props = {}

class ToonFamilies extends React.PureComponent<Props> {
  static defaultProps = {}

  componentDidMount() {
    setDocumentTitle()
  }

  render() {
    const families: Array<[number, string]> = [
      [FAMILY_IDS.Cows, familyCows],
      [FAMILY_IDS.Bulls, familyBulls],
      [FAMILY_IDS.Hippos, familyHippos],
      [FAMILY_IDS.Llamas, familyLlamas],
      [FAMILY_IDS.Elephants, familyElephants],
      [FAMILY_IDS.Donkeys, familyDonkeys],
      [FAMILY_IDS.Gorillas, familyGorillas],
      [FAMILY_IDS.Pandas, familyPandas],
      [FAMILY_IDS.Monkeys, familyMonkeys],
    ]
    return (
      <div className="containerWrapper containerWrapper--gray">
        <div className="container">
          <h3 style={{ marginBottom: 20 }}>
            <a href={URLHelper.genesis}>
              See the remaining Genesis Toons from Creators &raquo;
            </a>
          </h3>
          <Row gutter={20}>
            {families.reverse().map((family: [number, string]) => (
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
