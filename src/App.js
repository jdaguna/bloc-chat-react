
import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
//import MessageList from './components/MessageList'

// Initialize Firebase, information copied from Overiew in Firebase "Add Firebase to your web app"
 var config = {
   apiKey: "AIzaSyBdVefGPvsLxbXJ1R4G2h5Fu9kW9GAFhw0",
   authDomain: "bloc-chat-react-d115a.firebaseapp.com",
   databaseURL: "https://bloc-chat-react-d115a.firebaseio.com",
   projectId: "bloc-chat-react-d115a",
   storageBucket: "bloc-chat-react-d115a.appspot.com",
   messagingSenderId: "826865034478"
 };
 firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeRoom: '',
    };
  }

  render() {
    return (
      <div className="App">
      {/* we are  calling firebase in the RoomList component so we need to pass along the name of the database (firebase) as defined on line 3*/}
        <RoomList firebase={firebase}/>
  
      </div>
    );
  }
}

export default App;
