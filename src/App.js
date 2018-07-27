// @flow
import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ScrollToTop from "react-router-scroll-top"
import ReactGA from "react-ga"
import { hotjar } from "react-hotjar"
import { ToonFamilies } from "./containers/ToonFamilies"
import { Header } from "./components/Header/Header"
import { ErrorPage404 } from "./containers/ErrorPage404"
import { Footer } from "./components/Footer/Footer"
import { ToonFamily } from "./containers/ToonFamily"
import { Web3Provider } from "./stores/Web3Provider"
import { Toon } from "./containers/Toon"
import AccountStatus from "./components/AccountWidget/AccountStatus"
import { TransactionsProvider } from "./stores/TransactionsProvider"
import { Account } from "./containers/Account"
import { About } from "./containers/About"
import { URLHelper } from "./helpers/URLhelper"
import { TermsOfUse } from "./containers/TermsOfUse"
import { Contact } from "./containers/Contact"
import { CONFIG } from "./config"

// Initialize Google Analytics
const hostname = window && window.location && window.location.hostname
if (hostname === CONFIG.PAGE_URL) {
  ReactGA.initialize(CONFIG.ANALYTICS_ID)
  hotjar.initialize(CONFIG.HOTJAR_ID, CONFIG.HOTJAR_VERSION)
}

const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
  return null
}

class App extends Component<{}> {
  render() {
    return (
      <Web3Provider>
        <TransactionsProvider>
          <Router>
            <ScrollToTop>
              <div className="AppContent">
                <Header />
                <AccountStatus />

                <Route path="/" component={logPageView} />

                <Switch>
                  <Route exact path="/" component={ToonFamilies} />
                  <Route exact path="/toons/:name" component={ToonFamily} />
                  <Route
                    exact
                    path="/toons/:familyName/:toonId"
                    component={Toon}
                  />
                  <Route path="/account/:address" component={Account} />
                  <Route path={URLHelper.about} component={About} />
                  <Route path={URLHelper.terms} component={TermsOfUse} />
                  <Route path={URLHelper.contact} component={Contact} />
                  <Route path="/404" component={ErrorPage404} />
                  <Route component={ErrorPage404} />
                </Switch>

                <Footer />
              </div>
            </ScrollToTop>
          </Router>
        </TransactionsProvider>
      </Web3Provider>
    )
  }
}

export default App
