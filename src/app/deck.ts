import { Injectable } from '@angular/core';
import { Card } from './card';

@Injectable()
export class Deck {
  cards = [];

  /**
   * Initialize a new deck
   */
  constructor() {
  }

  createNewDeck() {
    let suit;
    let number;
    for (let i = 0; i < 52; i++) {
      suit = i % 4 + 1;
      number = i % 13 + 1;
      this.cards.push(new Card(suit, number));
    }
  }

  /**
   * @returns {Card[]} An array of cards representing the shuffled version of the deck.
   */
  shuffle() {
    for (let i = 0; i < this.cards.length; i++) {
      const j = Math.floor(Math.random() * i);
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    return this.cards;
  };

  deal() {
    if (this.cards.length === 0) {
      console.log('Empty deck, new deck created');
      this.createNewDeck();
      this.shuffle();
    }
    return this.cards.pop();
  }

}
