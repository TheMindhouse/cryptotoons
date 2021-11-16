import React from "react"
import { Icon, Row } from "antd"

const ToonPagePlaceholder = () => (
  <div className="containerWrapper containerWrapper--gray">
    <div className="container">
      <Row
        type="flex"
        align="middle"
        justify="center"
        style={{ minHeight: "400px" }}
      >
        <Icon type="loading" style={{ fontSize: 24 }} />
      </Row>
    </div>
  </div>
)

export { ToonPagePlaceholder }
