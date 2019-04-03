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
import axios from 'axios';
import LoadingScreen from 'react-loading-screen'
import logo from './index/logo.png'
import trim from 'trim';
class Regismember extends React.Component {

    addContent = (e) => {
        e.preventDefault();
        let dbCon = this.props.db.database().ref('/member');
        let name = e.target.name.value;
        let lname = e.target.name.value;
        let email = e.target.email.value;


        if (this.state.validated.name === 'valid' &&
            this.state.validated.lname === 'valid' &&
            this.state.validated.email === 'valid') {

            var config = {
                headers: { 'Access-Control-Allow-Origin': '*' }
            };

            var url = 'http://127.0.0.1:5000/train/' + name;
            this.setState({
                status: 2
            });

            
            dbCon.push({
                name: trim(name),
                lname: trim(lname),
                email:email
              });
            // axios.post(url, config)
            //     .then(res => {
            //         console.log(res);
            //         this.setState({
            //             status: 1,
            //             visible: true
            //         });
            //     })

        }else{
            console.log("sadad")
        }

    }
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.addContent = this.addContent.bind(this);
        
    }



    handleChange(event) {
        
        let value = event.target.value;
        let name = event.target.name;
        let errorMessage = { ...this.state.errorMessage };
        let validated = { ...this.state.validated }
        switch (name) {
            case 'name':
                errorMessage.name =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                validated.name =
                    value.length < 3 ? "invalid" : "valid";
                break;
            case 'lname':
                errorMessage.lname =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                validated.lname =
                    value.length < 3 ? "invalid" : "valid";
                break;
            case 'email':
                errorMessage.email =
                    value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? "" : "invalid email address";
                validated.email =
                    value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? "valid" : "invalid";
                break;
            default:
                break;
        }

        this.setState({
            errorMessage: errorMessage,
            validated: validated
        });
    }

    onBlur(event) {
        let value = event.target.value;
        let name = event.target.name;
        let errorMessage = { ...this.state.errorMessage };
        let validated = { ...this.state.validated }
        switch (name) {
            case 'name':
                errorMessage.name =
                    value.length <= 0 ? "Name can't be blank" : "";
                validated.name =
                    value.length <= 0 ? "invalid" : "valid";
                break;
            case 'lname':
                errorMessage.lname =
                    value.length <= 0 ? "Lastname can't be blank" : "";
                validated.lname =
                    value.length <= 0 ? "invalid" : "valid";
                break;
            case 'email':
                errorMessage.email =
                    value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? "" : "invalid email address";
                validated.email =
                    value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? "valid" : "invalid";
                break;
            default:
                break;
        }

        this.setState({
            errorMessage: errorMessage,
            validated: validated
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
                    <Form onSubmit={this.addContent}>
                        <Row form>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input
                                        valid={this.state.validated.name === 'valid'}
                                        invalid={this.state.validated.name === 'invalid'}
                                        type="text"
                                        name='name'
                                        placeholder="Name"
                                        onChange={this.handleChange}
                                        onBlur={this.onBlur} />
                                    <FormFeedback>{this.state.errorMessage.name}</FormFeedback>

                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="lname">LastName</Label>
                                    <Input
                                        valid={this.state.validated.lname === 'valid'}
                                        invalid={this.state.validated.lname === 'invalid'}
                                        name='lname'
                                        type="text"
                                        placeholder="LastName"
                                        onBlur={this.onBlur}
                                        onChange={this.handleChange} />
                                    <FormFeedback>{this.state.errorMessage.lname}</FormFeedback>
                                </FormGroup>

                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="lname">Email</Label>
                                    <Input
                                        valid={this.state.validated.email === 'valid'}
                                        invalid={this.state.validated.email === 'invalid'}
                                        name='email'
                                        type="email"
                                        placeholder="email@example.com"
                                        onChange={this.handleChange}
                                        onBlur={this.onBlur} />
                                    <FormFeedback>{this.state.errorMessage.email}</FormFeedback>
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
