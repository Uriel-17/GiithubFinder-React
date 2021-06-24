import React from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/Users/Users';
import Search from './components/Users/Search';
import './App.css';

//title and icon are props
class App extends React.Component {

  state = {
    users: [],
    loading: false
  }

  /**
   * componentDidMount() method is the most suitable place to call the setState() 
   * method which helps in changing the application’s state and also updates * are rendered
   */
  // async componentDidMount() {

  //   this.setState({loading: true }); 
  // }

  //Searchs Github for users 
  searchUsers = async (text) => {

    this.setState({loading: true});

    const response = await fetch(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 

    /*
    .json() returns a promise which resolves with a javascript object that is the result of parsing the 
    body text as json

    taking json as input and parsing it to produce a JS object
    */

    const data = await response.json(); 

    this.setState({users: data.items, loading: false }); 
  }

  //Clear users from state 
  clearUsers = () => {

    this.setState({users:[], loading: false}); 

  }

  /**
   * clearUsers is handling the functionality of the clear btn. When the clear button is clicked in the Search
   * component. It will call the props function and set the state to empty. 
   * 
   * showClear is a boolean value. It is to tell React if it should display the clear btn
   * 
   */

  render() {
    const {users, loading} = this.state; 
    return (
      <div className="App">
       <Navbar title = 'Github Finder' icon = 'fab fa-github'/> 
       <div className = 'container'>  
        <Search searchUsers = {this.searchUsers} clearUsers = {this.clearUsers} showClear = {users.length > 0 ? true : false}></Search>
        <Users loading = {loading} users = {users}></Users>
       </div>
      </div>
    );
  }
  
}

export default App;
