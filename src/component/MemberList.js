// MessageList.js
import React, { Component } from 'react';
import Message from './Message';

import { Input, Pagination, PaginationItem, PaginationLink, Button } from 'reactstrap'
import './memberList.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class MemberList extends Component {
  _isMount = false;
  _dataCount = 0;
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      search: '',
      page: 1,
      size: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.changePage = this.changePage.bind(this);
    this.update = this.update.bind(this);
    // console.log(this.state.messages);
  }

  getData(values) {

    let messagesVal = values;

    // console.log(messagesVal);
    // console.log(ob);
    // Object.keys(ob).map(function(key){
    //   console.log(ob[key]);
    // });    


    // let messages = _(messagesVal)
    //   .keys()
    //   .map(messageKey => {
    //     // console.log(messageKey)
    //     let cloned = _.clone(messagesVal[messageKey]);
    //     cloned.key = messageKey;
    //     // console.log(cloned)
    //     return cloned;
    //   }).value();

    if (this._isMount) {
      this.setState({
        messages: messagesVal,
        size: this.state.messages.length
      });
    }

    // console.log(this.state.messages);
  }

  handleChange(event) {
    let text = event.target.value;
    this.setState({
      search: text,
      page: 1
    })
  }

  componentWillMount() {
    this._isMount = true;
    let app = this.props.db.database().ref('member');
    app.orderByChild("trained").on('value', snapshot => {
      const nodes = [];
      snapshot.forEach(child => { nodes.push({ ...child.val(), key: child.key }); });
      
      this.getData(nodes);
    });

  }
  changePage(page) {
    if (page > 0 && page <= Math.ceil(this._dataCount / 10)) {
      this.setState({
        page: page
      })
    }

  }
  update() {
    let app = this.props.db.database().ref('member');
    var config = {
      headers: { 'Access-Control-Allow-Origin': '*' }
    };

    var url = 'http://127.0.0.1:5000/train';
   
    axios.post(url, config)
      .then(res => {
        app.orderByChild("trained").on('value', snapshot => {
          snapshot.forEach(child => {
            var obj = { ...child.val() };
            obj.trained = 1;
            app.child(child.key).update(obj)
          });
        });
      })
      .catch(error => {
        this.setState({
          status: 1,
          api_res: {
            message: 'Error, fail to add new user',
            color: 'danger'
          }
        });

      });

    // console.log(data);
  }
  componentWillUnmount() {
    this._isMount = false;
  }

  createTable = (element_count) => {
    let table = []
    let page = this.state.page;
    this._dataCount = element_count;
    let limit = Math.ceil(element_count / 10);
    if (limit <= 3) {
      for (let i = 1; i <= limit; i++) {
        let children = []
        //Inner loop to create children
        if (i === page) {
          children.push(
            <PaginationItem key={i} onClick={() => this.changePage(i)} >
              <PaginationLink className="active-page" >
                {i}
              </PaginationLink>
            </PaginationItem>
          )
        } else {
          children.push(
            <PaginationItem key={i} onClick={() => this.changePage(i)} >
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


    else {

      if (page === 1 || page === 2) {
        for (let i = 1; i <= 3; i++) {
          let children = []
          //Inner loop to create children

          if (i === page) {
            children.push(
              <PaginationItem key={i} onClick={() => this.changePage(i)} >
                <PaginationLink className="active-page" >
                  {i}
                </PaginationLink>
              </PaginationItem>
            )
          } else {
            children.push(
              <PaginationItem key={i} onClick={() => this.changePage(i)} >
                <PaginationLink  >
                  {i}
                </PaginationLink>
              </PaginationItem>
            )
          }

          //Create the parent and add the children
          table.push(children)
        }
      } else if (page === limit) {
        for (let i = page - 2; i <= limit; i++) {
          let children = []
          //Inner loop to create children

          if (i === page) {
            children.push(
              <PaginationItem key={i} onClick={() => this.changePage(i)} >
                <PaginationLink className="active-page" >
                  {i}
                </PaginationLink>
              </PaginationItem>
            )
          } else {
            children.push(
              <PaginationItem key={i} onClick={() => this.changePage(i)} >
                <PaginationLink  >
                  {i}
                </PaginationLink>
              </PaginationItem>
            )
          }

          //Create the parent and add the children
          table.push(children)
        }
      } else {
        for (let i = page - 1; i <= page + 1; i++) {
          let children = []
          //Inner loop to create children

          if (i === page) {
            children.push(
              <PaginationItem key={i} onClick={() => this.changePage(i)} >
                <PaginationLink className="active-page" >
                  {i}
                </PaginationLink>
              </PaginationItem>
            )
          } else {
            children.push(
              <PaginationItem key={i} onClick={() => this.changePage(i)} >
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
        if (element_count >= ((this.state.page - 1) * 10) + 1 && element_count <= (((this.state.page - 1) * 10) + 10)) {
          return (

            <Message message={message} db={this.props.db} key={i} />
          )
        } else {
          return null;
        }

      } else {
        return null;
      }

    }

    );



    return (
      <div className="container">
        <Button onClick={() => this.update()} color="success">Update</Button>
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
              <th scope="col" className="col-name">Staus</th>
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
            <PaginationItem onClick={() => this.changePage(this.state.page - 1)}>
              <PaginationLink  >
                <FontAwesomeIcon icon="angle-left" />
              </PaginationLink>
            </PaginationItem>
            {this.createTable(element_count)}
            <PaginationItem onClick={() => this.changePage(this.state.page + 1)}>
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