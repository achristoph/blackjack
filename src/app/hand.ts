import { Injectable } from '@angular/core';
import { Card } from './card';
import { Deck } from './deck';

/**
 * A class to represent a player's hand
 */
@Injectable()
export class Hand {
  cards: Card[] = [];
  deck: Deck;

  /**
   * Initialize a new hand. Dealing the first two cards
   */
  constructor(deck: Deck) {
    this.cards.push(deck.deal(), deck.deal());
    this.deck = deck;
  }

  /**
   * @returns {Number} The score of the Hand.
   * */
  get score() {
    let i, score = 0, cardVal = 0, aces = 0;

    for (i = 0; i < this.cards.length; i++) {
      cardVal = this.cards[i].value;
      if (cardVal === 11) {
        aces += 1;
      }
      score += cardVal;
    }

    /* Check to see if Aces should be 1 or 11 */
    while (score > 21 && aces > 0) {
      score -= 10;
      aces -= 1;
    }
    return score;
  }

  /**
   * Add a card to hand if less than 5
   */
  hitMe() {
    if (this.cards.length < 5) {
      this.cards.push(this.deck.deal());
    }
  }

}
