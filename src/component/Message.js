import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Col,
    Row,
    Form,
    FormGroup,
    Label,
    Input,

    FormFeedback
} from 'reactstrap';

class Message extends Component {
    constructor(props) {
        super(props);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateFunction = this.updateFunction.bind(this);
        this.state = {
            modalState: false,
            visible: false,
            validated: {
                name: "",
                lname: "",
                email: ""
            },
            errorMessage: {
                name: "",
                lname: "",
                email: ""
            },
            value: {
                name: this.props.message.name,
                lname: this.props.message.lname,
                email: this.props.message.email
            }
        };
    }

    onClickDelete(e) {
        e.preventDefault();
        let dbCon = this.props.db.database().ref('/member');
        dbCon.child(this.props.message.key).remove();

    }

    updateFunction(e) {
        e.preventDefault();


        if (this.state.value.name.length > 2 &&
            this.state.value.lname.length > 2 &&
            this.state.value.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            var obj = { ...this.state.value };

            let dbCon = this.props.db.database().ref('/member');
            dbCon.child(this.props.message.key).update(obj)
                .then(() => this.handleClose());
        }
       

    }

    handleClose() {
        this.setState({
            show: false,
            visible: false,
            validated: {
                name: "",
                lname: "",
                email: ""
            },
            errorMessage: {
                name: "",
                lname: "",
                email: ""
            },
            value: {
                name: this.props.message.name,
                lname: this.props.message.lname,
                email: this.props.message.email
            }
        });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleChange(event) {

        let value = event.target.value;
        let name = event.target.name;
        let errorMessage = { ...this.state.errorMessage };
        let validated = { ...this.state.validated }
        let inputValue = { ...this.state.value }
        switch (name) {
            case 'name':
                errorMessage.name =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                validated.name =
                    value.length < 3 ? "invalid" : "valid";
                inputValue.name = value;
                break;
            case 'lname':
                errorMessage.lname =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                validated.lname =
                    value.length < 3 ? "invalid" : "valid";
                inputValue.lname = value;
                break;
            case 'email':
                errorMessage.email =
                    value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? "" : "invalid email address";
                validated.email =
                    value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? "valid" : "invalid";
                inputValue.email = value;
                break;
            default:
                break;
        }

        this.setState({
            errorMessage: errorMessage,
            validated: validated,
            value: inputValue,
            visible: false
        });

    }

    render() {
        return (
            <>
                <tbody>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">{this.props.message.name}</th>
                        <th scope="col">{this.props.message.lname}</th>
                        <th scope="col">{this.props.message.email}</th>
                        <th scope="col">
                            <button
                                className="button is-danger"
                                onClick={this.onClickDelete}>
                                <FontAwesomeIcon icon="trash-alt" />
                            </button>
                            <button onClick={this.handleShow}>
                            <FontAwesomeIcon icon="edit" />
                            </button>


                        </th>

                    </tr>

                </tbody>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.message.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="name">Name</Label>
                                        <Input
                                            valid={this.state.validated.name === 'valid'}
                                            invalid={this.state.validated.name === 'invalid'}
                                            type="text"
                                            name='name'
                                            value={this.state.value.name}
                                            // placeholder="Name"
                                            onChange={this.handleChange}
                                            onBlur={this.handleChange}
                                        />
                                        <FormFeedback>{this.state.errorMessage.name}</FormFeedback>

                                    </FormGroup>
                                </Col>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="lname">LastName</Label>
                                        <Input
                                            valid={this.state.validated.lname === 'valid'}
                                            invalid={this.state.validated.lname === 'invalid'}
                                            name='lname'
                                            type="text"
                                            value={this.state.value.lname}
                                            // placeholder="LastName"
                                            onBlur={this.handleChange}
                                            onChange={this.handleChange}
                                        />
                                        <FormFeedback>{this.state.errorMessage.lname}</FormFeedback>
                                    </FormGroup>

                                </Col>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="lname">Email</Label>
                                        <Input
                                            valid={this.state.validated.email === 'valid'}
                                            invalid={this.state.validated.email === 'invalid'}
                                            name='email'
                                            type="email"
                                            value={this.state.value.email}
                                            // placeholder="email@example.com"
                                            onChange={this.handleChange}
                                            onBlur={this.handleChange}
                                        />
                                        <FormFeedback>{this.state.errorMessage.email}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.updateFunction}>
                            Save Change
                        </Button>
                    </Modal.Footer>

                </Modal>
            </>
        );
    }
}
export default Message