// @flow
import * as React from "react"
import "./styles/TextWithLabel.css"

type TextWithLabelProps = {
  label: string,
  text: string | React.Node,
}

class TextWithLabel extends React.PureComponent<TextWithLabelProps> {
  static defaultProps = {}

  render() {
    return (
      <div className="TextWithLabel">
        <span className="TextWithLabel__Label">{this.props.label}</span>
        <span className="TextWithLabel__Text">{this.props.text}</span>
      </div>
    )
  }
}

export { TextWithLabel }
