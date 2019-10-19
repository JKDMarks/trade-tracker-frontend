import React, { useState, useEffect } from 'react'
import { Form, Grid, Image, Label } from 'semantic-ui-react'


function HooksApp() {
  const [query, setQuery] = useState('')
  const [url, setUrl] = useState(`https://api.scryfall.com/cards/search?q=${query} -is:funny game:paper&unique=prints`)
  const [searchCards, setSearchCards] = useState([])

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
                    <Grid.Column key={card.id} id={card.id} style={{maxWidth: "250px"}}>
                      <Image
                        style={{maxWidth: "100%"}}
                        label={null/*
                          <Fragment>
                            <Label
                              onClick={this.handleTradeAwayClick}
                              corner='left' as='a' color='red' size='huge'
                              icon={<img src="/outbox.png" alt="outbox" style={{maxHeight: "100%", maxWidth: "100%"}}/>}
                            />
                            <Label
                              onClick={this.handleTradeForClick}
                              corner='right' as='a' color='red' size='huge'
                              icon={<img src="/inbox.png" alt="inbox" style={{float: "right", maxHeight: "100%", maxWidth: "100%"}}/>}
                            />
                          </Fragment>
                        */}
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
