import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
// @ts-ignore
import ScrollToTop from "react-router-scroll-top"
import ReactGA from "react-ga"
// @ts-ignore
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
import { getUrlWithPage, URLHelper } from "./helpers/URLhelper"
import { TermsOfUse } from "./containers/TermsOfUse"
import { Contact } from "./containers/Contact"
import { CONFIG } from "./config"
import { Help } from "./containers/Help"
import { FAQ } from "./containers/FAQ"
import {
  AUCTION_CONTRACT_ADDRESS,
  CONTRACT_OWNER_ADDRESS,
} from "./constants/contracts"
import { StatsProvider } from "./stores/StatsProvider"

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
          <StatsProvider>
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
                      path="/toons/:name/page/:pageId"
                      component={ToonFamily}
                    />
                    <Route
                      exact
                      path="/toons/:familyName/:toonId"
                      component={Toon}
                    />
                    <Route path="/account/:address" component={Account} />

                    <Route
                      exact
                      path={getUrlWithPage(URLHelper.auctions, ":pageId")}
                    >
                      <Account
                        address={AUCTION_CONTRACT_ADDRESS}
                        url={URLHelper.auctions}
                      />
                    </Route>
                    <Route exact path={URLHelper.auctions}>
                      <Account
                        address={AUCTION_CONTRACT_ADDRESS}
                        url={URLHelper.auctions}
                      />
                    </Route>

                    <Route
                      exact
                      path={getUrlWithPage(URLHelper.genesis, ":pageId")}
                    >
                      <Account
                        address={CONTRACT_OWNER_ADDRESS}
                        url={URLHelper.genesis}
                      />
                    </Route>
                    <Route exact path={URLHelper.genesis}>
                      <Account
                        address={CONTRACT_OWNER_ADDRESS}
                        url={URLHelper.genesis}
                      />
                    </Route>

                    <Route path={URLHelper.about} component={About} />
                    <Route path={URLHelper.help} component={Help} />
                    <Route path={URLHelper.faq} component={FAQ} />
                    <Route path={URLHelper.terms} component={TermsOfUse} />
                    <Route path={URLHelper.contact} component={Contact} />
                    <Route path="/404" component={ErrorPage404} />
                    <Route component={ErrorPage404} />
                  </Switch>

                  {/*<FbMessenger />*/}
                  <Footer />
                </div>
              </ScrollToTop>
            </Router>
          </StatsProvider>
        </TransactionsProvider>
      </Web3Provider>
    )
  }
}

export default App
