import React from 'react'
import { Grid } from 'semantic-ui-react'

function TradeCardsContainer({ tradeCards, removeFrom }) {
  return (
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
  )
}

export default TradeCardsContainer
