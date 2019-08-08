import React from 'react';

class HomeScreen extends React.Component {
  componentDidMount() {
    fetch('http://localhost:3001/users/test', {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
  }

  render() {
    return (
      <div>Home screen</div>
    );
  }
}

export default HomeScreen;