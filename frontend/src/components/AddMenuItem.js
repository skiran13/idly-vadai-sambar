import React, { Component } from 'react';
import axios from 'axios';
import uniqid from 'uniqid';
import { Row, Col } from 'antd';

export class AddMenuItem extends Component {
  state = {
    name: '',
    quantity: 0,
    preparationTimeInMinutes: 0,
    price: 0,
    imageUrl: '',
  };

  addItemToMenu = () => {
    const itemId = uniqid()
      .toUpperCase()
      .substring(0, 10);
    const {
      name,
      quantity,
      preparationTimeInMinutes,
      price,
      imageUrl,
    } = this.state;

    axios
      .put('http://localhost:8080/' + this.props.restaurantId + '/menu', {
        name,
        quantity,
        preparationTimeInMinutes,
        price,
        imageUrl,
        itemId,
      })
      .then(result => {
        this.props.refresh(this.props.restaurantId);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          this.setState({ err: error.response.data.msg });
        }
      });
    this.props.changeAddItemView('0');
  };

  render() {
    return (
      <div>
        <h1 className='editMenuTitle'>Add New Item</h1>

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
              onClick={() => this.props.changeAddItemView('0')}
            >
              Cancel
            </div>
          </Col>
          <Col span={12}>
            <div className='formSaveChanges' onClick={this.addItemToMenu}>
              Save Changes
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddMenuItem;
