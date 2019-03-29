import React, { Component } from 'react';

class MessageList extends Component{
	constructor(props){
		super(props);
		this.state = {
			allMessages: [],
			displayMessages: [],
			newMessage: ''
		};

//stores a firebase reference to the the messages path onto this keyword.
//a firebase reference is an object that you can use to interact with data stored in a specfic path.
//we can use the refernce to create, read, update, or delete items at the paths.
		this.messagesRef = this.props.firebase.database().ref("Messages");
	}

	componentDidMount(){
		this.messagesRef.on('child_added', snapshot =>{
			const message = snapshot.val();
			message.key = snapshot.key
			this.setState(
				{allMessages: this.state.allMessages.concat( message )},
				() => {this.updateDisplayList(this.props.activeRoom)}
			);
		});
	}


	componentDidUpdate(prevProps){ //gets called everytime the component changes..., can be used for animation updates
		//recieves prev props and state
		if (prevProps.activeRoom !== this.props.activeRoom){
				this.updateDisplayList(this.props.activeRoom);
		}
	}

	shouldComponentUpdate(){
		return true;
	}//why would i do this? for performance purposes. this can limit the amount of items updating

	updateDisplayList(activeRoom){
		this.setState({displayMessages: this.state.allMessages.filter(message => message.roomId === this.props.activeRoom.key)});
	}

	handleChange(event){
		this.setState({newMessage: event.target.value});
	}

	handleSubmit(event){
		event.preventDefault();
		this.createNewMessage(this.state.newMessage);
		document.getElementById("messageForm").value = ""; //clears textField

	}

	createNewMessage(newMessage){
		this.messagesRef.push({
				username: "<USERNAME HERE>",
				content: newMessage,
				sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
				roomId: this.props.activeRoom.key
		});
		this.setState({newMessage: ''});
	}

	render(){
		return(
			<section className="message-list">

			<h1>Chat Room: {this.props.activeRoom.name}</h1>
			<h3>Message List:</h3>
				{this.state.displayMessages.map(message =>
				<li className="message" key={message.key}>
					{message.content}
				</li>
			 )}



				<form onSubmit={this.handleSubmit.bind(this)}>
					<input id="messageForm" type="textarea" placeholder="Message" value={this.state.value} onChange={this.handleChange.bind(this)}/>
					<input type="submit" value="Send"/>
				</form>


			</section>
		);
	}

}

export default MessageList;
