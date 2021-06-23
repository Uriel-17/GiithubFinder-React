import React from 'react'
import PropTypes from 'prop-types'

export class Search extends React.Component {
  state = {
    text: ''
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired
  }

  /**
   * 
   * Note the onChange function The onChange event in React detects when the value of an input *element changes
   * We can access the target input’s value inside of the handleChange by accessing e.target.  *value.
   * e.target.name allows us to only use one onChange function iff we use [e.target.name]
   * 
   */
  onChange = (e) => {
    //e.target.name: text
    this.setState({[e.target.name]: e.target.value}); //sets the state to the new text
  }

  onSubmit = (e) => {
    e.preventDefault(); 
    //console.log(this.state.text); // logs out the state
    this.props.searchUsers(this.state.text); 
    this.setState({text: ''}); 
  }

  render() {
    return (
      <div>
        <form onSubmit = {this.onSubmit} className = "form">
          <input type = "text" name = "text" placeholder = "Search Users..." value = {this.state.text} onChange = {this.onChange}/>
          <input type = "submit" name = "Search" className = "btn btn-dark btn-block"/>
        </form>
      </div>
    )
  }
}

export default Search