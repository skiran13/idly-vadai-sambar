import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/sideBar.css';

export class SideBar extends Component {
  logout() {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  render() {
    return (
      <div>
        <div className='backgroundLine' />
        <img
          className='siderImage'
          src={this.props.res.details.imageUrl}
          alt=''
        />
        <h2 className='siderTitle'>{this.props.res.details.name}</h2>
        <div>
          <div className='siderBubble'>
            <span>{this.props.data.active + this.props.data.past}</span> Orders
            Placed Today
          </div>
          <div className='siderBubble'>
            <span>{this.props.data.pending}</span> Orders Pending
          </div>
          <div className='siderBubble'>
            <span>{this.props.data.active}</span> Orders Active
          </div>
          <div
            className='siderBubble orderHistoryBtn'
            onClick={() => this.props.changeMenu('orderHistory')}
          >
            View Order History
          </div>

          <Link
            className='sidebarLogout'
            style={{
              color: 'white',
            }}
            onClick={this.logout}
          >
            <div className='siderBubble'>Logout</div>
          </Link>
        </div>
      </div>
    );
  }
}

export default SideBar;
