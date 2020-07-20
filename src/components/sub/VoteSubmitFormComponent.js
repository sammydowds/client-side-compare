import React, { Component } from 'react';

class VoteSubmitForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
          email: '', 
          repovoted: '1'
        };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }
  
    handleSubmit(event) {
      this.props.handleSubmit(this.state); 
      event.preventDefault();
    }
  
    render() {
      return (
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <label>
                Email: 
            </label>
            <input type="email" name="email" value={this.state.email}></input>
            <label>
                Cast vote for: 
                <select name="repovoted" value={this.state.repovoted}>
                    <option value="1">React</option>
                    <option value="2">Angular</option>
                    <option value="3">Ember</option>
                    <option value="4">Vue</option>
                </select>
            </label>
            <input type="submit" value="Submit" />
        </form>
      );
    }
  }

export default VoteSubmitForm; 
