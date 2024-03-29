import React, { Component } from "react";
import "./App.css";
import GameCard from "./components/GameCard";
import Wrapper from "./components/Wrapper";
import cards from "./cards.json";

class App extends Component {
  // Setting this.state.cards to the cards json array
  state = {
    cards,
    clicked: [],
    highScore: 0,
    currentScore: 0,
    message: "Ready? Start clicking!"
  };

  shuffle = cardDeck => {
    for (let i = cardDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardDeck[i], cardDeck[j]] = [cardDeck[j], cardDeck[i]];
    }
    return cardDeck;
  };

  cardClick = id => {
    // Shuffle cards
    const shuffled = this.shuffle(cards);
    this.setState({ cards: shuffled });
    console.log(this.state.clicked);
    // When a card is clicked twice, reset score and empty clicked state
    if (this.state.clicked.includes(id)) {
      this.setState({
        currentScore: 0,
        clicked: [],
        message: "Oh no! You've already clicked on this card!"
      });
      // Else update card state to clicked and increment score
    } else {
      this.setState({
        clicked: this.state.clicked.concat([id]),
        currentScore: this.state.currentScore + 1,
        message: "Keep going!"
      });
    }
    if (this.state.currentScore > this.state.highScore) {
      this.setState({ highScore: this.state.currentScore });
    }
  };

  // Map over this.state.cards and render a GameCard component for each card object
  render() {
    return (
      <div className="App">
        <Wrapper>
          <header className="App-header">
            <h2 className="App-intro">
              <strong>
                Try to click on each only once - clicking on the same card twice
                will reset the game!
              </strong>
              <p className="score">
                <strong>
                  Current Score: {this.state.currentScore} | High Score:{" "}
                  {this.state.highScore}
                </strong>
              </p>
              <p className="message">
                <strong>{this.state.message}</strong>
              </p>
            </h2>
          </header>
          <div className="App-card-wrapper">
            {this.state.cards.map(card => (
              <GameCard
                id={card.id}
                key={card.id}
                image={card.image}
                cardClick={this.cardClick}
              />
            ))}
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default App;
