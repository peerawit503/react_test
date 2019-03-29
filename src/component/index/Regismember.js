import React from 'react';
import { Container, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import LoadingScreen from 'react-loading-screen'
import logo from './logo'
class Regismember extends React.Component {

    addContent = (e) => {
        e.preventDefault();
        var name = e.target.name.value
        console.log(name)
        var config = {
          headers: { 'Access-Control-Allow-Origin': '*' }
        };

        var url = 'http://127.0.0.1:5000/train/'+name;
        console.log("Traning is in progress, please look into camera");
        this.setState({
          status:2
        });

        axios.post(url, config)
          .then(res => {
            console.log(res);
            this.setState({
              status:1
            });
          })
        
        console.log('Submit Clicked')

    }
    constructor(props) {
        super(props);
        this.name = React.createRef();
    }
    componentWillMount() {
        this.setState({
            status: 1
        });
    }




    render() {
        if (this.state.status === 1) {
            return (
                <Container>
                    <Form onSubmit={this.addContent}>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input type="text" name='name' placeholder="Name" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="lname">LastName</Label>
                                    <Input ref='lname' type="text" placeholder="LastName" />
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
