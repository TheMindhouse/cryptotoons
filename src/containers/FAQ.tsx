import * as React from "react"
import { ReactNode } from "react"
import { Anchor, Col, Divider, Row } from "antd"
import { URLHelper } from "../helpers/URLhelper"
import { Link } from "react-router-dom"
import { setDocumentTitle } from "../helpers/utils"
import { slugify } from "../helpers/strings"

type Props = {}

const FAQ_QUESTIONS: [string, ReactNode][] = [
  [
    "What are CryptoToons?",
    <p>
      CryptoToons are digital art collectibles living on the Ethereum
      blockchain. You can collect and trade characters from many toon families.
      Each toon is unique and can be owned by only one person at a time.
    </p>,
  ],
  [
    "How do I buy a toon?",
    <p>
      Go to the toon family where you want a toon from and find a toon that you
      like and which is currently on sale. Go to the page of the selected toon
      and click the “Buy now” button.
    </p>,
  ],
  [
    "Why is the “Buy now” button disabled?",
    <p>
      You probably don’t have MetaMask installed on your computer. MetaMask is a
      small browser extension which enables the browser to interact with the
      blockchain. Find more information on getting started on the{" "}
      <Link to={URLHelper.help}>Help</Link> page.
    </p>,
  ],
  [
    "What is the price of a toon?",
    <p>
      The price of the crypto toon can change with time. The owner of the toon
      sets a starting price, an ending price and a duration of the transition
      period. During that period, the price will gradually go down (or up, if
      the ending price is higher than the starting one) until it reaches the
      ending price. The current price of the toon is always displayed above the
      chart as the “Buy now price”.
    </p>,
  ],
  [
    "Can I still buy a toon when the price reaches an end?",
    <p>
      Yes, you can still buy the toon for the ending price. Once the transition
      period from the starting price to the ending price is over, the price just
      stops changing.
    </p>,
  ],
  [
    "How can I sell a toon?",
    <p>
      Go to “My Account”, select the toon you want to sell and click on the
      button “Sell Toon”. Set the starting and ending prices of the toon and the
      duration for which the price will be changing. Toon collectors will be
      able to buy your toon until you manually cancel the auction.
    </p>,
  ],
  [
    "How can I give a toon to someone for free?",
    <p>
      If you want to send a toon as a gift, go to “My Account”, select the toon
      and click on the button “Gift Toon”. Enter the address to which you want
      to send the toon and confirm the operation.
    </p>,
  ],
  [
    "Are there any fees?",
    <p>
      When you trade toons, we take a small commission of 3.9% from the selling
      price.
    </p>,
  ],
  [
    "Is every toon unique?",
    <p>
      Yes. Every toon is unique with a proof of ownership on the blockchain and
      100% owned by you; it cannot be replicated, taken away, or destroyed.{" "}
    </p>,
  ],
  [
    "Can I collect more than 1 toon of a family (for example 2 CryptoCows)?",
    <p>
      Yes, collect as many toons as you want and create a great collection!
    </p>,
  ],
  [
    "Will there be more toon families in the future?",
    <p>
      Yes, we will keep creating new toon families in the future so you can
      collect an amazing toon collection. Follow us on social media to receive
      notifications about new toon releases!
    </p>,
  ],
  [
    "Can I suggest a toon family?",
    <p>
      Yes, if you have an awesome toon character idea share it with us through
      our social media channels or{" "}
      <Link to={URLHelper.contact}>contact us</Link> directly.
    </p>,
  ],
  [
    "Can I create a new toon family?",
    <p>
      Yes! If you are an artist who wants to participate in the blockchain
      revolution and entertoon people, we are open to cooperation.{" "}
      <Link to={URLHelper.contact}>Contact us</Link> and tell us about your
      idea.
    </p>,
  ],
  [
    "Where do you guys get the inspiration from?",
    <p>
      Just when we look to nature, animals and daily humans life we can’t stop
      laughing and creating. So much entertoonment around us!
    </p>,
  ],
]

class FAQ extends React.PureComponent<Props> {
  static defaultProps = {}

  componentDidMount() {
    setDocumentTitle("FAQ")
  }

  render() {
    return (
      <div>
        <div className="containerWrapper containerWrapper--gray">
          <div className="container">
            <h1>
              <b>FAQ</b>
            </h1>
            <h3 className="color-lgray">
              If you don't find an answer to your question, don't hesitate to{" "}
              <Link to={URLHelper.contact}>contact us</Link>.
            </h3>
          </div>
        </div>

        <div className="containerWrapper">
          <div className="container container--large-text">
            <Row gutter={30}>
              <Col xs={24} sm={24} md={8}>
                <Anchor style={{ paddingTop: 20 }}>
                  {FAQ_QUESTIONS.map((question, index: number) => (
                    <Anchor.Link
                      href={`#${slugify(question[0])}`}
                      title={question[0]}
                      key={index}
                    />
                  ))}
                </Anchor>
              </Col>
              <Col xs={24} sm={24} md={16}>
                {FAQ_QUESTIONS.map((question, index: number) => (
                  <div
                    key={index}
                    id={slugify(question[0])}
                    style={{ paddingTop: 10, marginBottom: 20 }}
                  >
                    <h2>
                      <b>{question[0]}</b>
                    </h2>
                    {question[1]}
                    <Divider dashed />
                  </div>
                ))}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

export { FAQ }
