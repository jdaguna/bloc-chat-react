import React,  { Component } from 'react'};
import 


class MessageList extends Component{
	constructor(props{
		super(props);
		this.state={
			messages: [],
			newMessage: ''
		};
	};

	handleChange(event){
		newMessage: event.state.value;
	}

	handleSubmit(event){
		prevent event default
		createNewMessage();
	}

	createNewMessage(){
		this. .push(newMessage)
	}

	return(){
		render(
			this.state.messages.map(message => 
			<li className="message" key={message.key}>
				{message}				
			</li>
			);
				

			<form onSubmit={this.handleSubmit()}>
				<input type="textarea" placeholder="type message..." value={this.state.value} onChange={this.handleChange()}/>
				<input type="submit" value="Send"/>
			</form>
		);
	}

}

export default Messagelist;
