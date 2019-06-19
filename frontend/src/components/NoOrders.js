import React, { Component } from "react";

import "./css/noOrders.css";

export class NoOrders extends Component {
  render() {
    return (
      <div className="noOrdersContainer">
        <img src={require("./img/beer.png")} alt="" />
        <h1>
          No {this.props.message} Orders! <br /> Have a Nice Day.
        </h1>
      </div>
    );
  }
}

export default NoOrders;
