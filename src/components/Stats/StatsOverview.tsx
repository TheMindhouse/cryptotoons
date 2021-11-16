import * as React from "react"
import withStats from "../../hoc/withStats"
import type { StatsData } from "../../types/StatsType"
import { Col, Icon, Row, Tooltip } from "antd"
import Stat from "./Stat"

type Props = {
  stats: StatsData,
}

const StatsOverview = ({ stats }: Props) => {
  if (!stats) return null

  const totalStats = stats.summary

  return (
    <div>
      <h2>
        All Toons Stats{" "}
        <Tooltip
          title="Stats fetched from OpenSea every hour."
          overlayStyle={{ fontSize: 15 }}
        >
          <Icon type="info-circle" style={{ fontSize: 15 }} />
        </Tooltip>
      </h2>
      <Row type="flex" gutter={16} align="stretch">
        <Col xs={{ span: 12 }} md={{ span: 6 }}>
          <Stat
            title="Total volume"
            value={Number(totalStats.volumeTotal.toFixed(3))}
          />
        </Col>
        <Col xs={{ span: 12 }} md={{ span: 6 }}>
          <Stat title="Total sales" text={totalStats.salesTotal} />
        </Col>
        <Col xs={{ span: 12 }} md={{ span: 6 }}>
          <Stat title="Total supply" text={totalStats.itemsCount} />
        </Col>
        <Col xs={{ span: 12 }} md={{ span: 6 }}>
          <Stat
            title="Average price"
            value={Number(totalStats.averagePrice.toFixed(3))}
          />
        </Col>
      </Row>
    </div>
  )
}

export default withStats(StatsOverview)
