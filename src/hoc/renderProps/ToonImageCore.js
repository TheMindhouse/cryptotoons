// @flow
import * as React from "react"
import { CONFIG } from "../../config"

type Props = {
  familyId: number,
  toonId: number,
  genes: string,
  render: (?string) => React.Node,
}

type State = {
  imageUrl: ?string,
}

class ToonImageCore extends React.PureComponent<Props, State> {
  static defaultProps = {}

  state = {
    imageUrl: null,
  }

  componentDidMount() {
    this.getImageUrl()
  }

  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.familyId !== this.props.familyId ||
      prevProps.genes !== this.props.genes ||
      prevProps.toonId !== this.props.toonId
    ) {
      this.getImageUrl()
    }
  }

  getImageUrl = () => {
    const imageUrl = `${CONFIG.TOON_IMAGE_BASE_URL}/${this.props.familyId}/${
      this.props.genes
    }`
    this.setState({ imageUrl })
  }

  render() {
    return this.props.render(this.state.imageUrl)
  }
}

export { ToonImageCore }
