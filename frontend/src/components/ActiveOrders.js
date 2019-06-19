import React, { Component } from 'react';
import { reject } from 'lodash';
import ActiveOrderCard from './ActiveOrderCard';
import NoOrders from './NoOrders';

import axios from 'axios';
import './css/active.css';

export class ActiveOrders extends Component {
  state = {
    activeOrders: [],
  };
  componentDidMount() {
    const restaurantId = this.props.res.restaurantId;
    axios
      .get('http://localhost:8080/' + restaurantId + '/orders/active')
      .then(result => {
        this.setState({
          activeOrders: result.data.orders,
          restaurantId: this.props.res.restaurantId,
        });
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          this.setState({ err: error.response.data.msg });
        }
      });
  }
  completeOrder = orderId => {
    this.setState({
      activeOrders: reject(this.state.activeOrders, { _id: orderId }),
    });
  };
  render() {
    return (
      <div>
        <h1 className='activeTitle'>
          Active Orders{' '}
          {this.state.activeOrders.length === 0 ? (
            ''
          ) : (
            <div>({this.state.activeOrders.length})</div>
          )}
        </h1>
        {this.state.activeOrders.length === 0 ? (
          <NoOrders message='Active' />
        ) : (
          ''
        )}
        <div className='activeCardsContainer'>
          {this.state.activeOrders.map(activeOrder => {
            return (
              <ActiveOrderCard
                order={activeOrder}
                completeOrder={this.completeOrder}
                getData={this.props.getData}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default ActiveOrders;
