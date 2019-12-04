import React from 'react';

import Input from './components/input';
import Score from './components/score';

import './App.scss';

class App extends React.Component {
  state = {
    errorMessage: '',
    error: false,
    words: [],
    score :0,
    suffix: 'tion',
    suffixes: [
      'tion',
      'sion',
      'ous',
      'er',
      'ment',
    ],
  }

  changeSuffix = (value) => {
    this.setState({
      suffix: value,
      score: 0,
      words: [],
      error: false,
      errorMessage: ''
    });
  }

  addWord = (word) => {
    if(!word.toLowerCase().endsWith(this.state.suffix)) {
      this.setState({ error: true, errorMessage: `Word does not end with ${this.state.suffix}`});
    }
    else if(this.state.words.includes(word)) {
      this.setState({ error: true, errorMessage: `You have already entered that.`});
    }
    else {
      this.setState({ error: false, score: this.state.score+1, words: [...this.state.words, word]});
    }
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          Word Play
        </div>
        <div className="subtitle">
          Enter words ending with&nbsp;
          <div className="suffix">
            {
              this.state.suffixes.map((item, index) => {
                return (
                <span key={index}>
                  <input
                    type="radio"
                    name="suffix"
                    checked={this.state.suffix==item}
                    onChange={()=>this.changeSuffix(item)}
                  />
                  {item}
                </span>
              )})
            }

          </div>
        </div>
        <Input addWord={this.addWord} />
        <div className="errorMessage">
          {
            this.state.error &&
            this.state.errorMessage
          }
         </div>
        <Score score={this.state.score} />
      </div>
    );
  }
}

export default App;
