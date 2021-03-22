// @flow
import * as React from "react"
import { CONFIG } from "../../config"

type Props = {
  familyId: number,
  toonId: number,
  placeholder: React.Node,
  render: (string) => React.Node,
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
      prevProps.toonId !== this.props.toonId
    ) {
      this.getImageUrl()
    }
  }

  getImageUrl = () => {
    this.setState({ imageUrl: null })
    const { familyId, toonId } = this.props
    const imageUrl = `${CONFIG.TOON_IMAGE_BASE_URL}/${familyId}/${toonId}`

    // Pre-download images before showing it on the page
    let imageToDownload = new Image()
    imageToDownload.onload = () => {
      this.setState({ imageUrl }) // pass down the URL to the downloaded image
      imageToDownload = null
    }
    imageToDownload.src = imageUrl
  }

  render() {
    const { imageUrl } = this.state
    const { render, placeholder } = this.props

    return imageUrl ? render(imageUrl) : placeholder
  }
}

export { ToonImageCore }
