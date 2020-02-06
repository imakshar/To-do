import React from "react";
import Counter from "./counter";
class Counters extends React.Component {
  render() {
    return (
      <div>
        <button
          className="btn btn-primary btn-sm m-2"
          onClick={this.props.onReset}
        >
          Reset
        </button>

        <button
          className="btn btn-primary btn-sm m-2"
          onClick={this.props.onAdd}
        >
          Add
        </button>
        {this.props.counters.map((ele, i) => (
          //   <Counter  key={i} initState={i % 2 === 1 ? i : false} />
          <Counter
            key={ele.id}
            value={ele.value}
            id={ele.id}
            selected
            onIncrement={this.props.onIncrement}
            onDelete={this.props.onDelete}
            index={i}
          >
            <hr />
            <h6>Counter #{ele.id}</h6>
          </Counter>
        ))}
      </div>
    );
  }
}

export default Counters;
