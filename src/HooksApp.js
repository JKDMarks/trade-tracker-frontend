import React, { useState, useEffect, Fragment } from 'react'
import { Form, Grid, Image, Label } from 'semantic-ui-react'
import { useCards } from './useCustom'

function HooksApp() {
  const [query, setQuery] = useState('')
  const [url, setUrl] = useState(`https://api.scryfall.com/cards/search?q=${query} -is:funny game:paper&unique=prints`)
  const [searchCards, setSearchCards] = useState([])

  const findCardIdx = cardId => searchCards.findIndex(card => card.id === cardId)

  const [tradeAwayCards, addToTradeAway, removeFromTradeAway] = useCards([])
  const [tradeForCards, addToTradeFor, removeFromTradeFor] = useCards([])

  useEffect(() => {
    async function fetchCards() {
      const resp = await fetch(url)
      const json = await resp.json()

      setSearchCards(json.data.slice(0, 50))
    }

    fetchCards()
  }, [url])

  return (
    <div className="App" style={{textAlign: "center"}}>
      <h1><u>Trade Tracker</u></h1>

        <Grid columns={2} relaxed='very'>
          <Grid.Column centered>
            <h3><u>Trade Away</u></h3>
              {
                tradeAwayCards.length > 0 ? (
                  <Grid columns={Math.floor(window.innerWidth / 250)}>
                      {
                        tradeAwayCards.map(card => (
                          <Grid.Column
                            onClick={e => removeFromTradeAway(e.target.closest(".has-id").id)}
                            className="img-container has-id"
                            key={card.id} id={card.id}
                            style={{maxWidth: "150px"}}
                          >
                            <img
                              style={{maxWidth: "100%"}}
                              src={card.image_uris ? card.image_uris.normal : card.card_faces[0].image_uris.normal}
                              alt="card in trades"
                            />

                            <p
                              className="text-on-img"
                              style={{fontSize: "100px"}}
                            >
                              {card.quantity}
                            </p>
                          </Grid.Column>
                        ))
                      }
                  </Grid>
                ) : (null)
              }
          </Grid.Column>

          <Grid.Column centered>
            <h3><u>Trade For</u></h3>
              {
                tradeForCards.length > 0 ? (
                  <Grid columns={Math.floor(window.innerWidth / 250)}>
                      {
                        tradeForCards.map(card => (
                          <Grid.Column
                            onClick={e => removeFromTradeFor(e.target.closest(".has-id").id)}
                            className="img-container has-id"
                            key={card.id} id={card.id}
                            style={{maxWidth: "150px"}}
                          >
                            <img
                              style={{maxWidth: "100%"}}
                              src={card.image_uris ? card.image_uris.normal : card.card_faces[0].image_uris.normal}
                              alt="card in trades"
                            />

                            <p
                              className="text-on-img"
                              style={{fontSize: "100px"}}
                            >
                              {card.quantity}
                            </p>
                          </Grid.Column>
                        ))
                      }
                  </Grid>
                ) : (null)
              }
          </Grid.Column>
        </Grid>

      <Form onSubmit={() => setUrl(`https://api.scryfall.com/cards/search?q=${query} -is:funny game:paper&unique=prints`)} className="center-horiz" style={{maxWidth: "50%"}}>
        <Form.Input
          label="Card Name"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        <Form.Button>
          Search
        </Form.Button>
      </Form>

      {
        searchCards.length > 0 ? (
          <div>
            <Grid centered columns={Math.floor(window.innerWidth / 250)}>
                {
                  searchCards.map(card => (
                    <Grid.Column className="has-id" key={card.id} id={card.id} style={{maxWidth: "250px"}}>
                      <Image
                        style={{maxWidth: "100%"}}
                        label={
                          <Fragment>
                            <Label
                              onClick={e => addToTradeAway(searchCards[findCardIdx(e.target.closest(".has-id").id)])}
                              corner='left' as='a' color='red' size='huge'
                              icon={<img src="/outbox.png" alt="outbox" style={{maxHeight: "100%", maxWidth: "100%"}}/>}
                            />
                            <Label
                              onClick={e => addToTradeFor(searchCards[findCardIdx(e.target.closest(".has-id").id)])}
                              corner='right' as='a' color='red' size='huge'
                              icon={<img src="/inbox.png" alt="inbox" style={{float: "right", maxHeight: "100%", maxWidth: "100%"}}/>}
                            />
                          </Fragment>
                        }
                        src={card.image_uris ? card.image_uris.normal : card.card_faces[0].image_uris.normal}
                        alt="card in search"
                      />
                    </Grid.Column>
                  ))
                }
            </Grid>
          </div>
        ) : (null)
      }
    </div>
  )
}

export default HooksApp
