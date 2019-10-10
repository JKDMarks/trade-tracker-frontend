import React, { Component } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import './App.css'

class App extends Component {
  state = {
    cardname: '',
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

  handleClick = e => {
    const cardID = e.target.closest("div.column").id

    debugger
  }

  render() {
    console.log(this.state)

    return (
      <div className="App" style={{textAlign: "center"}}>
        <h1><u>Trade Tracker</u></h1>

        <Form onSubmit={this.handleSubmit}>
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
            <Grid columns={Math.floor(window.innerWidth / 250)}>
                {
                  this.state.searchCards.map(card => (
                    <Grid.Column key={card.id} id={card.id}>
                      <img
                        style={{maxWidth: "250px"}}
                        onClick={this.handleClick}
                        src={card.image_uris.normal}
                      />
                    </Grid.Column>
                  ))
                }
            </Grid>
          ) : (null)
        }
      </div>
    )
  }
}

export default App
