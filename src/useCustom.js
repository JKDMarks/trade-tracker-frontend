import React, { useState } from 'react'

export function useCards() {
  const [cards, setCards] = useState([])

  const findCardIdx = findCard => cards.findIndex(card => card.id === findCard.id)


  const addCard = cardToAdd => {
    const cardIdx = findCardIdx(cardToAdd)

    if (cardIdx === -1) {
      // IF cardToAdd IS NOT YET IN cards
      setCards([ ...cards, { ...cardToAdd, quantity: 1 } ])
    } else {
      // IF cardToAdd IS ALREADY IN cards
      const cardCopy = { ...cards[cardIdx] }
      cardCopy.quantity += 1

      setCards([
        ...cards.slice(0, cardIdx),
        cardCopy,
        ...cards.slice(cardIdx + 1)
      ])
    }
  }


  const removeCard = cardToRemove => {
    const cardIdx = findCardIdx(cardToRemove)
    const cardCopy = { ...cards[cardIdx] }
    cardCopy.quantity -= 1

    if (cardCopy.quantity === 0) {
      setCards([
        ...cards.slice(0, cardIdx),
        ...cards.slice(cardIdx + 1)
      ])
    } else {
      setCards([
        ...cards.slice(0, cardIdx),
        cardCopy,
        ...cards.slice(cardIdx + 1)
      ])
    }
  }
  

  return [cards, addCard, removeCard]
}
