import React, { Component } from "react";
import axios from "axios";
import { Switch } from "antd";
import { Row, Col } from "antd";

import "./css/menu.css";

export class MenuCard extends Component {
  changeMenuStatus = (checked, itemId) => {
    var available = 1;
    const restaurantId = this.props.restaurantId;
    if (checked) available = 1;
    else available = 0;
    axios
      .put("http://localhost:8080/" + restaurantId + "/item/" + itemId, {
        available
      })
      .then(result => {
        this.forceUpdate();
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          this.setState({ err: error.response.data.msg });
        }
      });
  };
  render() {
    return (
      <div className="menuCard">
        <style jsx global>{`
          .ant-switch-checked {
            background-color: #ef9c3e !important;
          }
        `}</style>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={20} className="menuCardTitle">
            <h1 style={{ paddingRight: "10px" }}>{this.props.menuName},</h1>
            <p
              style={
                this.props.quantity <= 10
                  ? { color: "#FF9C9C" }
                  : { color: "white" }
              }
            >
              {" "}
              {this.props.quantity} remaining
            </p>
          </Col>
          <Col span={4}>
            <Switch
              onChange={checked =>
                this.changeMenuStatus(checked, this.props.id)
              }
              defaultChecked={this.props.available == 0 ? false : true}
              style={{
                float: "right",
                marginTop: "5px"
              }}
            />
            <img
              src={require("./img/menuCardEdit.png")}
              onClick={() => this.props.changeView(this.props.id)}
              alt=""
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default MenuCard;
