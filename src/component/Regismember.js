import React from 'react';
import {
    Container,
    Col,
    Row,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    FormFeedback
} from 'reactstrap';
// import axios from 'axios';
import LoadingScreen from 'react-loading-screen'
import './regismember.css'
import logo from './index/logo.png'
import trim from 'trim';
class Regismember extends React.Component {

    addContent = (e) => {
        e.preventDefault();
        let dbCon = this.props.db.database().ref('/member');
        let name = e.target.name.value;
        let lname = e.target.lname.value;
        let email = e.target.email.value;


        if (this.state.validated.name === 'valid' &&
            this.state.validated.lname === 'valid' &&
            this.state.validated.email === 'valid') {

            // var config = {
            //     headers: { 'Access-Control-Allow-Origin': '*' }
            // };

            // var url = 'http://127.0.0.1:5000/train/' + name;
            // this.setState({
            //     status: 2
            // });


            dbCon.push({
                name: trim(name),
                lname: trim(lname),
                email: email
            });

            this.setState({
                status: 1,
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
            // axios.post(url, config)
            //     .then(res => {
            //         console.log(res);
            //         this.setState({
            //             status: 1,
            //             visible: true
            //         });
            //     })

        } else {
            let validated = { ...this.state.validated }
            let errorMessage = { ...this.state.errorMessage };
            errorMessage.name =
                /[^a-zA-Z0-9\-\/]/.test(name) ? "Name can't have special character" : "";
            errorMessage.name =
                name.length < 3 ? "minimum 3 characaters required" : errorMessage.name;
            validated.name =
                name.length < 3 || /[^a-zA-Z0-9\-\/]/.test(name) ? "invalid" : "valid";

            errorMessage.lname =
                /[^a-zA-Z0-9\-\/]/.test(lname) ? "Lastname can't have special character" : "";
            errorMessage.lname =
                lname.length < 3 ? "minimum 3 characaters required" : errorMessage.lname;
            validated.lname =
                lname.length < 3 || /[^a-zA-Z0-9\-\/]/.test(lname) ? "invalid" : "valid";

            errorMessage.email =
                email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? "" : "invalid email address";
            validated.email =
                email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? "valid" : "invalid";

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
                errorMessage.name =
                    /[^a-zA-Z0-9\-\/]/.test(value) ? "Name can't have special character" : errorMessage.name;
                validated.name =
                    value.length < 3 || /[^a-zA-Z0-9\-\/]/.test(value) ? "invalid" : "valid";
                inputValue.name = value;
                break;
            case 'lname':
                errorMessage.lname =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                errorMessage.lname =
                    /[^a-zA-Z0-9\-\/]/.test(value) ? "Lastname can't have special character" : errorMessage.lname;
                validated.lname =
                    value.length < 3 || /[^a-zA-Z0-9\-\/]/.test(value) ? "invalid" : "valid";
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
                    <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                        Register new member success
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
