// @flow
import * as React from "react"
import withStats from "../../hoc/withStats"
import type { FamilyStats, StatsData } from "../../types/StatsType"
import { Col, Icon, Row, Tooltip } from "antd"
import Stat from "./Stat"

type Props = {
  stats: StatsData,
}

const StatsOverview = ({ stats }: Props) => {
  if (!stats) return null;

  const totalStats = Object.values(stats).reduce(
    (acc, family: FamilyStats) => {
      return {
        volumeTotal: (acc.volumeTotal += family.volumeTotal),
        salesTotal: (acc.salesTotal += family.salesTotal),
        itemsCount: (acc.itemsCount += family.itemsCount),
        ownersCount: (acc.ownersCount += family.ownersCount),
      }
    },
    {
      volumeTotal: 0,
      salesTotal: 0,
      itemsCount: 0,
      ownersCount: 0,
    }
  )

  return (
    <div>
      <h2>
        All Toons Stats{" "}
        <Tooltip
          title="Statistics fetched from OpenSea every 15 minutes."
          overlayStyle={{ fontSize: 15 }}
        >
          <Icon type="info-circle" style={{ fontSize: 15 }} />
        </Tooltip>
      </h2>
      <Row gutter={16} >
        <Col xs={{ span: 12 }} md={{ span: 6 }}>
          <Stat
            title="Total volume"
            value={`Ξ ${totalStats.volumeTotal.toFixed(4)}`}
          />
        </Col>
        <Col xs={{ span: 12 }} md={{ span: 6 }}>
          <Stat
            title="Total sales"
            value={totalStats.salesTotal}
          />
        </Col>
        <Col xs={{ span: 12 }} md={{ span: 6 }}>
          <Stat
            title="Total supply"
            value={totalStats.itemsCount}
          />
        </Col>
        <Col xs={{ span: 12 }} md={{ span: 6 }}>
          <Stat
            title="Owners"
            value={totalStats.ownersCount}
          />
        </Col>
      </Row>
    </div>
  )
}

export default withStats(StatsOverview)
