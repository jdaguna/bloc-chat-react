import React, { Component } from 'react';

class RoomList extends Component{
  constructor(props){
    super(props);
    this.state = {
      rooms:[],
      newRoomName: ''
    };

    //Store a Firebase reference to the rooms path onto the this keyword. A Firebase reference is an object that you can use to interact with data stored in a specific path. We can use the reference to create, read, update, or delete items at that paths
    this.roomsRef = this.props.firebase.database().ref("rooms");

    //
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.roomsRef.on('child_added', snapshot =>{
      console.log(snapshot);
      const room = snapshot.val(); //contains an object of each room?
      room.key = snapshot.key; //contains the key to each room
      this.setState({rooms:this.state.rooms.concat( room )});
      /*console.log(this.state.rooms[0].name);*/


    });
  }

  handleChange(event){
    this.setState({newRoomName: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    this.createChatRoom(this.state.newRoomName);
  }

  createChatRoom(newRoomName){
    //pushes newRoomName to database
    this.roomsRef.push({name: newRoomName});
    //resets variable
    this.setState({newRoomName: ''});
  }
//onClick for roomList, changes state in app to room clicked

  render(){
    return(
      <section className="room-list">
        <h1>Rooms</h1>
        {this.state.rooms.map( room =>
          <li className="room" key ={room.key} onClick={()=>this.props.handleClick(room)}>
            {room.name}

          </li>
        )}

        {/* Create Rooms using form */}
        <form onSubmit={this.handleSubmit}>
          <h2>Create a new room:</h2>
          <input type="text" placeholder="Type Name" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Create"/>
        </form>
      </section>
    );
  }

}

export default RoomList;
