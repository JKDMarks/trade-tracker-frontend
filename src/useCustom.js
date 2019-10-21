import React, { useState } from 'react'

export function useCards() {
  const [cards, setCards] = useState([])

  const findCardIdx = cardId => cards.findIndex(card => card.id === cardId)

  // addCard ACCEPTS A CARD OBJECT THAT SHOULD BE ADDED
  const addCard = (cardToAdd, isFoil = false) => {
    const cardIdx = findCardIdx(cardToAdd.id)

    if (cardIdx === -1) {
      // IF cardToAdd IS NOT YET IN cards
      setCards([ ...cards,
        { ...cardToAdd, quantity: 1, price: isFoil ? cardToAdd.prices.usd_foil : cardToAdd.prices.usd }
      ])
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

  // removeCard ACCEPTS A CARD ID, IN CASE CARD IS NO LONGER IN CURRENT SEARCH
  const removeCard = cardId => {
    const cardIdx = findCardIdx(cardId)
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
