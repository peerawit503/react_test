// MessageList.js
import React, { Component } from 'react';
import Message from './Message';
import _ from 'lodash';
class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

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


    this.setState({
      messages: messages
    });
  }
  componentDidMount(){
    let app = this.props.db.database().ref('member');
    app.orderByChild("name").equalTo("Joh"+ "\uf8ff").on('value', snapshot => {
      this.getData(snapshot.val());
    });
  }
  render() {

    let messageNodes = this.state.messages.map((message,i) => {
      return (
        <Message message={message} db={this.props.db} key={i}/>
      )
    });
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Last</th>
              <th scope="col">Email</th>
              <th scope="col"></th>
            </tr>
          </thead>
       
            {messageNodes}
         
        </table>
      </div>
    );
  }
}
export default MessageList