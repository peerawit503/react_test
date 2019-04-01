import React from 'react';
import { Container, Col, Row, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
// import axios from 'axios';
import LoadingScreen from 'react-loading-screen'
import logo from './index/logo.png'
import trim from 'trim';
class Regismember extends React.Component {

    addContent = (e) => {
        e.preventDefault();
        var name = e.target.name.value;
        var lname = e.target.lname.value;
        var email = e.target.email.value;

        console.log(lname)
        var config = {
            headers: { 'Access-Control-Allow-Origin': '*' }
        };

        var url = 'http://127.0.0.1:5000/train/' + name;
        this.setState({
            status: 2
        });

        // axios.post(url, config)
        //     .then(res => {
        //         console.log(res);
        //         this.setState({
        //             status: 1,
        //             visible: true
        //         });
        //     })

    }
    constructor(props) {
        super(props);
        this.name = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    validate(name, lname, email) {
        if (trim(name) === '') {
            this.setState({
                validat_name: 'invalid'
            })
        }
    }

    handleChange(event) {
        var value = event.target.value
        var name = event.target.name

        if (trim(value) === '') {
            if (name === 'name') {
                this.setState({
                    validate_name: 'invalid'
                })
            }
            else if (name === 'lname') {

                this.setState({
                    validate_lname: 'invalid'
                })
            }
        }


        else {
            if (name === 'name') {
                this.setState({
                    validate_name: 'valid'
                })
            }
            else if (name === 'lname') {

                this.setState({
                    validate_lname: 'valid'
                })
            }
        }

    }

    onFocus(event) {
        var value = event.target.value
        var name = event.target.name

        if (trim(value) === '') {
            if (name === 'name') {
                this.setState({
                    validate_name: 'invalid'
                })
            }
            else if (name === 'lname') {

                this.setState({
                    validate_lname: 'invalid'
                })
            }
        }


        else {
            if (name === 'name') {
                this.setState({
                    validate_name: 'valid'
                })
            }
            else if (name === 'llname') {

                this.setState({
                    validate_lname: 'valid'
                })
            }
        }

    }


    componentWillMount() {
        this.setState({
            status: 1,
            visible: false,
            validate_name: '',
            validate_lname: ''

        });
    }




    render() {
        if (this.state.status === 1) {
            return (
                <Container>
                    <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                        Register new member success
                    </Alert>
                    <Form onSubmit={this.addContent}>
                        <Row form>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input valid={this.state.validate_name === 'valid'} invalid={this.state.validate_name === 'invalid'} type="text" name='name' placeholder="Name" onChange={this.handleChange} onFocus={this.onFocus} />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="lname">LastName</Label>
                                    <Input valid={this.state.validate_lname === 'valid'} invalid={this.state.validate_lname === 'invalid'} name='lname' type="text" placeholder="LastName" onFocus={this.onFocus} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="lname">Email</Label>
                                    <Input name='email' type="email" placeholder="email@example.com" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button type="submit" >Submit</Button>
                    </Form>
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
