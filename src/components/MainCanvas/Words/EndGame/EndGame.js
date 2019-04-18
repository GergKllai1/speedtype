import React from "react";

const EndGame = props => {
  return (
    <div>
      <h3>Total keystrokes: {props.totalKeyStrokes}</h3>
      <h3>Correct KeyStrokes: {props.correctKeyStrokes}</h3>
      <h3>
        Accuracy:
        {props.totalKeyStrokes > 0
          ? Math.round(
              (props.correctKeyStrokes * 100) / props.totalKeyStrokes
            )
          : 0}
        %
      </h3>
      <h3>Correct words: {props.wordsCount}</h3>
      <h3>Total time: {props.totalTime} seconds</h3>
      <h3>
        Typing speed:
        {props.totalTime > 0
          ? Math.round((props.wordsCount * 60) / props.totalTime)
          : 0}{" "}
        WPM
      </h3>
    </div>
  );
};

export default EndGame;
