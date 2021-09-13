// @flow
import * as React from "react"
import getComponentDisplayName from "../helpers/getComponentDisplayName"
import { StatsContext } from "../stores/StatsProvider"

const withStats = (WrappedComponent: React.ComponentType<any>) => {
  class withStats extends React.Component<{}> {
    render() {
      return (
        <StatsContext.Consumer>
          {(stats) =>
            stats ? (
              <WrappedComponent {...this.props} stats={stats} />
            ) : null
          }
        </StatsContext.Consumer>
      )
    }
  }

  withStats.displayName = `withStats(${getComponentDisplayName(
    WrappedComponent
  )})`

  return withStats
}

export default withStats
