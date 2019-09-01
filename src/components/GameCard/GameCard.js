import React from "react";
import "./style.css";

const GameCard = props => (
  <div className="card">
    <img
      alt={props.name}
      src={props.image}
      onClick={() => props.cardClick(props.id)}
    />
  </div>
);

export default GameCard;
