import React from "react";

const Word = props => {
  let letters = props.word.split("");
  letters = props.compareWords(letters, props.letter);
  return (
    <div
      id={props.word}
      className="wordsTransition"
      style={{
        padding: "10px 0px",
        margin: "10px",
        animationDuration: `${8 - props.difficulty}s`
      }}
    >
      {letters}
    </div>
  );
};

export default Word;
