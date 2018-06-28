// @flow
import * as React from "react"
import "./styles/ToonFamily.css"
import { Row } from "antd"

type Props = {}

class ToonFamily extends React.PureComponent<Props> {
  static defaultProps = {}

  render() {
    return (
      <div style={{ background: "#fafafa" }}>
        <div className="container">
          <h1>Toon Families</h1>
          <Row gutter={50} />
        </div>
      </div>
    )
  }
}

export { ToonFamily }
