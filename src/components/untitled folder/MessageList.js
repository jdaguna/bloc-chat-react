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

//stores a firebase reference to the the messages path onto this keyword.
//a firebase reference is an object that you can use to interact with data stored in a specfic path.
//we can use the refernce to create, read, update, or delete items at the paths.
		this.messagesRef = this.props.firebase.database().ref("messages");
	}

	componentDidMount(){
		this.messagesRef.on('child_added', snapshot =>{
			const message = snapshot.val();
			message.key = snapshot.key
			this.setState({messages:this.state.messages.concat( message )});
		});
	}

	handleChange(event){
		this.setState({newMessage: event.target.value});
	}

	handleSubmit(event){
		event.preventDefault();
		this.createNewMessage(this.state.newMessage);
	}

	createNewMessage(newMessage){
		this.messagesRef.push({message: newMessage}); //newMessage not defined
		this.setState({newMessage: ''});
	}

	render(){
		return(
			<section className="message-list">
				{this.state.messages.map(message =>
				<li className="message" key={message.key}> {/*message not defined*/}
					{message.body} 													 {/*message not defined*/}
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
