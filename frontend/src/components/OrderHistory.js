import React, { Component } from "react";
import axios from "axios";

import OrderHistoryCard from "./OrderHistoryCard";

import "./css/orderHistory.css";

export class OrderHistory extends Component {
  state = {
    orderHistory: [],
    restaurantId: ""
  };

  componentDidMount() {
    const restaurantId = this.props.res.restaurantId;
    axios
      .get("http://localhost:8080/" + restaurantId + "/orders/past")
      .then(result => {
        this.setState({
          orderHistory: result.data.orders,
          restaurantId: this.props.res.restaurantId
        });
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          this.setState({ err: error.response.data.msg });
        }
      });
  }

  render() {
    return (
      <div className="orderHistoryContainer">
        <h1 className="orderHistoryTitle">Order History</h1>
        <div className="activeCardsContainer">
          {this.state.orderHistory.map(order => {
            return <OrderHistoryCard order={order} />;
          })}
        </div>
      </div>
    );
  }
}

export default OrderHistory;
