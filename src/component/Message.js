import React, { Component } from 'react';
class Message extends Component {
    constructor(props) {
        super(props);
        this.onClickDelete = this.onClickDelete.bind(this);
    }

    onClickDelete(e) {
        e.preventDefault();
        let dbCon = this.props.db.database().ref('/member');
        dbCon.child(this.props.message.key).remove();
        console.log("clicked")
    }
    render() {
        return (
            <tr>
                <th scope="col"></th>
                <th scope="col">{this.props.message.name}</th>
                <th scope="col">{this.props.message.lname}</th>
                <th scope="col">{this.props.message.email}</th>
                <th scope="col"> 
                    <button
                        className="button is-danger"
                        onClick={this.onClickDelete}>
                        Delete
                    </button>
                </th>
            </tr>
        )
    }
}
export default Message