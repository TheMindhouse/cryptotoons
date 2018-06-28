// @flow
import * as React from "react"
import { Link } from "react-router-dom"
import { setDocumentTitle } from "../helpers/utils"
import { URLHelper } from "../helpers/URLhelper"

class ErrorPage404 extends React.PureComponent<{}> {
  componentDidMount() {
    setDocumentTitle("Page Not Found")
  }

  render() {
    return (
      <div className="containerWrapper" style={{ marginBottom: 50 }}>
        <div className="container">
          <h1>
            <b>Page Not Found</b>
          </h1>
          <h3>
            <Link to={URLHelper.home}>Go back to homepage</Link>
          </h3>
        </div>
      </div>
    )
  }
}

export { ErrorPage404 }
