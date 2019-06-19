import React, { Component } from "react";

import { Row, Col } from "antd";

import "./css/active.css";

export class OrderHistoryCard extends Component {
  state = {
    total: 0,
    expanded: false
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

  componentDidMount() {
    this.calculateTotal();
  }

  expandContent = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    return (
      <div className="pendingCard" style={{ marginBottom: "40px" }}>
        <div className="pendingCardContainer">
          <Row className="activeHead">
            <Col span={18} className="cardInfo">
              <h1 className="cardHead">{this.props.order.userName}'s Order</h1>
              <div className="cardInfoSmall">
                <div>
                  <span style={{ fontWeight: "500" }}>Completed At: </span>
                  {/* FIXME: Add the completed time key instead of created at */}
                  {this.props.order.createdAt}
                </div>
                <div>
                  <span style={{ fontWeight: "500" }}>Total: </span>
                  {this.state.total} INR
                </div>
              </div>
            </Col>
            <Col span={4}>
              <img
                className={
                  this.state.expanded
                    ? "expandImage expandImageRotate"
                    : "expandImage"
                }
                src={require("./img/pendingExpand.png")}
                onClick={this.expandContent}
                alt=""
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
      </div>
    );
  }
}

export default OrderHistoryCard;
