import React, { Component } from 'react';

import { Layout } from 'antd';
import { Row, Col } from 'antd';
import axios from 'axios';
import SideBar from './SideBar';
import Menu from './Menu';
import ActiveOrders from './ActiveOrders';
import PendingOrders from './PendingOrders';
import OrderHistory from './OrderHistory';

import './css/header.css';

const { Sider, Header, Content } = Layout;

class Home extends Component {
  state = {
    pending: true,
    menu: false,
    activeOrders: false,
    orderHistory: false,
    data: {},
  };
  componentDidMount = () => {
    this.getData();
    localStorage.setItem('id', this.props.details.details.restaurantId);
  };
  getData = () => {
    var restaurantId = localStorage.getItem('id');
    axios
      .get('http://localhost:8080/' + restaurantId + '/orders/stats')
      .then(result => {
        this.setState({ data: result.data.status });
        console.log(result.data.status);
      });
  };
  changeMenu = menuTitle => {
    if (menuTitle === 'pending') {
      this.setState({
        pending: true,
        menu: false,
        activeOrders: false,
        orderHistory: false,
      });
    } else if (menuTitle === 'menu') {
      this.setState({
        pending: false,
        menu: true,
        activeOrders: false,
        orderHistory: false,
      });
    } else if (menuTitle === 'activeOrders') {
      this.setState({
        pending: false,
        menu: false,
        activeOrders: true,
        orderHistory: false,
      });
    } else if (menuTitle === 'orderHistory') {
      this.setState({
        pending: false,
        menu: false,
        activeOrders: false,
        orderHistory: true,
      });
    }
  };

  render() {
    let pendingComponent = this.state.pending ? (
      <PendingOrders res={this.props.details.details} getData={this.getData} />
    ) : (
      ''
    );
    let menuComponent = this.state.menu ? (
      <Menu res={this.props.details.details} />
    ) : (
      ''
    );
    let activeOrdersComponents = this.state.activeOrders ? (
      <ActiveOrders res={this.props.details.details} getData={this.getData} />
    ) : (
      ''
    );
    let orderHistoryComponent = this.state.orderHistory ? (
      <OrderHistory res={this.props.details.details} />
    ) : (
      ''
    );

    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            style={{ backgroundColor: '#6E737A', zIndex: '0' }}
            collapsedWidth={0}
            breakpoint='sm'
            width='350px'
          >
            <SideBar
              res={this.props.details}
              data={this.state.data}
              changeMenu={this.changeMenu}
            />
          </Sider>
          <Layout>
            <Header style={{ height: '95px', backgroundColor: '#34383d' }}>
              <Row
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: '25px',
                  lineHeight: '95px',
                }}
                className=''
                type='flex'
                justify='center'
                align='top'
              >
                <Col
                  className={
                    this.state.pending
                      ? 'headerTitle headerActive'
                      : 'headerTitle'
                  }
                  onClick={() => this.changeMenu('pending')}
                  span={8}
                >
                  <div className='headerContainer'>
                    <img
                      className='headerImage'
                      src={require('./img/headerPending.png')}
                      alt=''
                    />
                    <div
                      className='headerText'
                      style={{
                        margin: '20px 0 0 30px',
                        display: 'inline',
                        whiteSpace: 'nowrap',
                        verticalAlign: 'middle',
                      }}
                    >
                      Pending
                    </div>
                  </div>
                </Col>
                <Col
                  className={
                    this.state.menu ? 'headerTitle headerActive' : 'headerTitle'
                  }
                  onClick={() => this.changeMenu('menu')}
                  span={8}
                >
                  <div className='headerContainer'>
                    <img
                      className='headerImage'
                      src={require('./img/headerMenu.png')}
                      alt=''
                    />
                    <div
                      className='headerText'
                      style={{
                        margin: '20px 0 0 30px',
                        display: 'inline',
                        whiteSpace: 'nowrap',
                        verticalAlign: 'middle',
                      }}
                    >
                      Menu
                    </div>
                  </div>
                </Col>
                <Col
                  className={
                    this.state.activeOrders
                      ? 'headerTitle headerActive'
                      : 'headerTitle'
                  }
                  onClick={() => this.changeMenu('activeOrders')}
                  span={8}
                >
                  <div className='headerContainer'>
                    <img
                      className='headerImage'
                      src={require('./img/headerActiveOrders.png')}
                      alt=''
                    />
                    <div
                      className='headerText'
                      style={{
                        margin: '20px 0 0 30px',
                        display: 'inline',
                        whiteSpace: 'nowrap',
                        verticalAlign: 'middle',
                      }}
                    >
                      Active Orders
                    </div>
                  </div>
                </Col>
              </Row>
            </Header>
            <Content style={{ height: '600px', overflow: 'auto' }}>
              {pendingComponent}
              {menuComponent}
              {activeOrdersComponents}
              {orderHistoryComponent}
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Home;
