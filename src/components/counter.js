import React, { Component } from "react";
class Countrer extends Component {
  // state = {
  //   count: this.props.value,
  //   // count: this.props.initState ? 0,

  //   tags: ["tag1", "tag2", "tag3"]
  //   // imgUrl: "https:/picsum.photos/280"
  // };

  styles = {
    fontSize: 20,
    fontWeight: "bold"
  };

  // constructor() {
  //   super();
  //   this.props = {
  //     count: this.props.value,
  //     tags: ["tag1", "tag2", "tag3"]
  //   };
  //   // this.handleIncrement = this.handleIncrement.bind(this);
  // }

  // static getDereivedProps(prevProps) {
  //   if (prevProps.value !== this.props.value) {
  //     this.setState({
  //       count: this.props.value
  //     });
  //   }
  // }

  handleIncrement = args => {
    console.log("Increment Clicked!", args.id);
    this.setState(state => {
      state.value++;
      return state;
    });
  };
  render() {
    let classes = this.getBadgeClasses();
    console.log(this.props);
    return (
      <div>
        {/* <h1>hello</h1> */}
        {/* <img src={this.props.imgUrl}></img> */}
        {this.props.children}
        <span style={this.styles} className={classes}>
          {this.formateCount()}
        </span>
        <button
          onClick={this.props.onIncrement(this.props.index)}
          style={{ fontSize: 15 }}
          className="btn btn-secondary btn-s"
        >
          Increment
        </button>

        <button
          onClick={() => {
            this.props.onDelete(this.props.id);
          }}
          className="btn-danger btn-sm m-2"
        >
          Delete
        </button>
        {/* <ul>
          {new Array(this.props.count).fill(0).map((ele, index) => {
            return <li key={index}>{index}</li>;
          })}
        </ul> */}
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 ";
    const { value } = this.props;
    classes += value === 0 ? "badge-warning" : "badge-primary";
    return classes;
  }

  formateCount() {
    const { value } = this.props;
    return value === 0 ? 0 : value;
  }
}

Countrer.defaultProps = {
  value: 0
};

export default Countrer;
