import React, { useState } from 'react'

export function useCards() {
  const [cards, setCards] = useState([])


  const findCardIdx = cardId => cards.findIndex(card => card.id === cardId)


  const addCard = cardId => {
    const cardIdx = findCardIdx(cardId)
    const cardToAdd = {...cards[cardIdx]}

    if (cardIdx === -1) {
      // IF cardToAdd IS NOT YET IN cards
      cardToAdd.quantity = 1

      setCards([ ...cards, cardToAdd ])
    } else {
      // IF cardToAdd IS ALREADY IN cards
      setCards([
        ...cards.slice(0, cardIdx),
        { ...cardToAdd, quantity: cardToAdd.quantity + 1 },
        ...cards.slice(cardIdx + 1)
      ])
    }
  }


  const removeCard = cardId => {
    const cardIdx = findCardIdx(cardId)
    const cardToRemove = {...cards[cardIdx]}

    if (cardToRemove.quantity === 1) {
      setCards([
        ...cards.slice(0, cardIdx),
        ...cards.slice(cardIdx + 1)
      ])
    } else {
      setCards([
        ...cards.slice(0, cardIdx),
        { ...cardToRemove, quantity: cardToRemove.quantity - 1 },
        ...cards.slice(cardIdx + 1)
      ])
    }
  }

  console.log(cards)

  return [cards, addCard, removeCard]
}
