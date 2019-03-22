import React, { Component } from 'react';

class RoomList extends Component{
  constructor(props){
    super(props);
    this.state = {
      rooms:[]
    };

    //Store a Firebase reference to the rooms path onto the this keyword. A Firebase reference is an object that you can use to interact with data stored in a specific path. We can use the reference to create, read, update, or delete items at that paths
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount(){
    this.roomsRef.on('child_added', snapshot =>{
      console.log(snapshot);
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({rooms:this.state.rooms.concat( room )});

    });
  }

  render(){
    return(
      <section className="room-list">
        <h1>Rooms</h1>
        {this.state.rooms.map( room =>
          <li className="room" key ={room.key}>
            {room.name}
          </li>

        )}
      </section>
    );
  }

}

export default RoomList;
