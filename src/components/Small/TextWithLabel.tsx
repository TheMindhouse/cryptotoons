import * as React from "react"
import "./styles/TextWithLabel.css"
import {ReactNode} from "react";

type TextWithLabelProps = {
  label: string,
  text: string | ReactNode,
}

class TextWithLabel extends React.PureComponent<TextWithLabelProps> {
  static defaultProps = {}

  render() {
    return (
      <div className="TextWithLabel">
        <span className="TextWithLabel__Label color-lgray">
          {this.props.label}
        </span>
        <span className="TextWithLabel__Text">{this.props.text}</span>
      </div>
    )
  }
}

export { TextWithLabel }
