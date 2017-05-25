import { Injectable } from '@angular/core';

@Injectable()
export class Card {
  _suit: number;
  number: number;

  constructor(suit, number) {
    this._suit = suit;
    this.number = number;
  }

  /**
   * Get the name of the suit
   */
  get suit() {
    let suitName = '';
    switch (this._suit) {
      case 1:
        suitName = 'Hearts';
        break;
      case 2:
        suitName = 'Clubs';
        break;
      case 3:
        suitName = 'Spades';
        break;
      case 4:
        suitName = 'Diamonds';
        break;
    }
    return suitName;
  }

  /**
   * Get the HTML-encoded symbol of the suit
   */
  get symbol() {
    let suitName = '';
    switch (this._suit) {
      case 1:
        suitName = '&hearts;';
        break;
      case 2:
        suitName = '&clubs;';
        break;
      case 3:
        suitName = '&spades;';
        break;
      case 4:
        suitName = '&diams;';
        break;
    }
    return suitName;
  };

  /**
   * @returns {number} The value of the card for scoring.
   */
  get value() {
    let value = this.number;
    if (this.number >= 10) {
      value = 10;
    }
    if (this.number === 1) {
      value = 11;
    }
    return value;
  };

  /**
  /**
   * @returns {string} The full name of the card
   */
  get name() {
    let cardName = '';
    const faceCards = { 1: 'A', 13: 'K', 12: 'Q', 11: 'J' };
    if (faceCards[this.number] !== undefined) {
      cardName = faceCards[this.number];
    } else {
      cardName = `${this.number}`;
    }
    return cardName + this.symbol;
  };
}
