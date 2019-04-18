import randomWords from "random-words";
import React, { Component, Fragment } from "react";
import Word from "./Word/Word";
import Letter from "./Word/Letter/Letter";
import "./Words.css";
import EndGame from "./EndGame/EndGame";

const DIFFICULTY_INDEX = 5;
export class Words extends Component {
  state = {
    words: [],
    letters: [],
    totalKeyStrokes: 0,
    correctKeyStrokes: 0,
    startTime: 0,
    totalTime: 0,
    wordsCount: 0,
    isTyping: false,
    allWords: [],
    correctWords: [],
    difficulty: 0
  };

  componentDidMount() {
    const words = randomWords(3);
    this.setState({ words: words, allWords: words });
    window.addEventListener("webkitAnimationEnd", e => {
      this.removeWord(e);
    });
    document.addEventListener("keydown", this.handleKeyDown);
  }

  resetAnimation = word => {
    let el = document.getElementById(word);
    el.classList.remove("wordsTransition");
    el.scrollBy(); /* trigger reflow */
    el.classList.add("wordsTransition");
  };

  increaseDifficulty = () => {
    if (this.state.allWords.length > this.state.difficulty * DIFFICULTY_INDEX) {
      this.setState(prevState => ({ difficulty: prevState.difficulty + 1 }));
    }
  };

  removeWord = e => {
    const lostWord = e.target.id;
    const remainingWords = this.state.words.map(word => {
      if (lostWord === word) {
        return "";
      } else {
        return word;
      }
    });
    this.setState({ words: remainingWords });
  };

  handleKeyDown = e => {
    const previousLetters = [...this.state.letters];
    this.setState({ isTyping: true, startTime: Date.now() });
    if (e.key === "Backspace") {
      this.setState({ letters: previousLetters.slice(0, -1) });
    }
    if (e.key === "Enter") {
      this.compareSolution();
    }
    if (e.key >= "a" && e.key <= "z") {
      const letters = previousLetters.concat(e.key);
      this.setState({
        letters: letters,
        totalKeyStrokes: this.state.totalKeyStrokes + 1
      });
    }
  };

  compareWords = (word, letters) => {
    const finalWord = word.map((letter, index) => {
      const wordToCompare = word.slice(0, index + 1).join("");
      const lettersToCompareWith = letters.slice(0, index + 1).join("");
      if (wordToCompare === lettersToCompareWith) {
        return <Letter letter={letter} highlighted="highlighted" />;
      } else {
        return <Letter letter={letter} highlighted="" />;
      }
    });
    return finalWord;
  };

  compareSolution() {
    const solution = this.state.letters.join("");
    const words = this.state.words.map(word => {
      if (word === solution) {
        this.resetAnimation(solution);
        this.increaseDifficulty();
        let newWord = randomWords();
        this.setState(prevState => ({
          correctKeyStrokes: prevState.correctKeyStrokes + solution.length,
          totalTime: prevState.totalTime + Date.now() - this.state.startTime,
          isTyping: false,
          wordsCount: prevState.wordsCount + 1,
          startTime: 0,
          correctWords: prevState.correctWords.concat(solution),
          allWords: prevState.allWords.concat(newWord)
        }));
        return newWord;
      } else {
        return word;
      }
    });
    this.setState({ words: words, letters: [] });
  }

  render() {
    const words = this.state.words.map(word => {
      return (
        <Word
          difficulty={this.state.difficulty}
          word={word}
          compareWords={this.compareWords}
          letter={this.state.letters}
        />
      );
    });
    return (
      <div className="mainContainer">
        {this.state.words.join().length <= 3 ? (
          <EndGame data={{ ...this.state }} />
        ) : (
          <>
            <div className="wordContainer"> {words}</div>
            <div className="inputField">{this.state.letters}</div>
          </>
        )}
      </div>
    );
  }
}

export default Words;
