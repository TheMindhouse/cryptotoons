// @flow
import * as React from "react"
import { CONFIG } from "../config"
import { type StatsData } from "../types/StatsType"

const StatsContext = React.createContext()

type Props = {
  children?: React.Node,
}

type State = {
  stats?: StatsData,
}

class StatsProvider extends React.Component<Props, State> {
  state = {}

  checkAccountInterval: * = setInterval(() => {}, CONFIG.CHECK_ACCOUNT_DELAY)

  componentDidMount() {
    this.fetchStats()
  }

  fetchStats = async () => {
    try {
      const response = await fetch(CONFIG.STATS_URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      console.log(response)
      const stats = await response.json()
      this.setState({ stats })
    } catch (e) {
      console.error(e)
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.checkAccountInterval)
  }

  render() {
    return (
      <StatsContext.Provider value={this.state.stats}>
        {this.props.children}
      </StatsContext.Provider>
    )
  }
}

export { StatsContext, StatsProvider }
