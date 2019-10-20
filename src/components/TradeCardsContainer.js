import React, { Fragment } from 'react'
import { Grid } from 'semantic-ui-react'

function TradeCardsContainer({ title, tradeCards, removeFrom }) {
  const tradeTotal = tradeCards.reduce((total, card) => {
  	const newTotal = Number(total) + Number(card.prices.usd)

  	return newTotal.toFixed(2)
  }, 0)

  return (
    <Fragment>
      <h3 style={{margin: "0px"}}><u>{title}</u></h3>

      <p style={{margin: "0px"}}>{`Total: $${tradeTotal}`}</p>

      <Grid columns={Math.floor(window.innerWidth / 250)}>
          {
            tradeCards.map(card => (
              <Grid.Column
                onClick={removeFrom}
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
    </Fragment>
  )
}

export default TradeCardsContainer
