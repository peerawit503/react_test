// MessageList.js
import React, {Component} from 'react';
import Message from './Message';
import _ from 'lodash';
class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    };
    let app = this.props.db.database().ref('member');
    app.on('value', snapshot => {
      this.getData(snapshot.val());
    });
    // console.log(this.state.messages);
  }
  getData(values){
    let messagesVal = values;
    let messages = _(messagesVal)
                    .keys()
                    .map(messageKey => {
                      let cloned = _.clone(messagesVal[messageKey]);
                      cloned.key = messageKey;
                      return cloned;
                    }).value();
    console.log(messages)
    
    this.setState({
      messages: messages
    });
  }
  render() {
    
    let messageNodes = this.state.messages.map((message) => {
        return (
    
          
            
              <Message message = {message} db={this.props.db}  />
           
        
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
                <tbody>
                {messageNodes}
                </tbody>
            </table>
        </div>
      );
    }
}
export default MessageList