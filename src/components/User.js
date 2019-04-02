import React, {Component} from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handelSignIn = this.handleSignIn.bind(this);
    this.handelSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged(
      user => {
        this.props.setUser(user);
      });
  }

  handleSignIn(){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  handleSignOut(){
    this.props.firebase.auth().signOut();
  }

  render(){
    return(
      <section>
        <h4> Sign In with Google </h4>
        <h5> User: {this.props.user ? this.props.user.displayName : 'Guest'}
        <button onClick={ this.props.user ? this.handleSignOut.bind(this) : this.handleSignIn.bind(this) }>
            <span>Sign { this.props.user ? 'out' : 'in' }</span>
        </button>
        </h5>
      </section>
    );
  }



}
export default User;
