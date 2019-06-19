import React, { Component } from "react";
import axios from "axios";
import { Row, Col } from "antd";

import MenuCard from "./MenuCard";

export class MenuView extends Component {
  render() {
    return (
      <div>
        <h1 className="menuTitle">Menu Items</h1>
        <Row
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "80%"
          }}
        >
          <Col className="menuTopBarSort" span={10}>
            Sort by Available:
            <div className="sortUp">
              <img
                className="menuTopBarSortImg"
                src={require("./img/sortUp.png")}
                alt=""
                onClick={this.props.sortMenuDsc}
              />
            </div>
            <div className="sortDown">
              <img
                className="menuTopBarSortImg"
                src={require("./img/sortDown.png")}
                alt=""
                onClick={this.props.sortMenuAsc}
              />
            </div>
          </Col>
          <Col
            className="menuTopBarBubble"
            span={6}
            offset={7}
            onClick={() => this.props.changeAddItemView("67")}
            style={{ float: "right" }}
          >
            <img src={require("./img/addItem.png")} alt="" />
            Add Item
          </Col>
        </Row>
        {this.props.menuList.map(menu => {
          return (
            <MenuCard
              key={menu.itemId}
              menuName={menu.name}
              quantity={menu.quantity}
              id={menu.itemId}
              available={menu.available}
              changeView={this.props.changeView}
              restaurantId={this.props.restaurantId}
            />
          );
        })}
      </div>
    );
  }
}

export default MenuView;
