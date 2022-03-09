import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Loading from './Loading';

const userAPI = require('../services/userAPI');

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
    };
  }

  componentDidMount() {
    this.user();
  }

  user = async () => {
    this.setState({ loading: true });
    const request = await userAPI.getUser();
    this.setState({ name: request.name });
    this.setState({ loading: false });
  }

  render() {
    const { name, loading } = this.state;
    return (
      loading ? <Loading /> : (
        <header data-testid="header-component">
          <h1 data-testid="header-user-name">{ name }</h1>
          <Link to="/search" data-testid="link-to-search"> Search </Link>
          <Link to="/favorites" data-testid="link-to-favorites"> Favorite </Link>
          <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
        </header>
      )
    );
  }
}

export default Header;
