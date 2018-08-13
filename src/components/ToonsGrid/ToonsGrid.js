// @flow
import * as React from "react"
import type { ToonWithFamilyIds } from "../../types/ToonTypes"
import { ToonDetails } from "../../models/ToonDetails"
import { URLHelper } from "../../helpers/URLhelper"
import { Col, Row } from "antd"
import { ToonDetailsCore } from "../../hoc/renderProps/ToonDetailsCore"
import { Link } from "react-router-dom"
import { ToonCard } from "../ToonCard/ToonCard"
import "./styles/ToonsGrid.css"

type ToonsGridProps = {
  toons: Array<ToonWithFamilyIds>,
}

class ToonsGrid extends React.PureComponent<ToonsGridProps> {
  static defaultProps = {
    toons: [],
  }

  render() {
    return (
      <Row gutter={30}>
        {this.props.toons.map(({ toonId, familyId }: ToonWithFamilyIds) => (
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 8 }}
            lg={{ span: 6 }}
            key={toonId}
            className="ToonsGrid__Toon"
          >
            <ToonDetailsCore
              familyId={familyId}
              toonId={toonId}
              render={(toonDetails: ToonDetails) => (
                <Link to={URLHelper.toon(familyId, toonId)}>
                  <ToonCard toonDetails={toonDetails} />
                </Link>
              )}
            />
          </Col>
        ))}
      </Row>
    )
  }
}

export { ToonsGrid }
