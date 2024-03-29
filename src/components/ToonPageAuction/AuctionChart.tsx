import * as React from "react"
import * as SVG from "svg.js"
import { ToonAuction } from "../../models/web3/ToonAuction"
import "./styles/AuctionChart.css"
import { AUCTION_DIRECTIONS } from "../../constants/auction"

type AuctionChartProps = {
  toonAuction: ToonAuction,
}

const FULL_WIDTH = 1080
const FULL_HEIGHT = 270
const CIRCLE_SIZE = 12
const PADDING = CIRCLE_SIZE / 2
const WIDTH = FULL_WIDTH - 2 * PADDING
const HEIGHT = FULL_HEIGHT - 2 * PADDING

const COLOR_BACKGROUND = "#ddd"
const COLOR_MAIN = "#0b8aa8"
const COLOR_GRADIENT_START = "#e1e1e1"
const COLOR_GRADIENT_END = "#fff"

class AuctionChart extends React.PureComponent<AuctionChartProps> {
  static defaultProps = {}

  chartRef = React.createRef()

  componentDidMount() {
    this.drawSVG()
  }

  getAuctionStartCoords = (): [number, number] =>
    this.props.toonAuction.getAuctionDirection() ===
    AUCTION_DIRECTIONS.INCREASING
      ? [0, HEIGHT]
      : [0, 0]

  getAuctionEndCoords = (): [number, number] =>
    this.props.toonAuction.getAuctionDirection() ===
    AUCTION_DIRECTIONS.DECREASING
      ? [WIDTH, HEIGHT]
      : [WIDTH, 0]

  getCurrentPriceCoords = (): [number, number] => {
    const { toonAuction } = this.props
    const percentCompleted = toonAuction.getPercentCompleted()
    const posX = WIDTH * percentCompleted
    const posY =
      toonAuction.getAuctionDirection() === AUCTION_DIRECTIONS.STABLE
        ? 0
        : toonAuction.getAuctionDirection() === AUCTION_DIRECTIONS.INCREASING
          ? HEIGHT - HEIGHT * percentCompleted
          : HEIGHT * percentCompleted
    return [posX, posY]
  }

  getPriceBackgroundCoords = (): Array<Array<number>> => {
    switch (this.props.toonAuction.getAuctionDirection()) {
      case AUCTION_DIRECTIONS.INCREASING:
        return [[0, HEIGHT], [WIDTH, 0], [WIDTH, HEIGHT]]
      case AUCTION_DIRECTIONS.DECREASING:
        return [[0, 0], [WIDTH, HEIGHT], [0, HEIGHT]]
      case AUCTION_DIRECTIONS.STABLE:
      default:
        return [[0, 0], [WIDTH, 0], [WIDTH, HEIGHT], [0, HEIGHT]]
    }
  }

  drawSVG = () => {
    const node: HTMLElement | null = this.chartRef.current
    if (!node) {
      return
    }

    const draw = SVG(node).size(FULL_WIDTH, FULL_HEIGHT)

    const auctionStartCoords = this.getAuctionStartCoords()
    const auctionEndCoords = this.getAuctionEndCoords()
    const currentPriceCoords = this.getCurrentPriceCoords()
    const priceBackgroundCoords = this.getPriceBackgroundCoords()

    const priceBackground = draw
      .gradient("linear", function(stop) {
        stop.at(0, COLOR_GRADIENT_START)
        stop.at(1, COLOR_GRADIENT_END)
      })
      .from(0, 0)
      .to(0, 1)

    // Set viewbox
    draw.viewbox(0, 0, FULL_WIDTH, FULL_HEIGHT)

    // Background lines settings
    const boxOptions = { width: 2, color: COLOR_BACKGROUND }

    // Gradient under progress line
    draw
      .polyline(priceBackgroundCoords)
      .fill(priceBackground)
      .dmove(PADDING, PADDING)

    // Bounding box rectangle
    draw
      .rect(WIDTH, HEIGHT)
      .fill("none")
      .stroke(boxOptions)
      .dmove(PADDING, PADDING)

    // Vertical lines
    draw
      .line(0, 0, 0, HEIGHT)
      .stroke(boxOptions)
      .dmove(WIDTH * (1 / 3), 0)
      .dmove(PADDING, PADDING) // 1/3
    draw
      .line(0, 0, 0, HEIGHT)
      .stroke(boxOptions)
      .dmove(WIDTH * (2 / 3), 0)
      .dmove(PADDING, PADDING) // 2/3

    // Auction progress line
    draw
      .line(...currentPriceCoords, ...auctionEndCoords)
      .stroke({ width: 3, color: COLOR_BACKGROUND })
      .dmove(PADDING, PADDING)

    // Auction current price line
    draw
      .line(...auctionStartCoords, ...currentPriceCoords)
      .stroke({ width: 3, color: COLOR_MAIN })
      .dmove(PADDING, PADDING)

    // Auction start circle
    draw
      .circle(CIRCLE_SIZE)
      .fill(COLOR_MAIN)
      .move(...auctionStartCoords)

    // Auction end circle
    draw
      .circle(CIRCLE_SIZE)
      .fill(COLOR_BACKGROUND)
      .move(...auctionEndCoords)

    // Auction current price circle
    draw
      .circle(CIRCLE_SIZE)
      .fill(COLOR_MAIN)
      .move(...currentPriceCoords)
  }

  render() {
    return <div className="AuctionChart" ref={this.chartRef} />
  }
}

export { AuctionChart }
