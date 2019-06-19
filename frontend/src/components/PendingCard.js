import React, { Component } from "react";

import { Row, Col } from "antd";

import "./css/pending.css";

export class PendingCard extends Component {
  state = {
    expanded: false,
    total: 0,
    distance: 6
  };

  expandContent = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  calculateTotal = () => {
    let total = 0;

    this.props.order.items.map(item => {
      total += item.price * item.quantity;
    });

    this.setState({
      total: total
    });
  };

  calculateDistance = () => {
    let distance = 0;

    let lat1 = this.props.order.latitude;
    let lon1 = this.props.order.longitude;

    let lat2 = this.props.latitude;
    let lon2 = this.props.longitude;

    if (lat1 === lat2 && lon1 === lon2) {
      distance = 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;

      distance = dist * 1.609344;
    }

    this.setState({
      distance: Math.floor(distance)
    });
  };

  componentDidMount() {
    this.calculateTotal();
    this.calculateDistance();
  }

  render() {
    return (
      <div className="pendingCardContainer">
        <Row>
          <Col span={8} className="cardInfo">
            <h1 className="cardHead">{this.props.order.userName}</h1>
            <div className="cardInfoSmall">
              <div>
                <span style={{ fontWeight: "500" }}>Total: </span>
                {this.state.total} INR
              </div>
              <div>
                <span style={{ fontWeight: "500" }}>Distance: </span>
                {this.state.distance} Kms
              </div>
            </div>
          </Col>
          <Col span={8} offset={7}>
            <img
              className={
                this.state.expanded
                  ? "expandImage expandImageRotate"
                  : "expandImage"
              }
              src={require("./img/pendingExpand.png")}
              alt=""
              onClick={this.expandContent}
            />
            <img
              className="cardCheckImage"
              src={require("./img/pendingCancel.png")}
              alt=""
              onClick={() => this.props.rejectOrder(this.props.order._id)}
            />
            <img
              className="cardCheckImage"
              src={require("./img/pendingConfirm.png")}
              alt=""
              style={{ marginRight: "30px" }}
              onClick={() => this.props.acceptOrder(this.props.order._id)}
            />
          </Col>
        </Row>

        <div
          className={
            this.state.expanded ? "cardExpand cardExpanded" : "cardExpand"
          }
        >
          {this.props.order.items.map(item => {
            return (
              <Row>
                <Col span={20}>
                  <h2 className="itemNames">
                    {item.name}
                    <span style={{ marginLeft: "10px" }}>
                      (x{item.quantity})
                    </span>
                  </h2>
                </Col>
                <Col span={4}>
                  <h2 className="itemPrice">{item.price} INR</h2>
                </Col>
              </Row>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PendingCard;
