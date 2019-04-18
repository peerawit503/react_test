// MessageList.js
import React, { Component } from 'react';
import Message from './Message';
import _ from 'lodash';
import { Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import './memberList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class MemberList extends Component {
  _isMount = false;
  _dataCount = 0;
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      search: '',
      page:1,
      size:0
    };
    this.handleChange = this.handleChange.bind(this);
    this.changePage = this.changePage.bind(this);
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

    if (this._isMount) {
      this.setState({
        messages: messages
      });
    }
    this.setState({
      size:this.state.messages.length
    })
    // console.log(this.state.messages.length);
  }

  handleChange(event) {
    let text = event.target.value;
    this.setState({
      search: text,
      page:1
    })
  }

  componentWillMount() {
    this._isMount = true;
    let app = this.props.db.database().ref('member');
    app.orderByChild("modifyAt").on('value', snapshot => {
      this.getData(snapshot.val());
    });
    
  }
  changePage(page){
    if (page > 0 && page <= Math.ceil(this._dataCount/10)){
      this.setState({
        page:page
      })
    }
    
    
   
  }
  componentWillUnmount() {
    this._isMount = false;
  }

  createTable = (element_count) => {
    let table = []
    let page = this.state.page;
    this._dataCount = element_count;
    let limit = Math.ceil(element_count/10);
    if (limit <= 3 ){
      for (let i = 1; i <= limit ; i++) {
        let children = []
        //Inner loop to create children
        if( i === page){
          children.push(
            <PaginationItem key={i} onClick={ () => this.changePage(i)} >
              <PaginationLink className="active-page" >
              {i}
              </PaginationLink>
            </PaginationItem>
            )
        }else{
          children.push(
            <PaginationItem key={i} onClick={ () => this.changePage(i)} >
              <PaginationLink  >
                  {i}
              </PaginationLink>
            </PaginationItem>
            )
        }
          
       
        //Create the parent and add the children
        table.push(children)
      }
    }
    
    
    else{

      if(page === 1 || page === 2){
        for (let i = 1; i <= 3; i++) {
          let children = []
          //Inner loop to create children
        
          if( i === page){
            children.push(
              <PaginationItem key={i} onClick={ () => this.changePage(i)} >
                <PaginationLink className="active-page" >
                {i}
                </PaginationLink>
              </PaginationItem>
              )
          }else{
            children.push(
              <PaginationItem key={i} onClick={ () => this.changePage(i)} >
                <PaginationLink  >
                    {i}
                </PaginationLink>
              </PaginationItem>
              )
          }
         
          //Create the parent and add the children
          table.push(children)
        }
      }else if (page === limit){
        for (let i = page-2; i <= limit; i++) {
          let children = []
          //Inner loop to create children
        
          if( i === page){
            children.push(
              <PaginationItem key={i} onClick={ () => this.changePage(i)} >
                <PaginationLink className="active-page" >
                {i}
                </PaginationLink>
              </PaginationItem>
              )
          }else{
            children.push(
              <PaginationItem key={i} onClick={ () => this.changePage(i)} >
                <PaginationLink  >
                    {i}
                </PaginationLink>
              </PaginationItem>
              )
          }
         
          //Create the parent and add the children
          table.push(children)
        }
      }else{
        for (let i = page - 1; i <= page+1; i++) {
          let children = []
          //Inner loop to create children
        
          if( i === page){
            children.push(
              <PaginationItem key={i} onClick={ () => this.changePage(i)} >
                <PaginationLink className="active-page" >
                {i}
                </PaginationLink>
              </PaginationItem>
              )
          }else{
            children.push(
              <PaginationItem key={i} onClick={ () => this.changePage(i)} >
                <PaginationLink  >
                    {i}
                </PaginationLink>
              </PaginationItem>
              )
          }
         
          //Create the parent and add the children
          table.push(children)
        }
      }
      
    }
    return table
  }


  render() {
    let element_count = 0;
    let messageNodes = this.state.messages.map((message, i) => {

      if (message.name.toUpperCase().includes(this.state.search.toUpperCase())
        || message.lname.toUpperCase().includes(this.state.search.toUpperCase())
        || message.email.toUpperCase().includes(this.state.search.toUpperCase())) {
        element_count += 1;
        if(element_count >= ((this.state.page-1)*10)+1 && element_count <= (((this.state.page-1)*10)+10) ){
        return (
          
          <Message message={message} db={this.props.db} key={i} />
        )
        }else {
          return null;
        }
        
      } else {
        return null;
      }
     
    }
  
    );
    


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
        <div>


          <Pagination aria-label="Page navigation example">
            <PaginationItem onClick={ () => this.changePage(this.state.page-1)}>
              <PaginationLink  >
                <FontAwesomeIcon icon="angle-left" />
              </PaginationLink>
            </PaginationItem>
            {this.createTable(element_count)}
            <PaginationItem onClick={ () => this.changePage(this.state.page+1)}>
              <PaginationLink >
                <FontAwesomeIcon icon="angle-right" />
              </PaginationLink>
            </PaginationItem>

          </Pagination>


        </div>
      </div>
    );
  }
}
export default MemberList