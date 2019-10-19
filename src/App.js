import React, { Component, Fragment } from 'react'
import { Form, Grid, Image, Label } from 'semantic-ui-react'
import './App.css'

class App extends Component {
  state = {
    cardname: '',
    tradeAwayCards: [],
    tradeForCards: [],
    searchCards: []
  }

  handleChange = (e, {value}) => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = () => {
    fetch(`https://api.scryfall.com/cards/search?q=${this.state.cardname} -is:funny game:paper&unique=prints`)
      .then(r => r.json())
      .then(json => {
        if (json.data) {
          this.setState({ searchCards: json.data.slice(0, 50) })
        }
      })
  }

  handleTradeAwayClick = e => {
    const cardId = e.target.closest("div.column").id
    const tradeIdx = this.state.tradeAwayCards.findIndex(card => card.id === cardId)

    if (tradeIdx === -1) {
      // IF THE CARD IS NOT YET IN tradeAwayCards
      const addCard = this.state.searchCards.find(card => card.id === cardId)
      addCard.quantity = 1

      this.setState({ tradeAwayCards: [...this.state.tradeAwayCards, addCard] })
    } else {
      // IF THE CARD IS ALREADY IN tradeAwayCards, INCREASE QUANTITY BY 1
      const cardCopy = {...this.state.tradeAwayCards[tradeIdx]}
      cardCopy.quantity += 1

      const tradeAwayCardsCopy = [
        ...this.state.tradeAwayCards.slice(0, tradeIdx),
        cardCopy,
        ...this.state.tradeAwayCards.slice(tradeIdx + 1)
      ]

      this.setState({ tradeAwayCards: tradeAwayCardsCopy })
    }
  }

  handleTradeForClick = e => {
    const cardId = e.target.closest("div.column").id
    const tradeIdx = this.state.tradeForCards.findIndex(card => card.id === cardId)

    if (tradeIdx === -1) {
      // IF THE CARD IS NOT YET IN tradeForCards
      const addCard = this.state.searchCards.find(card => card.id === cardId)
      addCard.quantity = 1

      this.setState({ tradeForCards: [...this.state.tradeForCards, addCard] })
    } else {
      // IF THE CARD IS ALREADY IN tradeForCards, INCREASE QUANTITY BY 1
      const cardCopy = {...this.state.tradeForCards[tradeIdx]}
      cardCopy.quantity += 1

      const tradeForCardsCopy = [
        ...this.state.tradeForCards.slice(0, tradeIdx),
        cardCopy,
        ...this.state.tradeForCards.slice(tradeIdx + 1)
      ]

      this.setState({ tradeForCards: tradeForCardsCopy })
    }
  }

  handleRemoveClick = (e, forOrAway) => {
    if (forOrAway === "away") {
      const cardId = e.target.closest("div.column").id
      const tradeIdx = this.state.tradeAwayCards.findIndex(card => card.id === cardId)

      if (this.state.tradeAwayCards[tradeIdx].quantity > 1) {
        const cardCopy = {...this.state.tradeAwayCards[tradeIdx]}
        cardCopy.quantity -= 1

        const tradeAwayCardsCopy = [
          ...this.state.tradeAwayCards.slice(0, tradeIdx),
          cardCopy,
          ...this.state.tradeAwayCards.slice(tradeIdx + 1)
        ]

        this.setState({ tradeAwayCards: tradeAwayCardsCopy })
      } else {
        const tradeAwayCardsCopy = [
          ...this.state.tradeAwayCards.slice(0, tradeIdx),
          ...this.state.tradeAwayCards.slice(tradeIdx + 1)
        ]

        this.setState({ tradeAwayCards: tradeAwayCardsCopy })
      }
    } else {
      const cardId = e.target.closest("div.column").id
      const tradeIdx = this.state.tradeForCards.findIndex(card => card.id === cardId)

      if (this.state.tradeForCards[tradeIdx].quantity > 1) {
        const cardCopy = {...this.state.tradeForCards[tradeIdx]}
        cardCopy.quantity -= 1

        const tradeForCardsCopy = [
          ...this.state.tradeForCards.slice(0, tradeIdx),
          cardCopy,
          ...this.state.tradeForCards.slice(tradeIdx + 1)
        ]

        this.setState({ tradeForCards: tradeForCardsCopy })
      } else {
        const tradeForCardsCopy = [
          ...this.state.tradeForCards.slice(0, tradeIdx),
          ...this.state.tradeForCards.slice(tradeIdx + 1)
        ]

        this.setState({ tradeForCards: tradeForCardsCopy })
      }
    }
  }

  render() {
    // console.log(this.state)

    return (
      <div className="App" style={{textAlign: "center"}}>
        <h1><u>Trade Tracker</u></h1>

        <Grid columns={2} relaxed='very'>
          <Grid.Column centered>
            <h3><u>Trade Away</u></h3>
              {
                this.state.tradeAwayCards.length > 0 ? (
                  <Grid columns={Math.floor(window.innerWidth / 250)}>
                      {
                        this.state.tradeAwayCards.map(card => (
                          <Grid.Column
                            onClick={e => this.handleRemoveClick(e, "away")}
                            className="img-container"
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
                this.state.tradeForCards.length > 0 ? (
                  <Grid columns={Math.floor(window.innerWidth / 250)}>
                      {
                        this.state.tradeForCards.map(card => (
                          <Grid.Column
                            onClick={e => this.handleRemoveClick(e, "for")}
                            className="img-container"
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


        <Form className="center-horiz" onSubmit={this.handleSubmit} style={{maxWidth: "50%"}}>
          <Form.Input
            label="Card Name"
            value={this.state.cardname}
            onChange={this.handleChange}
            name="cardname"
          />

          <Form.Button>
            Search
          </Form.Button>
        </Form>

        {
          this.state.searchCards.length > 0 ? (
            <div>
            <Grid centered columns={Math.floor(window.innerWidth / 250)}>
                {
                  this.state.searchCards.map(card => (
                    <Grid.Column key={card.id} id={card.id} style={{maxWidth: "250px"}}>
                      <Image
                        style={{maxWidth: "100%"}}
                        label={
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
}

export default App
