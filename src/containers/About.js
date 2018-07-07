// @flow
import * as React from "react"
import backgroundBlue from "../assets/images/background-blue.jpg"
import toonsGang from "../assets/images/toons.png"
import { Col, Row } from "antd"

type AboutProps = {}

class About extends React.PureComponent<AboutProps> {
  static defaultProps = {}

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

        <div className="containerWrapper">
          <div className="container container--large-text text-justify">
            <Row type="flex" justify="center">
              <Col
                xs={{ span: 24 }}
                sm={{ span: 20 }}
                md={{ span: 16 }}
                lg={{ span: 14 }}
              >
                <h1 className="text-center">
                  <b>About CryptoToons</b>
                </h1>
                <p>
                  Lorem Ipsum is slechts een proeftekst uit het drukkerij- en
                  zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze
                  bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een
                  zethaak met letters nam en ze door elkaar husselde om een
                  font-catalogus te maken. Het heeft niet alleen vijf eeuwen
                  overleefd maar is ook, vrijwel onveranderd, overgenomen in
                  elektronische letterzetting. Het is in de jaren '60 populair
                  geworden met de introductie van Letraset vellen met Lorem
                  Ipsum passages en meer recentelijk door desktop publishing
                  software zoals Aldus PageMaker die versies van Lorem Ipsum
                  bevatten.
                </p>
                <p>
                  In tegenstelling tot wat algemeen aangenomen wordt is Lorem
                  Ipsum niet zomaar willekeurige tekst. het heeft zijn wortels
                  in een stuk klassieke latijnse literatuur uit 45 v.Chr. en is
                  dus meer dan 2000 jaar oud. Richard McClintock, een professor
                  latijn aan de Hampden-Sydney College in Virginia, heeft één
                  van de meer obscure latijnse woorden, consectetur, uit een
                  Lorem Ipsum passage opgezocht, en heeft tijdens het zoeken
                  naar het woord in de klassieke literatuur de onverdachte bron
                  ontdekt. Lorem Ipsum komt uit de secties 1.10.32 en 1.10.33
                  van "de Finibus Bonorum et Malorum" (De uitersten van goed en
                  kwaad) door Cicero, geschreven in 45 v.Chr. Dit boek is een
                  verhandeling over de theorie der ethiek, erg populair tijdens
                  de renaissance. De eerste regel van Lorem Ipsum, "Lorem ipsum
                  dolor sit amet..", komt uit een zin in sectie 1.10.32.
                </p>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

export { About }
