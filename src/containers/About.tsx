import * as React from "react"
import backgroundBlue from "../assets/images/background-blue.jpg"
import toonsGang from "../assets/images/toons.png"
import { setDocumentTitle } from "../helpers/utils"
import howItsMadeImage from "../assets/images/how-its-made.svg"
import poweredByEthereum from "../assets/images/powered-by-ethereum.png"
import dappStoreLogo from "../assets/images/dappstore.svg"

type AboutProps = {}

class About extends React.PureComponent<AboutProps> {
  static defaultProps = {}

  componentDidMount() {
    setDocumentTitle("About")
  }

  render() {
    return (
      <div>
        <div
          className="containerWrapper About__Header"
          style={{
            backgroundImage: `url(${backgroundBlue})`,
            backgroundSize: "cover",
            padding: "100px 0",
          }}
        >
          <div className="container">
            <img
              src={toonsGang}
              alt="CryptoToons"
              style={{ maxWidth: "90%" }}
            />
          </div>
        </div>

        <div className="containerWrapper containerWrapper--gray">
          <div className="container text-center">
            <h1>
              <b>CryptoToons are digital art collectibles</b>
            </h1>
            <h2>with proof of ownership on the Ethereum blockchain</h2>
          </div>
        </div>

        <div className="containerWrapper">
          <div className="container container--small container--large-text text-justify">
            <p>
              A crypto-collectible is a{" "}
              <b>cryptographically unique, non-fungible digital asset</b>.
              Unlike cryptocurrencies, which require all tokens to be identical,
              each crypto-collectible token is unique or limited in quantity.
            </p>

            <h2>
              <b>Entertoonment!</b>
            </h2>
            <p>
              A team from The Netherlands (<a
                href="https://webcartoonsstudio.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                WebCartoons Studio
              </a>) and Poland (<a
                href="https://mindhouse.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Mindhouse
              </a>) united together to bring you this unique project, which
              combines the blockchain with cartoon fun.
            </p>
            <p>
              <b>
                Our toons are entertainment and we call it the enterTOONment!
              </b>{" "}
              When we look at nature, animals and daily human life we can’t stop
              laughing and creating. So much entertoonment around us! We started
              CryptoToons to tell people in a fun way more about crypto and the
              blockchain.
            </p>
            <p>Collect, trade or gift your toon to a friend!</p>

            <h2>
              <b>Toons Creation</b>
            </h2>
            <p>
              The characters are designed by combining different shapes, colors
              and layers to create a toon. Through combining different layers
              with each other there are billions of possible toons combinations
              and they all have their own DNA. This means your toon is always
              unique.
            </p>
            <img
              src={howItsMadeImage}
              alt="How the Toon is created"
              style={{ margin: "50px 0" }}
            />
            <p>
              You can trade or gift your toon to someone else but everyone's
              collection will be unique. Start collecting your Toons now!
            </p>
          </div>
        </div>

        <div className="containerWrapper">
          <div className="container text-center">
            <a
              href="https://ethereum.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={poweredByEthereum}
                alt="Powered by Ethereum"
                style={{ width: 400, maxWidth: "80%" }}
              />
            </a>
          </div>
        </div>
        <div className="containerWrapper">
          <div className="container text-center">
            <a
              href="https://dappstore.link/dapp/crypto-toons"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={dappStoreLogo}
                alt="DAppStore"
                style={{ width: 300, maxWidth: "80%", marginBottom: 100 }}
              />
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export { About }
