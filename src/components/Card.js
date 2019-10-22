import React, { Fragment } from 'react'
import { Grid, Image, Label } from 'semantic-ui-react'

function Card({ card, onOutboxClick, onInboxClick, isFoil }) {
  return (
    <Grid.Column className="has-id img-container" key={card.id} id={card.id} style={{maxWidth: "250px"}}>
      <Image
        style={{maxWidth: "100%"}}
        label={
          <Fragment>
            <Label
              onClick={onOutboxClick}
              corner='left' as='a' color='red' size='huge'
              icon={<img src="/outbox.png" alt="outbox" style={{maxHeight: "100%", maxWidth: "100%"}}/>}
            />
            <Label
              onClick={onInboxClick}
              corner='right' as='a' color='red' size='huge'
              icon={<img src="/inbox.png" alt="inbox" style={{float: "right", maxHeight: "100%", maxWidth: "100%"}}/>}
            />
          </Fragment>
        }
        src={card.image_uris ? card.image_uris.normal : card.card_faces[0].image_uris.normal}
        alt="card in search"
      />

      <p className="text-on-img" style={{fontSize: "25px", maxWidth: "100%", textAlign: "center"}}>
        {`$${isFoil ? card.prices.usd_foil : card.prices.usd}`}
        <br/>
        {
          isFoil &&
          <Fragment>
            FOIL
            <br/>
          </Fragment>
        }
        {card.set_name.toUpperCase()}
      </p>

      {
        isFoil &&
        <img className="text-on-img" src="./foil-effect.png" alt="foil effect" style={{maxHeight: "93%", maxWidth: "93%", filter: "contrast(1.25)"}}/>
      }
    </Grid.Column>
  )
}

export default Card
