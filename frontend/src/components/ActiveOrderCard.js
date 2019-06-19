import React, { Component } from 'react';
import axios from 'axios';
import { Steps, Row, Col, Modal } from 'antd';
import Axios from 'axios';

const { Step } = Steps;

export class ActiveOrderCard extends Component {
  state = {
    current: 0,
    total: 0,
    modalVisible: false,
  };

  calculateTotal = () => {
    let total = 0;

    this.props.order.items.map(item => {
      total += item.price * item.quantity;
    });

    this.setState({
      total: total,
    });
  };

  componentDidMount() {
    this.calculateTotal();
    this.props.order.status.forEach(s => {
      if (s.includes('Food is Ready for Pick-up')) {
        this.setState({
          current: 1,
        });
      } else if (s.includes('Food is Picked Up By Our Delivery Partner')) {
        this.setState({ current: 2 });
      } else this.setState({ current: 0 });
    });
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleOk = e => {
    this.props.completeOrder(this.props.order._id);
    this.props.getData();
    this.setState({
      modalVisible: false,
    });
  };

  handleCancel = e => {
    this.props.completeOrder(this.props.order._id);
    this.props.getData();
    this.setState({
      modalVisible: false,
    });
  };

  expandContent = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  onChange = current => {
    const orderId = this.props.order._id;
    if (current >= this.state.current) {
      this.setState({ current });
      if (current === 1) {
        var orderStatus = 'Food is Ready for Pick-up';
        axios
          .put('http://localhost:8080/order/status/change', {
            orderId,
            orderStatus,
          })
          .then(result => {})
          .catch(error => {
            if (error.response && error.response.status === 401) {
              this.setState({ err: error.response.data.msg });
            }
          });
      }

      if (current === 2) {
        var orderStatus = 'Food is Picked Up By Our Delivery Partner';
        var pickedUpFlag = '1';
        axios
          .put('http://localhost:8080/order/status/change', {
            orderId,
            orderStatus,
            pickedUpFlag,
          })
          .then(result => {})
          .catch(error => {
            if (error.response && error.response.status === 401) {
              this.setState({ err: error.response.data.msg });
            }
          });
        this.setState({ current: 0 });
        this.showModal();
      }
    }
  };

  render() {
    return (
      <div className='pendingCard'>
        <div className='pendingCardContainer' style={{ marginBottom: '10px' }}>
          <Row className='activeHead'>
            <Col span={18} className='cardInfo'>
              <h1 className='cardHead'>{this.props.order.userName}'s Order</h1>
              <div className='cardInfoSmall'>
                <div>
                  <span style={{ fontWeight: '500' }}>Placed At: </span>
                  {this.state.createdAt}
                </div>
                <div>
                  <span style={{ fontWeight: '500' }}>Total: </span>
                  {this.state.total} INR
                </div>
              </div>
            </Col>
            <Col span={4}>
              <img
                className={
                  this.state.expanded
                    ? 'expandImage expandImageRotate'
                    : 'expandImage'
                }
                src={require('./img/pendingExpand.png')}
                onClick={this.expandContent}
                alt=''
              />
            </Col>
          </Row>

          <div
            className={
              this.state.expanded ? 'cardExpand cardExpanded' : 'cardExpand'
            }
          >
            {this.props.order.items.map(item => {
              return (
                <Row>
                  <Col span={20}>
                    <h2 className='itemNames'>
                      {item.name}
                      <span style={{ marginLeft: '10px' }}>
                        (x{item.quantity})
                      </span>
                    </h2>
                  </Col>
                  <Col span={4}>
                    <h2 className='itemPrice'>{item.price} INR</h2>
                  </Col>
                </Row>
              );
            })}
          </div>
        </div>

        <Modal
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <h1>
            {this.props.order.userName}'s Order has been Successfully Completed!
          </h1>
        </Modal>
        <Row style={{ marginTop: '20px' }}>
          <Col span={8}>
            <img
              className='stepImage'
              src={require('./img/cooking.png')}
              alt=''
              style={{ marginLeft: '45px' }}
            />
          </Col>
          <Col span={8}>
            <img
              className='stepImage'
              src={require('./img/package.png')}
              alt=''
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
          </Col>
          <Col span={8} style={{ paddingRight: '45px' }}>
            <img
              className='stepImage'
              src={require('./img/delivery.png')}
              alt=''
              style={{ float: 'right' }}
            />
          </Col>
        </Row>
        <Steps
          className='activeSteps'
          current={this.state.current}
          onChange={this.onChange}
          progressDot
        >
          <Step title='Food Preparing' />
          <Step title='Ready For Pick-up' />
          <Step title='Picked Up' />
        </Steps>
      </div>
    );
  }
}

export default ActiveOrderCard;
