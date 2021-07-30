import React, { Fragment, useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Users from './components/Users/Users';
import User from './components/Users/User';
import Search from './components/Users/Search';
import Alert from './components/layout/Alert'; 
import About from './components/pages/About'; 
import './App.css';

//title and icon are props
const App = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
 
  //Searchs Github for users 
  const searchUsers = async (text) => {

    setLoading(true); 

    const response = await fetch(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 

    /*
    .json() returns a promise which resolves with a javascript object that is the result of parsing the 
    body text as json

    taking json as input and parsing it to produce a JS object
    */

    const data = await response.json(); 

    setUsers(data.items);
    setLoading(false); 
  }

  // Get a single Github user

  const getUser = async (username) => {

    setLoading(true); 

    const response = await fetch(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 

    /*
    .json() returns a promise which resolves with a javascript object that is the result of parsing the 
    body text as json

    taking json as input and parsing it to produce a JS object
    */

    const data = await response.json(); 

    setUser(data); 
    setLoading(false); 
  } 


  //Get users repos

  const getUserRepos = async (username) => {

    setLoading(true); 

    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 

    /*
    .json() returns a promise which resolves with a javascript object that is the result of parsing the 
    body text as json

    taking json as input and parsing it to produce a JS object
    */

    const data = await response.json(); 
    
    setRepos(data);
    setLoading(false); 
  } 




  //Clear users from state 
  const clearUsers = () => {

    setUsers([]);
    setLoading(false); 

  }

  //Set alert

  const showAlert = (msg, type) => {

    setAlert({ msg, type }); 

    setTimeout(() => setAlert( null ), 4000); 

  }

  /**
   * clearUsers is handling the functionality of the clear btn. When the clear button is clicked in the Search
   * component. It will call the props function and set the state to empty. 
   * 
   * showClear is a boolean value. It is to tell React if it should display the clear btn
   * 
   */

    return (
      <Router>
      <div className="App">
       <Navbar title = 'Github Finder' icon = 'fab fa-github'/> 
       <div className = 'container'>  
        <Alert alert = {alert} />
        <Switch>
          <Route exact path='/'render = {props => (
            <Fragment>
              <Search 
                
                searchUsers = {searchUsers} 
                clearUsers = {clearUsers} 
                showClear = {users.length > 0 ? true : false} 
                setAlert = {showAlert}>

              </Search>
              <Users loading = {loading} users = {users}></Users>
            </Fragment>
          )}
          />
          <Route exact path='/about' component = {About}/>
          <Route exact path='/user/:login' render ={ props => (

            <User 
              { ...props } 
              getUser={getUser} 
              getUserRepos={getUserRepos}
              user={user} 
              repos={repos} 
              loading={loading}/>
          )}
          />
        </Switch>
       </div>
      </div>
      </Router>
    );
  
  
}

export default App;
