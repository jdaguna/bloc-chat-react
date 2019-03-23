import React, { Component } from 'react';

class MessageList extends Component{
	constructor(props){
		super(props);
		this.state = {
//allMessages
//displayMessages
			messages: [],
			newMessage: ''
		};

//change rooms to message
		this.roomsRef = this.props.firebase.database().ref("rooms");

		this.handleSubmit = this.handleSubmit.bind(this);
		this.hanldeChange = this.handleChange.bind(this);
	}

	componentDidMount(){
		this.roomsRef.on('child_added', snapshot =>{
			const room = snapshot.val();
			room.key = snapshot.key
			this.setState({rooms:this.state.rooms.concat( room )});

		});
	}

	handleChange(event){
		this.setState({newMessage: event.target.value});
	}

	handleSubmit(event){
		event.preventDefault();
		this.createNewMessage(this.state.newRoomName);
	}

	createNewMessage(newMessage){
		this.roomsRef.push({message: newMessage}); //newMessage not defined
		this.setState({newMessage: ''});
	}

	render(){
		return(
			<section className="message-list">
				{this.state.messages.map(message =>
				<li className="message" key={message.key}> //message not defined
					{message.body} 														//message not defined
				</li>
			 )}



				<form onSubmit={this.handleSubmit}>
					<input type="textarea" placeholder="type message..." value={this.state.value} onChange={this.handleChange()}/>
					<input type="submit" value="Send"/>
				</form>
			</section>
		);
	}

}

export default MessageList;
