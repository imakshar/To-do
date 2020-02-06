// import logo from "./logo.svg";
// import "./App.css";
// import Counter from "./components/counter";
import Counters from "./components/counters";
import Navbar from "./components/navbar";

import React, { Component } from "react";

export default class App extends Component {
  state = {
    counters: [
      { id: 1, value: 1 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  };

  deleteHandle = counterId => {
    console.log("delete handler called.", counterId);
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({ counters });
  };

  handleAdd = () => {
    this.setState(state => ({
      counters: [...state.counters, { id: Math.random(), value: 0 }]
    }));
  };

  handleReset = () => {
    console.log("im in reset");
    this.setState(state => ({
      counter: state.counters.map(function(ele) {
        ele.value = 0;
        return ele;
      })
    }));
  };

  onIncrement = index => () => {
    this.setState(state => {
      state.counters[index].value++;
      return state;
    });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar
          totalCounters={this.state.counters.filter(c => c.value > 0).length}
        />
        <main className="container">
          <Counters
            onIncrement={this.onIncrement}
            onReset={this.handleReset}
            onAdd={this.handleAdd}
            onDelete={this.deleteHandle}
            counters={this.state.counters}
          />
        </main>
      </React.Fragment>
    );
  }
}
