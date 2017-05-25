import { Injectable } from '@angular/core';
import { Card } from './card';
import { Deck } from './deck';

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
    let i,
      score = 0,
      cardVal = 0, // Stashing the Card's value
      aces = 0; // Stores the # of Aces in the Hand

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

  printHand() {
    const arr = [];
    for (const c of this.cards) {
      arr.push(c.name);
    }
    return arr;
  }

  hitMe() {
    if (this.cards.length < 5) {
      ;
      this.cards.push(this.deck.deal());
    }
  }

}
