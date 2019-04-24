import React from 'react';
import firebase from 'firebase';
import {
    Container,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    FormFeedback
} from 'reactstrap';
import axios from 'axios';
import LoadingScreen from 'react-loading-screen'
import './regismember.css'
import logo from './index/logo.png'
import trim from 'trim';
class Regismember extends React.Component {

    addContent = (e) => {
        e.preventDefault();
        let dbCon = this.props.db.database().ref('/member');
        let name = trim(e.target.name.value);
        let lname = trim(e.target.lname.value);
        let email = e.target.email.value;
        let specialChar = /[^a-zA-Z\-\/]/;
        if (this.state.validated.name === 'valid' &&
            this.state.validated.lname === 'valid' &&
            this.state.validated.email === 'valid') {
            name = name[0].toUpperCase() + name.slice(1);
            lname = lname[0].toUpperCase() + lname.slice(1);

            var config = {
                headers: { 'Access-Control-Allow-Origin': '*' }
            };

            var url = 'http://127.0.0.1:5000/add/' + name + '_' + lname;

            this.setState({
                status: 2
            });


         

            this.setState({
                visible: true,
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
                    name: "",
                    lname: "",
                    email: ""
                }

            });

            axios.post(url, config)
                .then(res => {
                    this.setState({
                        status: 1,
                        visible: true,
                        api_res: {
                            message: 'Add new user success',
                            color: 'success'
                        }
                    });
                    dbCon.push({
                        name: trim(name),
                        lname: trim(lname),
                        email: email,
                        createAt: firebase.database.ServerValue.TIMESTAMP,
                        modifyAt: firebase.database.ServerValue.TIMESTAMP,
                        trained: 0
                    });
                })
                .catch(error => {
                    this.setState({
                        status: 1,
                        api_res: {
                            message: 'Error, fail to add new user. Server is not available',
                            color: 'danger'
                        }
                    });

                });

        } else {
            let validated = { ...this.state.validated }
            let errorMessage = { ...this.state.errorMessage };
        
            errorMessage.name =
                name.length < 3 ? "minimum 3 characaters required" : errorMessage.name;
            validated.name =
                name.length < 3 || specialChar.test(name) ? "invalid" : "valid";

            errorMessage.lname =
                lname.length < 3 ? "minimum 3 characaters required" : errorMessage.lname;
            validated.lname =
                lname.length < 3 || specialChar.test(lname) ? "invalid" : "valid";
            
            errorMessage.email  =
                email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? errorMessage.email : "invalid email address";
            validated.email =
                email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? validated.email : "invalid";

            this.setState({
                errorMessage: errorMessage,
                validated: validated
            });
        }

    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addContent = this.addContent.bind(this);
        this.state = {
            api_res: {
                message: '',
                color: ''
            }
        }

    }

    getCurrentDate(separator = '') {

        let newDate = new Date()
        // return newDate ;
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
    }


    handleChange(event) {

        let value = event.target.value;
        let name = event.target.name;
        let errorMessage = { ...this.state.errorMessage };
        let validated = { ...this.state.validated }
        let inputValue = { ...this.state.value }
        let specialChar = /[^a-zA-Z\-\/]/;
        switch (name) {
            case 'name':
                errorMessage.name =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                errorMessage.name =
                    specialChar.test(value) ? "Name can't have special character or number" : errorMessage.name;
                validated.name =
                    value.length < 3 || specialChar.test(value) ? "invalid" : "valid";
                inputValue.name = value;
                break;
            case 'lname':
                errorMessage.lname =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                errorMessage.lname =
                    specialChar.test(value) ? "Lastname can't have special character or number" : errorMessage.lname;
                validated.lname =
                    value.length < 3 || specialChar.test(value) ? "invalid" : "valid";
                inputValue.lname = value;
                break;
            case 'email':
                errorMessage.email =
                    value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? "" : "invalid email address";
                validated.email =
                    value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? "valid" : "invalid";
                inputValue.email = value;

                this.props.db.database().ref().child('member').orderByChild('email').equalTo(value)
                    .limitToFirst(1).once('child_added', snap => {
                        if (value === snap.val().email) {
                            validated.email = 'invalid';
                            errorMessage.email = value +' already exist';

                            this.setState({
                                errorMessage: errorMessage,
                                validated: validated,
                                value: inputValue,
                                visible: false
                            });
                        }
                    })

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




    componentWillMount() {

        this.setState({
            status: 1,
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
                name: "",
                lname: "",
                email: ""
            }

        });

    }




    render() {
        if (this.state.status === 1) {
            return (
                <Container>
                    <Alert color={this.state.api_res.color} isOpen={this.state.visible} toggle={this.onDismiss}>
                        {this.state.api_res.message}
                    </Alert>

                    <div className='form-wrap'>
                        <h1 className="header">
                            Register new member
                        </h1>
                        <Form onSubmit={this.addContent}>
                            <div className='form-row2'>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="name">Name</Label>
                                        <Input
                                            valid={this.state.validated.name === 'valid'}
                                            invalid={this.state.validated.name === 'invalid'}
                                            type="text"
                                            name='name'
                                            value={this.state.value.name}
                                            placeholder="Name"
                                            onChange={this.handleChange}
                                            onBlur={this.handleChange} />
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
                                            placeholder="LastName"
                                            onBlur={this.handleChange}
                                            onChange={this.handleChange} />
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
                                            placeholder="email@example.com"
                                            onChange={this.handleChange}
                                            onBlur={this.handleChange} />
                                        <FormFeedback>{this.state.errorMessage.email}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col md={12} className="button-submit-wrap">
                                    <Button type="submit" className="button-submit">Submit</Button>
                                </Col>

                            </div>

                        </Form>
                    </div>
                </Container>
            )
        }
        else {
            return (
                <LoadingScreen
                    children='null'
                    loading={true}
                    bgColor='#f1f1f1'
                    spinnerColor='#9ee5f8'
                    textColor='#676767'
                    logoSrc={logo}
                    text='Training'
                />
            )
        }

    }
}

export default Regismember;
