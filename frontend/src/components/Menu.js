import React, { Component } from 'react';
import axios from 'axios';
import MenuView from './MenuView';
import EditMenuView from './EditMenuView';
import AddMenuItem from './AddMenuItem';

export class Menu extends Component {
  state = {
    menuView: true,
    menuList: [],
    menuAddView: false,
    editMenu: {},
  };

  componentDidMount() {
    const restaurantId = this.props.res.restaurantId;
    axios
      .get('http://localhost:8080/' + restaurantId + '/menu')
      .then(result => {
        this.setState({
          menuList: result.data.items,
          restaurantId: this.props.res.restaurantId,
        });
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          this.setState({ err: error.response.data.msg });
        }
      });
  }
  refresh = restaurantId => {
    axios
      .get('http://localhost:8080/' + restaurantId + '/menu')
      .then(result => {
        this.setState({
          menuList: result.data.items,
          restaurantId: this.props.res.restaurantId,
        });
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          this.setState({ err: error.response.data.msg });
        }
      });
  };
  changeView = id => {
    if (this.state.menuView === true) {
      let menu = this.state.menuList.find(o => o.itemId === id);

      this.setState({
        editMenu: menu,
        menuView: !this.state.menuView,
      });
    } else {
      this.setState({
        menuView: !this.state.menuView,
      });
    }
  };

  changeAddItemView = id => {
    this.setState({
      menuAddView: !this.state.menuAddView,
    });
  };

  sortMenuAsc = () => {
    let { menuList } = this.state;

    let sortedArray = menuList.sort((a, b) => {
      return a.quantity - b.quantity;
    });

    this.setState({
      menuList: sortedArray,
    });
  };

  sortMenuDsc = () => {
    console.log('Sorting.......');
    let { menuList } = this.state;

    let sortedArray = menuList.sort((a, b) => {
      return b.quantity - a.quantity;
    });

    this.setState({
      menuList: sortedArray,
    });
  };

  render() {
    return (
      <div>
        {this.state.menuView ? (
          <div>
            {this.state.menuAddView ? (
              <AddMenuItem
                changeAddItemView={this.changeAddItemView}
                restaurantId={this.props.res.restaurantId}
                refresh={this.refresh}
              />
            ) : (
              <MenuView
                sortMenuAsc={this.sortMenuAsc}
                sortMenuDsc={this.sortMenuDsc}
                menuList={this.state.menuList}
                changeView={this.changeView}
                restaurantId={this.props.res.restaurantId}
                changeAddItemView={this.changeAddItemView}
              />
            )}
          </div>
        ) : (
          <EditMenuView
            menu={this.state.editMenu}
            restaurantId={this.props.res.restaurantId}
            changeView={this.changeView}
            refresh={this.refresh}
          />
        )}
      </div>
    );
  }
}

export default Menu;
