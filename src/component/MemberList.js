// MessageList.js
import React, { Component } from 'react';
import Message from './Message';
import _ from 'lodash';
import {Input} from 'reactstrap'
import './memberList.css'
class MemberList extends Component {
  _isMount = false;
  
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      search:''
    };
    this.handleChange = this.handleChange.bind(this);
    // console.log(this.state.messages);
  }

  getData(values) {
    let messagesVal = values;
    let messages = _(messagesVal)
      .keys()
      .map(messageKey => {
        let cloned = _.clone(messagesVal[messageKey]);
        cloned.key = messageKey;
        return cloned;
      }).value();

    if(this._isMount){
      this.setState({
        messages: messages
      });
    }
    // console.log(this.state.messages.length);
  }
  
  handleChange(event){
    let text = event.target.value;
    this.setState({
      search:text
    })
  }

  componentWillMount() {
    this._isMount = true ;
    let app = this.props.db.database().ref('member');
    app.on('value', snapshot => {
      this.getData(snapshot.val());
    });
    
  }

  componentWillUnmount(){
    this._isMount = false;
  }

  render() {
    let element_count = 0 ;
    let messageNodes = this.state.messages.map((message, i ) => {
      
      if (message.name.toUpperCase().includes(this.state.search.toUpperCase())
      || message.lname.toUpperCase().includes(this.state.search.toUpperCase()) 
      || message.email.toUpperCase().includes(this.state.search.toUpperCase()) ) {
        element_count += 1;
        if(element_count >= 1 && element_count <= 5 ){
        return (
          <Message message={message} db={this.props.db} key={i} />
        )
        }
      } else {
        return null;
      }
    });

    return (
      <div className="container">
        <Input
          type="text"
          name='name'
          placeholder="Search..."
          onChange={this.handleChange}
          autoComplete="off"
          className="search-box"
           />
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="col-name">Name</th>
              <th scope="col" className="col-lname">Last</th>
              <th scope="col" className="col-email">Email</th>
              <th scope="col" className="col-etc"></th>
            </tr>
          </thead>

          {messageNodes}

        </table>
      </div>
    );
  }
}
export default MemberList