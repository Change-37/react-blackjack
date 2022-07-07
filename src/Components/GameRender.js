import React from "react";

export default function Game() {
  const [notBlack, setNotBlack] = React.useState(true);
  const [isAlive, setIsAlive] = React.useState(true);
  const [cardList, setCardList] = React.useState([]);
  const [pointA, setPointA] = React.useState(false);
  const [sumMsg, setSumMsg] = React.useState("");
  const [cardV, setCardV] = React.useState(``);
  const [sum, setSum] = React.useState();

  function getRandCard() {
    let Randcard = Math.floor(Math.random() * 13) + 1;
    return Randcard;
  }
  function newCard() {
    if (isAlive && notBlack) {
      let card = getRandCard();
      setCardList((prev) => [...prev, card]);
      setCardV((prev) => `${prev} <img src="./images/${card}.png" />`);
    }
  }
  function sumCard() {
    setSum(0);
    for (let i = 0; i < cardList.length; i++) {
      if (cardList[i] >= 10) setSum((prev) => prev + 10);
      else if (cardList[i] === 1) {
        setSum((prev) => (prev + pointA ? 1 : 11));
      } else setSum((prev) => prev + cardList[i]);
    }
    if (sum < 21) {
      setSumMsg("HIT?");
    } else if (sum === 21) {
      setSumMsg("BLACKJACK!");
      setNotBlack(() => false);
    } else if (sum > 21) {
      setSumMsg("BURST...");
      setIsAlive(() => false);
    }
  }
  function setA() {
    setPointA((prev) => !prev);
    setIsAlive(() => true);
  }
  function startGame() {
    setCardV(() => ``);
    setCardList(() => []);
    setNotBlack(() => true);
    setIsAlive(() => true);
    newCard();
    newCard();
  }

  return (
    <div>
      <div className="A-button">
        <p>A : {pointA ? 1 : 11}</p>
        <button onClick={setA}>swap A point</button>
      </div>
      <div className="buttons--box">
        <button onClick={startGame}>New Game</button>
        <button onClick={newCard}>New Card</button>
      </div>
      <div className="card--box">{cardV}</div>
      <div className="msg--box">
        <button onClick={sumCard}>Check Point</button>
        <h3>
          Score: {sum} {sumMsg}
        </h3>
      </div>
    </div>
  );
}
