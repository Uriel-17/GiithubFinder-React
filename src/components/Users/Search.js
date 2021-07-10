import React from 'react'
import PropTypes from 'prop-types'

export class Search extends React.Component {
  state = {
    text: ''
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
  }

  /**
   * 
   * Note the onChange function The onChange event in React detects when the value of an input *element changes
   * We can access the target input’s value inside of the handleChange by accessing e.target.  *value.
   * e.target.name allows us to only use one onChange function if we use [e.target.name]
   * 
   */
  onChange = (e) => {
    //e.target.name: text
    this.setState({[e.target.name]: e.target.value}); //sets the state to the new text
  }


  onSubmit = (e) => {
    e.preventDefault(); 
   
    if(this.state.text === '') {
    
      /*
      Note that the setAlert function is passed in as a prop so it has access to the function defined in App.js
       */
      this.props.setAlert('Please enter something', 'light');
    
    } else {
      //console.log(this.state.text); // logs out the state
     this.props.searchUsers(this.state.text); 
     this.setState({text: ''}); 
    }
  }

  render() {

    const {showClear, clearUsers} = this.props; //destructuring

    return (
      <div>
        <form onSubmit = {this.onSubmit} className = "form">
          <input type = "text" name = "text" placeholder = "Search Users..." value = {this.state.text} onChange = {this.onChange}/>
          <input type = "submit" name = "Search" className = "btn btn-dark btn-block"/>
        </form>
        {showClear && //NOTE this is "inline if with logical && Operator"
            <button className = "btn btn-light btn-block" onClick = {clearUsers}>Clear</button>
            /**
             * It works because in JavaScript, true && expression always evaluates to expression, and false && expression  * always evaluates to false.
             */
        }
        
      </div>
    )
  }
}

export default Search