import React, { useState, useEffect, Fragment } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import { useCards } from './useCustom'
import './App.css'

import TradeCardsContainer from './components/TradeCardsContainer'
import Card from './components/Card'

function App() {
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

  const tradeTotal = cards => cards.reduce((total, card) => {
    const newTotal = Number(total) + (Number(card.price) * Number(card.quantity))

    return newTotal.toFixed(2)
  }, 0)

  const tradeAwayTotal = tradeTotal(tradeAwayCards)
  const tradeForTotal = tradeTotal(tradeForCards)

  const tradeDiff = () => {
    const diffBy = (tradeAwayTotal - tradeForTotal).toFixed(2)

    if (diffBy > 0) {
      return <p>You need to add ${diffBy}</p>
    } else if (diffBy === 0) {
      return <p>This trade is exactly even!</p>
    } else if (diffBy < 0) {
      return <p>Your trade partner needs to add ${-diffBy}</p>
    }
  }

  return (
    <div className="App" style={{textAlign: "center", margin: "10px"}}>
      <h1><u>Trade Tracker</u></h1>

      {tradeDiff()}

      <Grid columns={2} relaxed='very'>
        <Grid.Column centered>
          {
            <TradeCardsContainer
              title={"Cards You're Trading Away"}
              tradeCards={tradeAwayCards}
              tradeTotal={tradeAwayTotal}
              removeFrom={
                e => removeFromTradeAway(e.target.closest(".has-id").id)
              }
            />
          }
        </Grid.Column>

        <Grid.Column centered>
          {
            <TradeCardsContainer
              title={"Cards You're Trading For"}
              tradeCards={tradeForCards}
              tradeTotal={tradeForTotal}
              removeFrom={
                e => removeFromTradeFor(e.target.closest(".has-id").id)
              }
            />
          }
        </Grid.Column>
      </Grid>


      <Form
        onSubmit={() => setUrl(`https://api.scryfall.com/cards/search?q=${query} -is:funny game:paper&unique=prints`)}
        className="center-horiz" style={{maxWidth: "50%", margin: "10px"}}
      >
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
                    <Fragment key={card.id}>
                      {
                        card.prices.usd &&
                        <Card card={card}
                          onOutboxClick={e => addToTradeAway(searchCards[findCardIdx(e.target.closest(".has-id").id)])}
                          onInboxClick={e => addToTradeFor(searchCards[findCardIdx(e.target.closest(".has-id").id)])}
                        />
                      }
                      {
                        /* SECOND ARG OF addToTrade() true IF PRICE isFoil */
                        card.prices.usd_foil &&
                        <Card card={card} isFoil={true}
                          onOutboxClick={e => addToTradeAway(searchCards[findCardIdx(e.target.closest(".has-id").id)], true)}
                          onInboxClick={e => addToTradeFor(searchCards[findCardIdx(e.target.closest(".has-id").id)], true)}
                        />
                      }
                    </Fragment>
                  ))
                }
            </Grid>
          </div>
        ) : (null)
      }
    </div>
  )
}

export default App
