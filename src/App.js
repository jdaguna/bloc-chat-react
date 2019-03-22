import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
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
  render() {
    return (
      <div className="App">
      {/* we are  calling firebase in the component and passing along the name of the database*/}
        <RoomList firebase={firebase}/>
      </div>
    );
  }
}

export default App;
