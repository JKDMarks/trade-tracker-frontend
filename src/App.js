import React, { Component } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import './App.css'

class App extends Component {
  state = {
    cardname: '',
    tradeCards: [],
    searchCards: []
  }

  handleChange = (e, {value}) => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = () => {
    fetch(`https://api.scryfall.com/cards/search?q=${this.state.cardname} -is:funny game:paper&unique=prints`)
      .then(r => r.json())
      .then(json => {
        if (json.data) {
          this.setState({ searchCards: json.data })
        }
      })
  }

  handleAddClick = e => {
    const cardId = e.target.closest("div.column").id
    const tradeIdx = this.state.tradeCards.findIndex(card => card.id === cardId)

    if (tradeIdx === -1) {
      // IF THE CARD IS NOT YET IN tradeCards
      const addCard = this.state.searchCards.find(card => card.id === cardId)
      addCard.quantity = 1

      this.setState({ tradeCards: [...this.state.tradeCards, addCard] })
    } else {
      // IF THE CARD IS ALREADY IN tradeCards, INCREASE QUANTITY BY 1
      const cardCopy = {...this.state.tradeCards[tradeIdx]}
      cardCopy.quantity += 1

      const tradeCardsCopy = [
        ...this.state.tradeCards.slice(0, tradeIdx),
        cardCopy,
        ...this.state.tradeCards.slice(tradeIdx + 1)
      ]

      this.setState({ tradeCards: tradeCardsCopy })
    }
  }

  handleRemoveClick = e => {
    const cardId = e.target.closest("div.column").id
    const tradeIdx = this.state.tradeCards.findIndex(card => card.id === cardId)

    if (this.state.tradeCards[tradeIdx].quantity > 1) {
      const cardCopy = {...this.state.tradeCards[tradeIdx]}
      cardCopy.quantity -= 1

      const tradeCardsCopy = [
        ...this.state.tradeCards.slice(0, tradeIdx),
        cardCopy,
        ...this.state.tradeCards.slice(tradeIdx + 1)
      ]

      this.setState({ tradeCards: tradeCardsCopy })
    } else {
      const tradeCardsCopy = [
        ...this.state.tradeCards.slice(0, tradeIdx),
        ...this.state.tradeCards.slice(tradeIdx + 1)
      ]

      this.setState({ tradeCards: tradeCardsCopy })
    }
  }

  render() {
    // console.log(this.state)

    return (
      <div className="App" style={{textAlign: "center"}}>
        <h1><u>Trade Tracker</u></h1>

        {
          this.state.tradeCards.length > 0 ? (
            <Grid columns={Math.floor(window.innerWidth / 150)}>
                {
                  this.state.tradeCards.map(card => (
                    <Grid.Column
                      onClick={this.handleRemoveClick}
                      className="img-container"
                      key={card.id} id={card.id}
                      style={{maxWidth: "150px"}}
                    >
                      <img
                        style={{maxWidth: "100%"}}
                        onClick={this.handleRemoveClick}
                        src={card.image_uris.normal}
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
                      <img
                        style={{maxWidth: "100%"}}
                        onClick={this.handleAddClick}
                        src={card.image_uris.normal}
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
