import { Component, OnInit, ViewChild } from '@angular/core';
import { Card } from './card';
import { Deck } from './deck';
import { Hand } from './hand';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  deck: Deck;
  wins = 0;
  rounds = 0;
  losses = 0;
  yourHand: Hand;
  dealerHand: Hand;
  outcome: string;
  showHitButton: boolean;
  showDealButton: boolean;
  showStandButton: boolean;
  isGameOver: boolean;

  ngOnInit() {
    this.deck = new Deck();
    this.showDeal();
  }
  winPercentage() {
    return (this.wins / this.rounds * 100).toFixed(2);
  }
  showDeal() {
    this.showDealButton = true;
    this.showHitButton = false;
    this.showStandButton = false;
  }
  showHitAndStand() {
    this.showDealButton = false;
    this.showHitButton = true;
    this.showStandButton = true;
  }
  declareWinner() {
    this.isGameOver = true;
    const dealerScore = this.dealerHand.score;
    const userScore = this.yourHand.score;

    if (userScore > 21 || dealerScore === 21) {
      this.outcome = 'You lose!';
      this.losses++;
    } else if (userScore <= 21 && this.yourHand.cards.length >= 5) {
      this.outcome = 'You win! 5-card Charlie!';
      this.wins++;
    } else if (dealerScore > 21 || userScore === 21 || userScore > this.dealerHand.score) {
      this.outcome = 'You win!';
      this.wins++;
    } else if (dealerScore > userScore) {
      this.outcome = 'You lose!';
      this.losses++;
    } else if (dealerScore === userScore) {
      this.outcome = 'You tied!';
    }
  }

  doDealerHand() {
    const hand = new Hand(this.deck);
    while (hand.score < 17) {
      hand.hitMe();
    }
    this.dealerHand = hand;
  }

  onDeal() {
    this.rounds++;
    if (this.rounds % 2 === 0) {
      this.deck.cards = this.deck.shuffle();
    }
    this.isGameOver = false;
    this.yourHand = new Hand(this.deck);
    this.showHitAndStand();
  }

  onHit() {
    this.yourHand.hitMe();
    if (this.yourHand.cards.length >= 5 || this.yourHand.score > 21) {
      this.onStand();
    }
  }

  onStand() {
    this.doDealerHand();
    this.declareWinner();
    this.showDeal();
  }
}
