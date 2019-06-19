import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'antd';
import Axios from 'axios';

export class EditMenuView extends Component {
  state = {
    name: '',
    quantity: 0,
    preparationTimeInMinutes: 0,
    price: 0,
    imageUrl: '',
  };

  componentDidMount() {
    this.setState({
      name: this.props.menu.name,
      quantity: this.props.menu.quantity,
      preparationTimeInMinutes: this.props.menu.preparationTimeInMinutes,
      price: this.props.menu.price,
      imageUrl: this.props.menu.imageUrl,
      itemId: this.props.menu.itemId,
      available: this.props.menu.available,
    });
  }

  updateMenu = () => {
    const restaurantId = this.props.restaurantId;
    const {
      name,
      quantity,
      preparationTimeInMinutes,
      price,
      imageUrl,
      itemId,
      available,
    } = this.state;
    axios
      .put('http://localhost:8080/' + restaurantId + '/item/' + itemId, {
        name,
        quantity,
        preparationTimeInMinutes,
        price,
        imageUrl,
        itemId,
        available,
      })
      .then(result => {
        this.props.refresh(restaurantId);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          this.setState({ err: error.response.data.msg });
        }
      });

    this.props.changeView('0');
  };

  render() {
    return (
      <div>
        <h1 className='editMenuTitle'>Edit {this.props.menu.name}</h1>

        <div className='formContainer'>
          <div>
            <div className='formInputTitle'>Name</div>
            <input
              type='text'
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              className='formInput'
            />
          </div>
          <Row style={{ marginTop: '30px' }}>
            <Col span={8}>
              <div className='formInputTitle'>Time To Prepare</div>
              <input
                type='text'
                value={this.state.preparationTimeInMinutes}
                onChange={e =>
                  this.setState({ preparationTimeInMinutes: e.target.value })
                }
                className='formInput formInputSmall'
              />{' '}
              <span className='formInputAfter'>Mins</span>
            </Col>
            <Col span={8}>
              <div className='formInputTitle'>Price</div>
              <input
                type='text'
                value={this.state.price}
                onChange={e => this.setState({ price: e.target.value })}
                className='formInput formInputSmall'
              />
              <span className='formInputAfter'>INR</span>
            </Col>
            <Col span={8}>
              <div className='formInputTitle'>Quantity</div>
              <input
                type='text'
                name='name'
                value={this.state.quantity}
                onChange={e => this.setState({ quantity: e.target.value })}
                className='formInput formInputSmall'
              />
              <span className='formInputAfter'>Nos</span>
            </Col>
          </Row>
          <div style={{ marginTop: '30px' }}>
            <div className='formInputTitle'>Image URL</div>
            <input
              type='text'
              value={this.state.imageUrl}
              onChange={e => this.setState({ imageUrl: e.target.value })}
              className='formInput'
            />
          </div>
        </div>

        <Row style={{ marginTop: '40px' }}>
          <Col span={12}>
            <div
              className='formGoBack'
              onClick={() => this.props.changeView('0')}
            >
              Cancel
            </div>
          </Col>
          <Col span={12}>
            <div className='formSaveChanges' onClick={this.updateMenu}>
              Save Changes
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EditMenuView;
