// @flow
import * as React from "react"
import { Col, Row } from "antd"
import { setDocumentTitle } from "../helpers/utils"
import {
  AUCTION_CONTRACT_ADDRESS,
  TOON_CONTRACT_ADDRESSES,
} from "../constants/contracts"
import { EtherscanContractLink } from "../components/Small/EtherscanContractLink"

type TermsOfUseProps = {}

class TermsOfUse extends React.PureComponent<TermsOfUseProps> {
  static defaultProps = {}

  componentDidMount() {
    setDocumentTitle("Terms Of Use")
  }

  render() {
    return (
      <div>
        <div className="containerWrapper containerWrapper--gray">
          <div className="container text-center">
            <h1>
              <b>Terms of Use</b>
            </h1>
            <h3 className="color-lgray">Last Updated: July 31th, 2018</h3>
          </div>
        </div>

        <div className="containerWrapper">
          <div className="container container--large-text text-justify">
            <Row type="flex" justify="center">
              <Col
                xs={{ span: 24 }}
                sm={{ span: 20 }}
                md={{ span: 16 }}
                lg={{ span: 14 }}
              >
                <h2>
                  <b>1. Intro</b>
                </h2>
                <p>
                  CryptoToons are crypto collectibles (<b>"Toons"</b>) with
                  proof of ownership stored on the Ethereum blockchain.
                </p>
                <p>
                  This agreement does a few things. First, it passes copyright
                  ownership of a Toon from CryptoToons to the Toon Owner. The
                  Toon Owner has the copyright toon ownership. It limits the
                  rights of Toon Owners to sue CryptoToons, WebCartoons Studio
                  and The Mindhouse.
                </p>
                <p>
                  CryptoToons are not an investment. They are digital art
                  collectibles.
                </p>
                <p>
                  PLEASE READ THESE TERMS CAREFULLY BEFORE USING THE APP, THE
                  SMART CONTRACTS, OR THE SITE. BY USING THE APP, THE SMART
                  CONTRACTS, THE SITE, OR ANY PART OF THEM YOU ARE CONFIRMING
                  THAT YOU UNDERSTAND AND AGREE TO BE BOUND BY ALL OF THESE
                  TERMS. IF YOU ARE ACCEPTING THESE TERMS ON BEHALF OF A COMPANY
                  OR OTHER LEGAL ENTITY, YOU REPRESENT THAT YOU HAVE THE LEGAL
                  AUTHORITY TO ACCEPT THESE TERMS ON THAT ENTITY’S BEHALF, IN
                  WHICH CASE "YOU" WILL MEAN THAT ENTITY. IF YOU DO NOT HAVE
                  SUCH AUTHORITY, OR IF YOU DO NOT ACCEPT ALL OF THESE TERMS,
                  THEN WE ARE UNWILLING TO MAKE THE APP, THE SMART CONTRACTS, OR
                  THE SITE AVAILABLE TO YOU. IF YOU DO NOT AGREE TO THESE TERMS,
                  YOU MAY NOT ACCESS OR USE THE APP, THE SMART CONTRACTS, OR THE
                  SITE.
                </p>

                {/* ################################################################################################ */}

                <h2>
                  <b>2. Definitions</b>
                </h2>

                <p>
                  <b>"Smart Contract"</b> means a set of smart contracts on the
                  Ethereum blockchain at the following addresses:
                </p>
                <ul>
                  <li>
                    {
                      <EtherscanContractLink
                        address={AUCTION_CONTRACT_ADDRESS}
                      />
                    }
                  </li>
                  {Object.keys(TOON_CONTRACT_ADDRESSES)
                    .map((key: string): string => TOON_CONTRACT_ADDRESSES[key])
                    .filter((address: string) => address)
                    .map((address: string) => (
                      <li>
                        <EtherscanContractLink address={address} />
                      </li>
                    ))}
                </ul>
                <p>
                  <b>"Toon"</b> means a collectible cartoon created by the
                  CryptoToons with a proof of ownership stored in the Smart
                  Contract.
                </p>
                <p>
                  <b>"Toon Owner"</b> means the person that can
                  cryptographically prove ownership of the Toon. Specifically,
                  Toon Owner means the person with the private key for the
                  address in the "owner" field of the applicable Toon in the
                  Smart Contract.
                </p>
                <p>
                  <b>"The App"</b> means collectively the Smart Contract and the
                  website created by WebCartoons Studio and The Mindhouse to
                  interact with the Smart Contract.
                </p>

                {/* ################################################################################################ */}

                <h2>
                  <b>3. Intellectual Property</b>
                </h2>

                <p>
                  When the Toon Owner transfers the Toon to a new owner, the
                  Toon Owner hereby agrees to assign all copyright ownership to
                  the new toon owner. In exchange for these rights, the new
                  owner shall agree to become the Toon Owner, and shall agree to
                  be subject to this Terms of Use.
                </p>
                <p>
                  The Toon Owner agrees to allow CryptoToons fans to make
                  non-commercial Use of images of the Toon to discuss
                  CryptoToons, digital collectibles and related matters. "Use"
                  means to reproduce, display, transmit, and distribute images
                  of the Toons. This permission excludes the right to print the
                  Canvas onto physical copies (including, for example, shirts
                  and posters).
                </p>

                {/* ################################################################################################ */}

                <h2>
                  <b>4. Fees and Payment</b>
                </h2>

                <p>
                  A. If you choose to collect or trade Toons, any financial
                  transactions that you engage in will be conducted solely
                  through the Ethereum network via MetaMask. We will have no
                  insight into or control over these payments or transactions,
                  nor do we have the ability to reverse any transactions. With
                  that in mind, we will have no liability to you or to any third
                  party for any claims or damages that may arise as a result of
                  any transactions that you engage in via the App, or using the
                  Smart Contracts, or any other transactions that you conduct
                  via the Ethereum network or MetaMask.
                </p>
                <p>
                  B. Ethereum requires the payment of a transaction fee (a "Gas
                  Fee") for every transaction that occurs on the Ethereum
                  network. The Gas Fee funds the network of computers that run
                  the decentralized Ethereum network. This means that you will
                  need to pay a Gas Fee for each transaction that occurs via the
                  App.
                </p>
                <p>
                  C. In addition to the Gas Fee, each time you sell a Toon to
                  another user of the App, you authorize us to collect a fee of
                  3.9% of the total value of that transaction.
                </p>

                {/* ################################################################################################ */}

                <h2>
                  <b>5. Disclaimers</b>
                </h2>

                <p>
                  A. YOU EXPRESSLY UNDERSTAND AND AGREE THAT YOUR ACCESS TO AND
                  USE OF THE APP IS AT YOUR SOLE RISK, AND THAT THE APP IS
                  PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY
                  KIND, WHETHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT
                  PERMISSIBLE PURSUANT TO APPLICABLE LAW, WE, OUR SUBSIDIARIES,
                  AFFILIATES, AND LICENSORS MAKE NO EXPRESS WARRANTIES AND
                  HEREBY DISCLAIM ALL IMPLIED WARRANTIES REGARDING THE APP AND
                  ANY PART OF IT (INCLUDING, WITHOUT LIMITATION, THE SITE, ANY
                  SMART CONTRACT, OR ANY EXTERNAL WEBSITES), INCLUDING THE
                  IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                  PARTICULAR PURPOSE, NON-INFRINGEMENT, CORRECTNESS, ACCURACY,
                  OR RELIABILITY. WITHOUT LIMITING THE GENERALITY OF THE
                  FOREGOING, WE, OUR SUBSIDIARIES, AFFILIATES, AND LICENSORS DO
                  NOT REPRESENT OR WARRANT TO YOU THAT: (I) YOUR ACCESS TO OR
                  USE OF THE APP WILL MEET YOUR REQUIREMENTS, (II) YOUR ACCESS
                  TO OR USE OF THE APP WILL BE UNINTERRUPTED, TIMELY, SECURE OR
                  FREE FROM ERROR, (III) USAGE DATA PROVIDED THROUGH THE APP
                  WILL BE ACCURATE, (III) THE APP OR ANY CONTENT, SERVICES, OR
                  FEATURES MADE AVAILABLE ON OR THROUGH THE APP ARE FREE OF
                  VIRUSES OR OTHER HARMFUL COMPONENTS, OR (IV) THAT ANY DATA
                  THAT YOU DISCLOSE WHEN YOU USE THE APP WILL BE SECURE. SOME
                  JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES
                  IN CONTRACTS WITH CONSUMERS, SO SOME OR ALL OF THE ABOVE
                  EXCLUSIONS MAY NOT APPLY TO YOU.
                </p>
                <p>
                  B. YOU ACCEPT THE INHERENT SECURITY RISKS OF PROVIDING
                  INFORMATION AND DEALING ONLINE OVER THE INTERNET, AND AGREE
                  THAT WE HAVE NO LIABILITY OR RESPONSIBILITY FOR ANY BREACH OF
                  SECURITY UNLESS IT IS DUE TO OUR GROSS NEGLIGENCE.
                </p>
                <p>
                  C. WE WILL NOT BE RESPONSIBLE OR LIABLE TO YOU FOR ANY LOSSES
                  YOU INCUR AS THE RESULT OF YOUR USE OF THE ETHEREUM NETWORK OR
                  THE METAMASK ELECTRONIC WALLET, INCLUDING BUT NOT LIMITED TO
                  ANY LOSSES, DAMAGES OR CLAIMS ARISING FROM: (A) USER ERROR,
                  SUCH AS FORGOTTEN PASSWORDS OR INCORRECTLY CONSTRUED SMART
                  CONTRACTS OR OTHER TRANSACTIONS; (B) SERVER FAILURE OR DATA
                  LOSS; (C) CORRUPTED WALLET FILES; (D) UNAUTHORIZED ACCESS OR
                  ACTIVITIES BY THIRD PARTIES, INCLUDING BUT NOT LIMITED TO THE
                  USE OF VIRUSES, PHISHING, BRUTEFORCING OR OTHER MEANS OF
                  ATTACK AGAINST THE APP, ETHEREUM NETWORK, OR THE METAMASK
                  ELECTRONIC WALLET.
                </p>
                <p>
                  D. CRYPTOTOONS ARE INTANGIBLE DIGITAL ASSETS THAT EXIST ONLY
                  BY VIRTUE OF THE OWNERSHIP RECORD MAINTAINED IN THE ETHEREUM
                  NETWORK. ALL SMART CONTRACTS ARE CONDUCTED AND OCCUR ON THE
                  DECENTRALIZED LEDGER WITHIN THE ETHEREUM PLATFORM. WE HAVE NO
                  CONTROL OVER AND MAKE NO GUARANTEES OR PROMISES WITH RESPECT
                  TO SMART CONTRACTS.
                </p>
                <p>
                  E. THE MINDHOUSE AND WEBCARTOONS STUDIO IS NOT RESPONSIBLE FOR
                  LOSSES DUE TO BLOCKCHAINS OR ANY OTHER FEATURES OF THE
                  ETHEREUM NETWORK OR THE METAMASK ELECTRONIC WALLET, INCLUDING
                  BUT NOT LIMITED TO LATE REPORT BY DEVELOPERS OR
                  REPRESENTATIVES (OR NO REPORT AT ALL) OF ANY ISSUES WITH THE
                  BLOCKCHAIN SUPPORTING THE ETHEREUM NETWORK, INCLUDING FORKS,
                  TECHNICAL NODE ISSUES, OR ANY OTHER ISSUES HAVING FUND LOSSES
                  AS A RESULT.
                </p>

                {/* ################################################################################################ */}

                <h2>
                  <b>6. Limitation of Liability</b>
                </h2>

                <p>
                  YOU UNDERSTAND AND AGREE THAT WE, OUR SUBSIDIARIES,
                  AFFILIATES, AND LICENSORS WILL NOT BE LIABLE TO YOU OR TO ANY
                  THIRD PARTY FOR ANY CONSEQUENTIAL, INCIDENTAL, INDIRECT,
                  EXEMPLARY, SPECIAL, PUNITIVE, OR ENHANCED DAMAGES, OR FOR ANY
                  LOSS OF ACTUAL OR ANTICIPATED PROFITS (REGARDLESS OF HOW THESE
                  ARE CLASSIFIED AS DAMAGES), WHETHER ARISING OUT OF BREACH OF
                  CONTRACT, TORT (INCLUDING NEGLIGENCE), OR OTHERWISE,
                  REGARDLESS OF WHETHER SUCH DAMAGE WAS FORESEEABLE AND WHETHER
                  EITHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH
                  DAMAGES.
                </p>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

export { TermsOfUse }
