import React, { Component } from "react";
import axios from "axios";
import { reject } from "lodash";

import PendingCard from "./PendingCard";
import NoOrders from "./NoOrders";

import "./css/pending.css";

export class PendingOrder extends Component {
  state = {
    pendingOrders: []
  };
  componentDidMount() {
    const restaurantId = this.props.res.restaurantId;
    axios
      .get("http://localhost:8080/" + restaurantId + "/orders/pending")
      .then(result => {
        this.setState({
          pendingOrders: result.data.orders,
          restaurantId: this.props.res.restaurantId
        });
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          this.setState({ err: error.response.data.msg });
        }
      });
    this.props.getData();
  }
  acceptOrder = orderId => {
    axios
      .put("http://localhost:8080/order/accept", { orderId })
      .then(result => {
        this.setState({
          pendingOrders: reject(this.state.pendingOrders, { _id: orderId })
        });
        var orderStatus = "Food is Being Prepared";
        axios
          .put("http://localhost:8080/order/status/change", {
            orderId,
            orderStatus
          })
          .then(result => {})
          .catch(error => {
            if (error.response && error.response.status === 401) {
              this.setState({ err: error.response.data.msg });
            }
          });
        this.props.getData();
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          this.setState({ err: error.response.data.msg });
        }
      });
  };
  rejectOrder = orderId => {
    axios
      .put("http://localhost:8080/order/reject", { orderId })
      .then(result => {
        this.setState({
          pendingOrders: reject(this.state.pendingOrders, { _id: orderId })
        });
        this.props.getData();
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          this.setState({ err: error.response.data.msg });
        }
      });
  };

  render() {
    return (
      <div>
        <h1 className="pendingTitle">
          Pending Orders{" "}
          {this.state.pendingOrders.length === 0 ? (
            ""
          ) : (
            <div>({this.state.pendingOrders.length})</div>
          )}
        </h1>
        {this.state.pendingOrders.length === 0 ? (
          <NoOrders message="Pending" />
        ) : (
          ""
        )}
        <div className="pendingContainer">
          {this.state.pendingOrders.map(pendingOrder => {
            return (
              <PendingCard
                order={pendingOrder}
                acceptOrder={this.acceptOrder}
                rejectOrder={this.rejectOrder}
                latitude={this.props.res.latitude}
                longitude={this.props.res.longitude}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default PendingOrder;
