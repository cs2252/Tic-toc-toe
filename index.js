import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.id

    }
  }
  clickHandler = () => {
    this.props.clickHandler(this.state.id)
  }

  render() {
    // console.log(this.props)
    let value = this.props.getValue(this.state.id)
    // console.log("inside reandor method of square component")
    return (
      <button className="square" onClick={this.clickHandler}>
        {value}

      </button>
    );
  }
}


class Board extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      turn: 'x',
      status: ['', '', '', '', '', '', '', '', ''],
      winner: false,
      history: [['', '', '', '', '', '', '', '', '']]
    }
  }
  checkWinner = () => {
    return this.state.winner
  }
  getValue = (id) => {
    return this.state.status[id]
  }
  renderSquare(i) {
    return <Square winner={this.checkWinner} id={i} clickHandler={this.clickHandler} getValue={this.getValue} />;
  }
  check = (arr) => {
    // console.log("inside check method")
    if (arr[0] !== '' && (arr[0] === arr[1]) && (arr[1] === arr[2]))//first row
      return arr[0];
    if (arr[3] !== '' && (arr[3] === arr[4]) && (arr[4] === arr[5]))
      return arr[3];
    if (arr[6] !== '' && (arr[6] === arr[7]) && (arr[7] === arr[8]))//first row
      return arr[6];

    if (arr[0] !== '' && (arr[0] === arr[3]) && (arr[3] === arr[6]))//first row
      return arr[0];
    if (arr[1] !== '' && (arr[1] === arr[4]) && (arr[4] === arr[7]))//first row
      return arr[1];
    if (arr[2] !== '' && (arr[2] === arr[5]) && (arr[5] === arr[8]))//first row
      return arr[2];

    if (arr[0] !== '' && (arr[0] === arr[4]) && (arr[4] === arr[8]))//first row
      return arr[0];
    if (arr[2] !== '' && (arr[2] === arr[4]) && (arr[4] === arr[6]))//first row
      return arr[2];

    return false;
  }
  clickHandler = (id) => {


    if (this.state.winner === false && this.state.status[id] === '') {
      let temp1 = this.state.turn === 'x' ? 'o' : 'x'
      let newArray = this.state.status.map((s, index) => {
        if (id === index)
          return this.state.turn
        else
          return s
      })
      let moves = 1
      for (let i = 0; i < this.state.status.length; i++)
        if (this.state.status[i] !== '')
          moves++

      let newHistory = this.state.history.slice(0, this.state.history.length)
      newHistory[moves] = newArray
      let winner = this.check(newArray)
      this.setState({
        turn: temp1,
        status: newArray,
        winner: winner,
        history: newHistory
      })

    }
  }
  moveToStep = (index) => {
    if (index === 0) {
      this.setState({
        turn: 'x',
        status: this.state.history[0],
        winner: false,
        history: [['', '', '', '', '', '', '', '', '']]
      })
    }
    else
      this.setState({
        turn: this.state.turn,
        status: this.state.history[index],
        winner: this.state.winner,
        history: this.state.history
      })
  }

  render() {

    let next = this.state.winner !== false ? <h3>Winner is: {this.state.winner}</h3> : <h3>Next turn:{this.state.turn}</h3>
    let moveList = this.state.history.map((element, index) => {
      if (index === 0) {
        return (

          <div key={index.toString()}><button onClick={() => this.moveToStep(index)}>Go to start game</button>
          </div>
        )
      }
      else
        return (
          <div key={index.toString()}><button onClick={() => this.moveToStep(index)}>Move to step #{index}</button>
          </div>)

    })
    return (
      <div>
        <div className="status">{next}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>

        <div>
          <br />
          {/* <h3><button onClick={()=>this.moveToStep(0)}>Go to start game</button></h3> */}
          <h3>{moveList}</h3>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    // console.log("inside render method of game component")
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
