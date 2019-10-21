import React, { Fragment } from 'react'
import { Grid, Image, Label } from 'semantic-ui-react'

function Card({ card, onOutboxClick, onInboxClick }: props) {
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
        {card.set_name.toUpperCase()}
      </p>
    </Grid.Column>
  )
}

export default Card
