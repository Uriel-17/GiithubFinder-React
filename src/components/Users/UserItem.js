import React from 'react'
import PropTypes from 'prop-types';

const UserItem = (props) =>  {

  const {login, avatar_url, html_url} = props.user; // destructuring pull stuff from the state object
  //Note that when using classes we need the 'this' keyword
    
    return (
      <div className = "card text-center">
        <img src = {avatar_url} alt = "" className = "round-img" style ={{width: '60px'}}></img>
        <h3>{login}</h3>

        <div>
          <a href = {html_url} className = "btn btn-dark btn-sm my-1">More</a>
        </div>
      </div>

    )
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserItem