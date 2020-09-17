import React, { Component } from 'react';
import { signOut } from '../firebase';
import { Link } from 'react-router-dom';
import faker from 'faker'
import { auth, firestore } from '../firebase';
import './App.css'
class Sidebar extends Component {
  constructor(){
    super();
    console.log(this.props);
  }

  addChannelCall = ()=>{  
    const data = {
      created_By: auth.currentUser.uid,
      description: faker.internet.email(),
      name : faker.name.findName(),
      members : [auth.currentUser.uid]
    };
    firestore
      .collection('channels')
      .add(data)
      .then((data) => {
        console.log(data);
      });    this.props.handler();
  }

  render() {
    const { channels } = this.props;
    return (
      <div id="sidebar">
        <div className="user-profile">
          <div className="avatar">
            <img src="https://www.flaticon.com/svg/static/icons/svg/2919/2919600.svg" />
          </div>
          <div>{this.props.userName}</div>
          <div
            style={{ marginLeft: 10, marginTop: 2, cursor: 'pointer' }}
            onClick={signOut}
          >
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/2150/2150480.svg"
              height="25"
            />
          </div>
        </div>
        <hr className="sidebar-spacer" />

        <div className="channels">
          <div className="header">Channels  <button onClick={this.addChannelCall} className="button">+</button></div>

          <ul className="channels-list">
            {channels.map((channel) => (
              <li key={channel.id}>
                <Link to={`/?id=${channel.id}`}># {channel.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
