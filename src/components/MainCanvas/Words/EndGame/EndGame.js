import React from "react";

const EndGame = props => {
  const displayWords = props.data.allWords.map(word => {
    if (props.data.correctWords.includes(word)) {
      return (
        <li key={word} style={{ backgroundColor: "green" }}>
          {word}
        </li>
      );
    } else {
      return <li key={word}>{word}</li>;
    }
  });
  return (
    <div>
      <h3>Total keystrokes: {props.data.totalKeyStrokes}</h3>
      <h3>Correct KeyStrokes: {props.data.correctKeyStrokes}</h3>
      <h3>
        Accuracy:
        {props.data.totalKeyStrokes > 0
          ? Math.round(
              (props.data.correctKeyStrokes * 100) / props.data.totalKeyStrokes
            )
          : 0}
        %
      </h3>
      <h3>Correct words: {props.data.wordsCount}</h3>
      <h3>Total time: {props.data.totalTime} seconds</h3>
      <h3>
        Typing speed: {props.data.totalTime > 0
          ? Math.round((props.data.wordsCount * 60) / props.data.totalTime)
          : 0} WPM
      </h3>
      <ul>{displayWords}</ul>
    </div>
  );
};

export default EndGame;
