import React from "react";
import "./Letter.css";

const Letter = props => {
  return <span className={props.highlighted}>{props.letter}</span>;
};

export default Letter;
